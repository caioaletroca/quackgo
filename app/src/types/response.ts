export type Response<T = unknown> = {
	data: T;
};

export type PaginatedResponse<T = unknown> = {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
	}
}