import React from "react";
import { Drawer, DrawerProps, IconButton, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import { useHistory } from "./useHistory";
import Icon from "../Icon";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";
import "./HistoryDrawer.css";

export type HistoryItemProps = {
    query: string;
    onClick?: React.MouseEventHandler;
    onClose?: React.MouseEventHandler
}

function HistoryItem({ query, onClick, onClose }: HistoryItemProps) {
    return (
        <ListItem
            data-testid='history-item'
            className="history-item"
            disablePadding
            onClick={onClick}
            secondaryAction={(
                <IconButton data-testid='history-item-delete-button' className="history-item-action" edge='end' onClick={onClose}>
                    <Icon color='grey'>close</Icon>
                </IconButton>
            )}>
            <ListItemButton>
                <Tooltip
                    title={query}
                    className="overflow-x-clip"
                    disableHoverListener={query.length < 32}>
                    <ListItemText primary={query} primaryTypographyProps={{
                        className: "overflow-x-hidden text-ellipsis"
                    }} />
                </Tooltip>
            </ListItemButton>
        </ListItem>
    );
}

export type HistoryDrawerProps = DrawerProps & {
    onClose: () => void;
}

export function HistoryDrawer({ onClose, ...others }: HistoryDrawerProps) {
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();
    const { history, remove, clear } = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClick = (query: string) => {
        navigate('/search');
        setSearchParams({ q: query });
        onClose?.();
    }

    const handleClose = (query: string) => {
        remove(query);
    }

    const handleConfirm = () => {
        clear();
        setOpen(false);
    }

    return (
        <>
            <ConfirmationDialog
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={handleConfirm}
                onClose={() => setOpen(false)}
                title='Do you wish to delete your recent queries?'
            />
            <Drawer
                data-testid='history-drawer'
                onClose={onClose}
                {...others}>
                <div className="flex flex-row h-full w-96">
                    <div className="flex flex-col h-full p-2 bg-neutral-800">
                        <IconButton data-testid='history-drawer-close-button' onClick={onClose as React.MouseEventHandler}>
                            <Icon>chevron_backward</Icon>
                        </IconButton>
                    </div>
                    <div className="flex flex-col flex-1 overflow-x-auto">
                        <div className="flex justify-between py-2 px-8 mb-2 select-none items-center">
                            <Typography variant="body1" color="gray">Recent Queries</Typography>
                            <Tooltip title='Remove all recent queries'>
                                <IconButton data-testid='history-drawer-delete-button' edge='end' onClick={() => setOpen(true)}>
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                        {
                            history.length === 0 &&
                            <div className="flex flex-col items-center m-auto">
                                <Icon className="text-6xl text-neutral-700 mb-2">history</Icon>
                                <Typography color='grey' variant='body2'>No recents queries</Typography>
                            </div>
                        }
                        {
                            history.length > 0 &&
                            <List className="overflow-y-auto">
                                {history.map(query => (
                                    <HistoryItem
                                        key={query}
                                        query={query}
                                        onClick={() => handleClick(query)}
                                        onClose={(e) => {
                                            handleClose(query);
                                            e.stopPropagation();
                                        }}/>
                                ))}
                            </List>
                        }
                    </div>
                </div>
            </Drawer>
        </>
    )
}