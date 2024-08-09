import { getFetcher } from ".";
import { PaginatedResponse, PaginationParams, SearchResult } from "@/types";
import useSWRMutation from "swr/mutation";

export type SearchParams = PaginationParams & {
    q: string;
}

export function useSearch() {
    return useSWRMutation<PaginatedResponse<SearchResult[]>, object, string, SearchParams>('/search', (url: string, { arg }: { arg: SearchParams }) => getFetcher(url, {
        params: arg
    }));
}