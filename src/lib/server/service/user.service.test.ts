import { errorMessages } from '$lib/client/constants/error.constant';
import { userMock } from '$lib/__mocks__/dummy/user.dummy';
import prismaMock from '$lib/__mocks__/prisma';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {} from '../utils/hash.util';
import { UserService } from './user.service';

vi.mock('../utils/hash.util', () => ({
	verifyHash: vi.fn().mockImplementation((hash: string, value: string) => {
		if (value !== hash) return false;

		return true;
	}),
	generateHash: vi.fn().mockReturnValue('hash')
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('UserService', () => {
	const userService = new UserService();

	describe('validatePassword', () => {
		it('should cannot find user', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null);

			const result = await userService.validatePassword({
				email: userMock.email,
				password: userMock.hash
			});

			expect(result.user).toBeNull();
			expect(result.error).toBe(errorMessages['user-not-found']);
		});

		it('should failed validate password', async () => {
			prismaMock.user.findUnique.mockResolvedValue(userMock);

			const result = await userService.validatePassword({
				email: userMock.email,
				password: 'salah'
			});

			expect(result).toEqual({ user: null, error: errorMessages['password-wrong'] });
		});
	});

	describe('deleteUser', () => {
		it('should be able to delete user', async () => {
			prismaMock.user.findUnique.mockResolvedValue(userMock);
			prismaMock.user.update.mockResolvedValue(userMock);

			const result = await userService.deleteUser({
				email: userMock.email,
				password: userMock.hash
			});

			expect(result.user).toBeUndefined();
		});

		it('should cannot find user', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null);

			const result = await userService.deleteUser({
				email: userMock.email,
				password: userMock.hash
			});

			expect(result).toEqual({ user: null, error: errorMessages['user-not-found'] });
		});
	});

	describe('createAdmin', () => {
		it('should be able to create new user', async () => {
			prismaMock.user.create.mockResolvedValue({ ...userMock, level: 'admin' });

			const result = await userService.createAdmin({
				email: userMock.email,
				name: userMock.name,
				password: userMock.hash
			});

			expect(result.user?.level).toBe('admin');
		});
	});

	describe('createUser', () => {
		it('should be able to create new user', async () => {
			prismaMock.user.create.mockResolvedValue(userMock);

			const result = await userService.createUser({
				email: userMock.email,
				name: userMock.name,
				password: userMock.hash
			});

			expect(result.user?.email).toBe(userMock.email);
		});
	});

	describe('updateUser', () => {
		it('should be able to update new user', async () => {
			prismaMock.user.findUnique.mockResolvedValue(userMock);
			prismaMock.user.update.mockResolvedValue(userMock);

			const result = await userService.updateUser({
				email: userMock.email,
				name: userMock.name,
				password: userMock.hash
			});

			expect(result.user?.name).toBe(userMock.name);
		});

		it('should cannot find user', async () => {
			prismaMock.user.findUnique.mockResolvedValue(null);

			const result = await userService.updateUser({
				email: userMock.email,
				name: userMock.name,
				password: userMock.hash
			});

			expect(result).toEqual({ user: null, error: errorMessages['user-not-found'] });
		});
	});
});
