import { Drawer, DrawerProps, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useHistory } from "./useHistory";

export type HistoryDrawerProps = DrawerProps

function HistoryItem({ query }: { query: string }) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary={query} />
            </ListItemButton>
        </ListItem>
    );
}

export function HistoryDrawer({ ...others }: HistoryDrawerProps) {
    const { history } = useHistory();

    return (
        <Drawer
            {...others}>
            <div className="flex flex-col">
                <List>
                    {history.map(query => (
                        <HistoryItem query={query} />
                    ))}
                </List>
            </div>
        </Drawer>
    )
}