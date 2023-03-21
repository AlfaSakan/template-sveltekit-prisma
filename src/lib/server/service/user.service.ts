import { errorMessages } from '$lib/client/constants/error.constant';
import { generateUnixSecond } from '$lib/client/utils/date.util';
import type {
	CreateAdminDto,
	CreateUserDto,
	UpdateUserDto,
	ValidatePasswordUser
} from '../../schema/user.schema';
import { generateHash, verifyHash } from '../utils/hash.util';
import prisma from '../utils/prisma';

export class UserService {
	createAdmin(dto: CreateUserDto) {
		const data: CreateAdminDto = { ...dto, level: 'admin' };

		return this.createUser(data);
	}

	async createUser(dto: CreateUserDto) {
		const searchUser = await prisma.user.findUnique({ where: { email: dto.email } });

		if (searchUser) return { user: null, error: errorMessages['email-taken'] };

		const hash = await generateHash(dto.password);

		const data = { ...dto, password: undefined };

		const user = await prisma.user.create({
			data: {
				createdAt: generateUnixSecond(),
				updatedAt: generateUnixSecond(),
				hash,
				...data
			}
		});

		return {
			user: { ...user, hash: undefined },
			error: null
		};
	}

	async updateUser(dto: UpdateUserDto) {
		const result = await this.validatePassword(dto);
		if (result.user === null) return result;

		const data = { ...dto, password: undefined, id: undefined, email: undefined };

		const user = await prisma.user.update({
			where: {
				id: result.user.id
			},
			data: {
				...data
			}
		});

		return { user: { ...user, hash: undefined }, error: null };
	}

	async deleteUser(dto: ValidatePasswordUser) {
		const result = await this.validatePassword(dto);
		if (result.user === null) return result;

		const user = await prisma.user.delete({
			where: { email: result.user.email, id: result.user.id }
		});
		return { user, error: null };
	}

	async validatePassword(dto: ValidatePasswordUser) {
		const user = await prisma.user.findUnique({ where: { email: dto.email, id: dto.id } });
		if (user === null) {
			return { user, error: errorMessages['user-not-found'] };
		}

		const isPasswordValid = await verifyHash(user.hash, dto.password);
		if (!isPasswordValid) return { user: null, error: errorMessages['password-wrong'] };

		return { user, error: null };
	}
}
