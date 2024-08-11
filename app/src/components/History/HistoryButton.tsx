import { IconButton, Tooltip } from "@mui/material";
import Icon from "../Icon";
import React from "react";
import { HistoryDrawer } from "./HistoryDrawer";

export function HistoryButton() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => setOpen(!open);

    return (
        <>
            <Tooltip title='Search history'>
                <IconButton onClick={handleClick}>
                    <Icon>history</Icon>
                </IconButton>
            </Tooltip>
            <HistoryDrawer open={open} onClose={() => setOpen(false)} />
        </>
    )
}