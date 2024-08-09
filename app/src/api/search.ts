import { getFetcher } from ".";
import { Response, SearchResult } from "@/types";
import useSWRMutation from "swr/mutation";

type SearchParams = {
    query: string;
}

export function useSearch() {
    return useSWRMutation<Response<SearchResult[]>, object, string, SearchParams>('/search', (url: string, { arg }: { arg: SearchParams }) => getFetcher(url, {
        params: {
            q: arg.query
        }
    }));
}