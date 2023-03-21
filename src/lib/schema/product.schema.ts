import { z } from 'zod';

export const productName = z.string().min(3).max(150).trim();
export const productDescription = z.string().min(3).trim();
export const productAmount = z.coerce.number().min(0).default(0);
export const gender = z.string().min(1).trim();
export const category = z.string().min(1).trim();
export const genderId = z.number().default(0);
export const categoryId = z.number().default(0);

export const createProductDto = z.object({
	name: productName,
	description: productDescription,
	gender,
	category,
	categoryId,
	genderId
});

export type CreateProductDto = z.infer<typeof createProductDto>;
