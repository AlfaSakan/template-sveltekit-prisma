import { env } from '$lib/server/constants/env.constant';
import * as argon from 'argon2';

const salt = Buffer.from(env.salt, 'utf-8');

export function generateHash(value: string) {
	return argon.hash(value, { salt });
}

export function verifyHash(hash: string, value: string) {
	return argon.verify(hash, value, { salt });
}
