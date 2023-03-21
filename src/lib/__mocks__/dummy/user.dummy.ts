export const userId = 'user-id';
export const timeMock = { createdAt: 0, updatedAt: 0 };

export const userMock = {
	name: 'name',
	email: 'example@gmail.com',
	id: userId,
	hash: 'hash',
	level: 'user',
	imageId: null,
	...timeMock
};
