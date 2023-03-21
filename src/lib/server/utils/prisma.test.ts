import { describe, expect, it } from 'vitest';
import prisma from './prisma';

describe('prisma', () => {
	it('should be define', () => {
		expect(prisma).toBeDefined();
	});
});
