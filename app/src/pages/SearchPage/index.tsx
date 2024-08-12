import { SearchParams, useSearch } from "@/api/search";
import Header from "@/components/Header";
import Page from "@/components/Page";
import Content from "@/components/Page/Content";
import { Grid, Pagination, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Icon from "@/components/Icon";
import { useFormik } from "formik";
import { useHistory } from "@/components/History";
import Quack from "@/components/Quack";
import SearchResultItem from "./SearchResultItem";
import "./index.css";
import getFormikValues from "@/lib/form/getFormikValues";

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

const initialValues = {
    q: '',
    page: 0,
    limit: 10
}

export default function SearchPage() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { add } = useHistory();
    const [highlight, setHighlight] = React.useState(false);
    const [formikValues, setFormikValues] = React.useState(initialValues);

    const { trigger , data: searchResults, isMutating } = useSearch();

    React.useEffect(() => {
        // Collect URL params entries and clean up any null ones
        // Also, clean up any invalid not expected entries
        const entries = Object.fromEntries(searchParams.entries());
        // const raw = Object.assign({}, initialValues, entries, {
        //     page: parseInt(entries.page),
        //     limit: parseInt(entries.limit)
        // });
        const params = getFormikValues(initialValues, entries, Object.keys(initialValues));
        
        // If there's some query
        if(params.q !== '') {
            trigger(params);
        }

        setFormikValues(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const handleSubmit = (values: SearchParams) => {
        setSearchParams({
            q: values.q,
            page: values.page!.toString(),
            limit: values.limit!.toString()
        });
        trigger(values)
        add(values.q);
    }

    const formik = useFormik({
        initialValues: formikValues,
        onSubmit: handleSubmit,
        enableReinitialize: true
    });

    const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
        const params = {
            ...formik.values,
            page: value - 1
        }

        formik.setFieldValue('page', value - 1);

        handleSubmit(params)
    }
    
    return (
        <Page>
            <Header
                name='q'
                value={formik.values.q}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onSearch={formik.handleSubmit}
                onClear={() => formik.setFieldValue('q', '')}
                highlight={highlight}
                onHighLight={() => setHighlight(!highlight)}
            />

            {isMutating && <SearchPageLoading />}

            {!isMutating && searchResults?.data.length === 0 && <SearchPageEmpty />}

            {!isMutating && searchResults?.data && searchResults?.data.length > 0 &&
                <Content className="px-8">
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                            <div className="mb-2">
                                <Typography color="grey" variant="caption">Total of {searchResults.meta.total} results</Typography>
                            </div>
                            {searchResults?.data?.map((result, index) => (
                                <SearchResultItem key={index} query={highlight ? formik.values.q : ''} {...result} />
                            ))}
                            <div className="flex justify-center">
                                <Pagination page={formik.values.page + 1} count={Math.ceil(searchResults.meta.total / searchResults.meta.limit)} onChange={handlePagination} />
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <Quack query={formik.values.q} />
                        </Grid>
                    </Grid>
                </Content>
            }
        </Page>
    )
}