import { z } from 'zod';

export const emailSchema = z.string().email();

export interface CreateUserDto {
	name: string;
	email: z.infer<typeof emailSchema>;
	password: string;
}

export interface CreateAdminDto {
	name: string;
	email: z.infer<typeof emailSchema>;
	password: string;
	level: string;
}

export interface UpdateUserDto extends Pick<CreateUserDto, 'password' | 'name'> {
	id?: string;
	email?: z.infer<typeof emailSchema>;
}

export interface ValidatePasswordUser extends Pick<CreateUserDto, 'password'> {
	id?: string;
	email?: z.infer<typeof emailSchema>;
}
