import type { ZodError, ZodSchema } from 'zod';

export function validateData<DataType>(data: DataType, schema: ZodSchema<DataType>) {
	try {
		const res = schema.parse(data);

		return { data: res, errors: null };
	} catch (err) {
		const { fieldErrors, formErrors } = (err as ZodError).flatten();

		if (typeof data !== 'object') return { data, error: formErrors[0] };

		const error: Record<string, string> = {};

		Object.entries(fieldErrors).forEach(([key, value]) => {
			error[key] = value ? value[0] : '';
		});

		return { data, error };
	}
}
