import type { PrismaClient } from '@prisma/client';
import { beforeEach, vi } from 'vitest';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import prisma from '../server/utils/prisma';

vi.mock('../server/utils/prisma', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
	mockReset(prismaMock);
});

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export default prismaMock;
