import React from "react";
import Page from "@/components/Page";
import SearchTextField from "@/components/SearchTextField";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [query, setQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (path: string) => {
		navigate(path);
	};

    return (
        <Page>
            <div className="flex flex-col justify-center items-center h-full">
                <div>Home Page</div>
                <SearchTextField
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={(e) => setQuery(e.target.value)}
                    onSearch={handleSearch}
                    size="small"
                />
            </div>
        </Page>
    )
}