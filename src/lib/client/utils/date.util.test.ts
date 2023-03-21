import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { generateUnixSecond } from './date.util';

describe('generateUnixSecond', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to generate unix in second', () => {
		const date = new Date(2022, 1, 1, 13);
		vi.setSystemTime(date);

		expect(generateUnixSecond()).toBe(date.getTime() / 1000);
	});
});
