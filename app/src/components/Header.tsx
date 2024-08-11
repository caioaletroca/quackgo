import { AppBar, Button, Toolbar } from "@mui/material";
import SearchTextField, { SearchTextFieldProps } from "./SearchTextField";
import { HistoryButton } from "./History";
import Icon from "./Icon";

type HeaderProps = SearchTextFieldProps;

export default function Header({ onSearch, ...others }: HeaderProps) {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <div className="mr-4">
                    <HistoryButton />
                </div>
                <div className="flex flex-row space-x-4">
                    <SearchTextField
                        placeholder="Pesquisar..."
                        size='small'
                        onSearch={onSearch}
                        {...others}
                    />
                    <Button variant='contained' size='small' onClick={onSearch}>
                        <Icon>search</Icon>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}