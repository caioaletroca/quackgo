export type PaginatedParams = {
    page: number;
    limit: number;
}

export type PaginatedResults = PaginatedParams & {
    total: number;
}