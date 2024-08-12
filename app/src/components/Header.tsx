import { AppBar, Button, Grid, Toolbar, Tooltip } from "@mui/material";
import SearchTextField, { SearchTextFieldProps } from "./SearchTextField";
import { HistoryButton } from "./History";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

type HeaderProps = SearchTextFieldProps;

export default function Header({ onSearch, ...others }: HeaderProps) {
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
                </Grid>
                {/* <div className="mr-4">
                </div> */}
            </Toolbar>
        </AppBar>
    )
}