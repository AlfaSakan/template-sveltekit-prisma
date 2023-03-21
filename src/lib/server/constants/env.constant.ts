export const env = {
	jwtKey: process.env.VITE_JWT_KEY || 'rahasia',
	salt: process.env.VITE_SALT || ''
} as const;
