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
            <DialogTitle data-testid='dialog-title'>
                {title}
            </DialogTitle>
            <DialogActions>
                <Button data-testid='dialog-cancel-button' onClick={onCancel}>
                    No
                </Button>
                <Button data-testid='dialog-confirm-button' onClick={onConfirm}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}