import { userMock } from '$lib/__mocks__/dummy/user.dummy';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { validateData } from './validate-data.util';

describe('validateData', () => {
	it('should be able to validate email', () => {
		const email = userMock.email;
		const res = validateData(email, z.string().email());

		expect(res.data).toBe(email);
	});

	it('should return error message invalid email in object', () => {
		const email = 'admin';
		const password = 'password';
		const res = validateData(
			{ email, password },
			z.object({ email: z.string().email(), password: z.string() })
		);

		expect(res).toEqual({ data: { email, password }, error: { email: 'Invalid email' } });
	});

	it('should return error message invalid email', () => {
		const email = 'admin';
		const res = validateData(email, z.string().email());

		expect(res).toEqual({ data: email, error: 'Invalid email' });
	});
});
