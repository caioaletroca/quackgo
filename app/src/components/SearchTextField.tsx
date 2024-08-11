import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import Icon from "./Icon";

export type SearchTextFieldProps = TextFieldProps & {
    onSearch?: () => void;
	onClear?: () => void;
};

export default function SearchTextField({ value, onSearch, onClear, ...others }: SearchTextFieldProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key == 'Enter') {
            onSearch?.();
            e.preventDefault();
        }
    }

    return (
        <TextField
            value={value}
            InputProps={{
                endAdornment: value !== '' && (
					<InputAdornment position="end">
						<IconButton onClick={onClear}>
							<Icon>close</Icon>
						</IconButton>
					</InputAdornment>
				),
            }}
            onKeyDown={handleKeyDown}
            {...others}
        />
    )
}