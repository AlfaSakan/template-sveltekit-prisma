import { errorMessages } from '$lib/client/constants/error.constant';
import type { Cookies } from '@sveltejs/kit';
import { z } from 'zod';
import { emailSchema } from './user.schema';

export interface CreateSessionDto {
	email: string;
	userId: string;
	userAgent: string;
}

export interface GetUserToken {
	userAgent: string;
	cookies: Cookies;
}

const passwordSchema = z.string().min(6).max(30);

export const loginDto = z.object({
	email: emailSchema,
	password: passwordSchema
});

export const signUpDto = z
	.object({
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: passwordSchema
	})
	.refine((value) => value.password === value.confirmPassword, {
		message: errorMessages['password-must-same'],
		path: ['confirmPassword']
	});

export type LoginDto = z.infer<typeof loginDto>;
export type SignUpDto = z.infer<typeof signUpDto>;
