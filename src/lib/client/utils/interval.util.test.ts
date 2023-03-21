import Interval from '$lib/__mocks__/component/interval.svelte';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { onInterval } from './interval.util';

describe('onInterval', () => {
	it('should be defined', () => {
		render(Interval);

		expect(onInterval).toBeDefined();
	});
});
