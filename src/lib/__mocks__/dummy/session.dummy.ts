import type { Session } from '@prisma/client';
import { userMock } from './user.dummy';

export const sessionMock: Session = {
	userAgent: 'user-agent',
	id: 'session-id',
	userId: userMock.id,
	createdAt: userMock.createdAt,
	updatedAt: userMock.updatedAt,
	hashToken: 'hash-token'
};

export const tokenMock = { accessToken: 'accessToken', refreshToken: 'refreshToken' };
