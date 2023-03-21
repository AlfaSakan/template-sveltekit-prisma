import { errorMessages } from '$lib/client/constants/error.constant';
import { env } from '$lib/server/constants/env.constant';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export type Payload = {
	userId: string;
	email: string;
};

function signJwt(payload: string | object, expiresIn: string | number) {
	return jwt.sign(payload, env.jwtKey, {
		expiresIn
	});
}

export function generateToken(payload: Payload) {
	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	return { accessToken, refreshToken };
}

function generateAccessToken(payload: Payload) {
	return signJwt(payload, '1h');
}

function generateRefreshToken(payload: Payload) {
	return signJwt(payload, '30 days');
}

export function verifyToken(token: string) {
	try {
		const data = jwt.verify(token, env.jwtKey) as JwtPayload & Payload;

		return { data, error: null };
	} catch (error) {
		return { data: null, error: errorMessages['token-expired'] };
	}
}
