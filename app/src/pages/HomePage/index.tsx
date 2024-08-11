import React from "react";
import Page from "@/components/Page";
import SearchTextField from "@/components/SearchTextField";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Link, Typography } from "@mui/material";
import Icon from "@/components/Icon";
import { HistoryButton } from "@/components/History";

export default function HomePage() {
    const [query, setQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
		navigate(`/search?q=${query}`);
	};

    return (
        <Page>
            <div className="m-4">
                <HistoryButton />
            </div>
            <div className="flex flex-col justify-center items-center h-full">
                <Grid container>
                    <Grid item xs={0} md={3} lg={4} />
                    <Grid item xs={12} md={6} lg={4}>
                        <div className="flex flex-col justify-center items-center px-8">
                            <img className="w-32 mb-10" src='./logo.svg' />
                            <Typography
                                className="mb-4"
                                variant="h6"
                                gutterBottom>
                                Why not start by saying <Link href='/search?q=quack'>Quack</Link>?
                            </Typography>
                            <div className="flex flex-row w-full">
                                <SearchTextField
                                    placeholder='Search for something...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onBlur={(e) => setQuery(e.target.value)}
                                    onClear={() => setQuery('')}
                                    onSearch={handleSearch}
                                    size="small"
                                    fullWidth
                                />
                                <Button
                                    disabled={query === ''}
                                    variant={query === '' ? 'text' : 'contained'}
                                    onClick={handleSearch}>
                                    <Icon>search</Icon>
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={0} md={3} lg={4} />
                </Grid>
            </div>
        </Page>
    )
}