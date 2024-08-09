import { useSearch } from "@/api/search";
import Header from "@/components/Header";
import Page from "@/components/Page";
import Content from "@/components/Page/Content";
import { SearchResult } from "@/types";
import { Link, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.css";
import Icon from "@/components/Icon";

function SearchResult({ FirstURL, Text }: SearchResult) {
    const navigate = useNavigate();

    const handleClick = () => navigate(FirstURL);

    return (
        <div className="search-result flex flex-col mb-6" onClick={handleClick}>
            <Typography variant="body2">{FirstURL}</Typography>
            <Link variant='h6' className="text" href={FirstURL} underline="hover">{Text}</Link>
        </div>
    );
}

function SearchResultLoading() {
    return (
        <div className="flex flex-col mb-6 space-y-2">
            <Skeleton variant="rectangular" width={600} height={16} />
            <Skeleton variant="rectangular" width={800} height={24} />
        </div>
    );
}

function SearchPageLoading() {
    return (
        <Content className="pr-10">
            {Array(10).fill(0).map((_, index) => (
                <SearchResultLoading key={index} />
            ))}
        </Content>
    );
}

function SearchPageEmpty() {
    return (
        <Content className="h-full justify-center items-center space-y-4 text-gray-500 select-none">
            <Icon className="text-8xl text-neutral-700">search_off</Icon>
            <Typography color='grey' variant="h5">No results found...</Typography>
        </Content>
    );
}

export default function SearchPage() {
    const [search, setSearch] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const { trigger , data: searchResults, isMutating } = useSearch();

    React.useEffect(() => {
        const current = searchParams.get('q') as string;

        if(current != '') {
            setSearch(searchParams.get('q') as string);
            trigger({ query: current });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        setSearchParams({ q: search });
        trigger({ query: search })
    }

    return (
        <Page>
            <Header
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onBlur={(e) => setSearch(e.target.value)}
                onSearch={handleSubmit}
                onClear={() => setSearch('')}
            />

            {isMutating && <SearchPageLoading />}

            {!isMutating && searchResults?.data.length === 0 && <SearchPageEmpty />}

            {!isMutating && searchResults?.data && searchResults?.data.length > 0 &&
                <Content className="pr-10">
                    {searchResults?.data?.map(result => (
                        <SearchResult {...result} />
                    ))}
                </Content>
            }
        </Page>
    )
}