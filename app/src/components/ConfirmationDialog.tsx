import { Button, Dialog, DialogActions, DialogProps, DialogTitle } from "@mui/material";

export type ConfirmationDialogProps = DialogProps & {
    title: string;
    onCancel?: React.MouseEventHandler;
    onConfirm?: React.MouseEventHandler;
}

export default function ConfirmationDialog({ title, onCancel, onConfirm, ...others }: ConfirmationDialogProps) {
    return (
        <Dialog
            {...others}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogActions>
                <Button onClick={onCancel}>
                    No
                </Button>
                <Button onClick={onConfirm}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}