import { cookiesKey } from '$lib/client/constants/cookies.constant';
import { errorMessages } from '$lib/client/constants/error.constant';
import { generateUnixSecond } from '$lib/client/utils/date.util';
import type { CreateSessionDto, GetUserToken, LoginDto } from '$lib/schema/session.schema';
import { generateHash } from '../utils/hash.util';
import { generateToken, verifyToken } from '../utils/jwt-token';
import prisma from '../utils/prisma';
import type { UserService } from './user.service';

export class AuthService {
	constructor(private userService: UserService) {}

	async createSession(dto: CreateSessionDto) {
		const token = generateToken({ email: dto.email, userId: dto.userId });

		const hashToken = await generateHash(token.refreshToken);

		await prisma.session.create({
			data: {
				userAgent: dto.userAgent,
				createdAt: generateUnixSecond(),
				updatedAt: generateUnixSecond(),
				hashToken,
				userId: dto.userId
			}
		});

		return { token, error: null };
	}

	async login(dto: LoginDto, userAgent: string | null) {
		const { user, error } = await this.userService.validatePassword(dto);
		if (error) return { token: null, error };

		const result = await this.createSession({
			email: user.email,
			userId: user.id,
			userAgent: userAgent || ''
		});

		return result;
	}

	async getUserFromToken({ userAgent, cookies }: GetUserToken) {
		const accessToken = cookies.get(cookiesKey.accessKey);
		const refreshToken = cookies.get(cookiesKey.refreshKey);

		if (accessToken === undefined || refreshToken === undefined)
			return { data: null, error: errorMessages.forbidden };

		let payload = verifyToken(accessToken);

		if (payload.data === null) {
			payload = verifyToken(refreshToken);
			if (!payload.data) return payload;

			const resultToken = await this.createSession({
				email: payload.data.email,
				userAgent,
				userId: payload.data.userId
			});

			cookies.set(cookiesKey.accessKey, resultToken.token.accessToken);
			cookies.set(cookiesKey.refreshKey, resultToken.token.refreshToken);

			payload = verifyToken(resultToken.token.accessToken);
			if (!payload.data) return payload;
		}

		const user = await prisma.user.findUnique({
			where: { id: payload.data.userId }
		});
		if (!user) return { data: null, error: errorMessages['user-not-found'] };

		return { data: { ...user, hash: undefined }, error: null };
	}
}
