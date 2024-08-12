import { AppBar, Button, Grid, IconButton, Toolbar, Tooltip } from "@mui/material";
import SearchTextField, { SearchTextFieldProps } from "./SearchTextField";
import { HistoryButton } from "./History";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

type HeaderProps = SearchTextFieldProps & {
    highlight?: boolean;
    onHighLight?: () => void;
};

export default function Header({ onSearch, highlight, onHighLight, ...others }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <div className="flex flex-row px-2 justify-evenly">
                            <Tooltip title='Home'>
                                <img
                                    className="mr-4 w-6 cursor-pointer"
                                    onClick={() => navigate('/')}
                                    src='./logo.svg'
                                />
                            </Tooltip>
                            <HistoryButton />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="flex flex-row space-x-4">
                            <SearchTextField
                                placeholder="Search..."
                                size='small'
                                onSearch={onSearch}
                                fullWidth
                                {...others}
                            />
                            <Button variant='contained' size='small' onClick={onSearch}>
                                <Icon>search</Icon>
                            </Button>
                        </div>
                    </Grid>
                    {
                        onHighLight &&
                        <Grid item xs={5}>
                            <div className="mx-8">
                                <Tooltip title='Highlight query'>
                                    <IconButton color={highlight ? 'warning' : 'default'} onClick={onHighLight}>
                                        <Icon>ink_highlighter</Icon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grid>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}