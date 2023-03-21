import { cookiesKey } from '$lib/client/constants/cookies.constant';
import { errorMessages } from '$lib/client/constants/error.constant';
import type { ValidatePasswordUser } from '$lib/schema/user.schema';
import { sessionMock, tokenMock } from '$lib/__mocks__/dummy/session.dummy';
import { userMock } from '$lib/__mocks__/dummy/user.dummy';
import prismaMock from '$lib/__mocks__/prisma';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

vi.mock('./user.service', () => {
	const UserService = vi.fn();
	UserService.prototype.validatePassword = vi
		.fn()
		.mockImplementation((dto: ValidatePasswordUser) => {
			if (!dto.email && !dto.id) return { user: null, error: errorMessages['user-not-found'] };

			return {
				error: null,
				user: userMock
			};
		});
	UserService.prototype.createAdmin = vi.fn();
	UserService.prototype.createUser = vi.fn();
	UserService.prototype.updateUser = vi.fn();
	UserService.prototype.deleteUser = vi.fn();

	return { UserService };
});

vi.mock('../utils/hash.util', () => ({
	verifyHash: vi.fn().mockImplementation((hash: string, value: string) => {
		if (value !== hash) return false;

		return true;
	}),
	generateHash: vi.fn().mockReturnValue('hash')
}));

vi.mock('../utils/jwt-token', () => ({
	generateToken: vi.fn().mockReturnValue(tokenMock),
	verifyToken: vi.fn().mockImplementation((token: string) => {
		if (token === '') return { error: errorMessages['token-expired'], data: null };

		return { error: null, data: { email: userMock.email, userId: userMock.id } };
	})
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('AuthService', () => {
	const authService = new AuthService(new UserService());

	describe('login', () => {
		const tokenMock = { accessToken: 'accessToken', refreshToken: 'refreshToken' };

		it('should success get token', async () => {
			const spySession = vi.spyOn(authService, 'createSession');

			spySession.mockResolvedValueOnce({
				error: null,
				token: tokenMock
			});

			const dataLogin = { email: userMock.email, password: 'password' };
			const result = await authService.login(dataLogin, null);
			expect(result.token).toEqual(tokenMock);
		});

		it('should error user not found', async () => {
			const dataLogin = { email: '', password: 'password' };
			const result = await authService.login(dataLogin, null);
			expect(result).toEqual({ token: null, error: errorMessages['user-not-found'] });
		});
	});

	describe('createSession', () => {
		it('should success create session and get token', async () => {
			prismaMock.session.create.mockResolvedValueOnce(sessionMock);

			const result = await authService.createSession({
				email: userMock.email,
				userAgent: sessionMock.userAgent,
				userId: userMock.id
			});

			expect(result).toEqual({
				error: null,
				token: tokenMock
			});
		});
	});

	describe('getUserFromToken', () => {
		it('should success verify token and get user data without hash', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(userMock);

			const spySession = vi.spyOn(authService, 'createSession');
			spySession.mockResolvedValueOnce({
				error: null,
				token: tokenMock
			});

			const result = await authService.getUserFromToken({
				cookies: {
					delete: vi.fn(),
					get: vi.fn().mockReturnValue({
						[cookiesKey.accessKey]: tokenMock.accessToken,
						[cookiesKey.refreshKey]: tokenMock.refreshToken
					}),
					getAll: vi.fn(),
					serialize: vi.fn(),
					set: vi.fn()
				},
				userAgent: sessionMock.userAgent
			});

			expect(result).toEqual({
				error: null,
				data: { ...userMock, hash: undefined }
			});
		});

		it('should failed with error user not found', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(null);

			const spySession = vi.spyOn(authService, 'createSession');
			spySession.mockResolvedValueOnce({
				error: null,
				token: tokenMock
			});

			const result = await authService.getUserFromToken({
				cookies: {
					delete: vi.fn(),
					get: vi.fn().mockReturnValue({
						[cookiesKey.accessKey]: tokenMock.accessToken,
						[cookiesKey.refreshKey]: tokenMock.refreshToken
					}),
					getAll: vi.fn(),
					serialize: vi.fn(),
					set: vi.fn()
				},
				userAgent: sessionMock.userAgent
			});

			expect(result).toEqual({
				error: errorMessages['user-not-found'],
				data: null
			});
		});

		it('should failed verify new token', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(userMock);

			const spySession = vi.spyOn(authService, 'createSession');
			spySession.mockResolvedValueOnce({
				error: null,
				token: {
					accessToken: '',
					refreshToken: ''
				}
			});

			const result = await authService.getUserFromToken({
				cookies: {
					delete: vi.fn(),
					get: vi.fn().mockReturnValue(''),
					getAll: vi.fn(),
					serialize: vi.fn(),
					set: vi.fn()
				},
				userAgent: sessionMock.userAgent
			});

			expect(result).toEqual({
				error: errorMessages['token-expired'],
				data: null
			});
		});

		it('should success verify token and get user data with refreshToken', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(userMock);

			const spySession = vi.spyOn(authService, 'createSession');
			spySession.mockResolvedValueOnce({
				error: null,
				token: tokenMock
			});

			const result = await authService.getUserFromToken({
				cookies: {
					delete: vi.fn(),
					get: vi.fn().mockReturnValue({
						[cookiesKey.accessKey]: tokenMock.accessToken,
						[cookiesKey.refreshKey]: tokenMock.refreshToken
					}),
					getAll: vi.fn(),
					serialize: vi.fn(),
					set: vi.fn()
				},
				userAgent: sessionMock.userAgent
			});

			expect(result).toEqual({
				error: null,
				data: { ...userMock, hash: undefined }
			});
		});

		it('should error token expired', async () => {
			prismaMock.user.findUnique.mockResolvedValueOnce(userMock);

			const spySession = vi.spyOn(authService, 'createSession');
			spySession.mockResolvedValueOnce({
				error: null,
				token: tokenMock
			});

			const result = await authService.getUserFromToken({
				cookies: {
					delete: vi.fn(),
					get: vi.fn().mockReturnValue(''),
					getAll: vi.fn(),
					serialize: vi.fn(),
					set: vi.fn()
				},
				userAgent: sessionMock.userAgent
			});

			expect(result).toEqual({
				error: errorMessages['token-expired'],
				data: null
			});
		});
	});
});
