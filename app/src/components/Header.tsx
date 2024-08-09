import { AppBar, Toolbar } from "@mui/material";
import SearchTextField, { SearchTextFieldProps } from "./SearchTextField";

type HeaderProps = SearchTextFieldProps;

export default function Header({ ...others }: HeaderProps) {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <SearchTextField
                    placeholder="Pesquisar..."
                    size='small'
                    {...others}
                />
            </Toolbar>
        </AppBar>
    )
}