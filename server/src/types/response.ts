import { PaginatedResults } from "./pagination"

export type Response<Data> = {
    data: Data
}

export type PaginatedResponse<Data> = {
    data: Data,
    meta: PaginatedResults
}