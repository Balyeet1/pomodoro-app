import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

export interface GenericDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children: React.ReactNode;
}

/**
 * A generic dialog component.
 *
 * @param {GenericDialogProps} props - The component props.
 * @returns {JSX.Element} The dialog component.
 */
export default function GenericDialog({
    isOpen,
    onClose,
    title,
    className,
    children
}: GenericDialogProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px'
                }
            }}
        >
            <div className={className}>
                <DialogTitle id="dialog-title">
                    <div className="flex justify-between items-center">
                        <strong>{title}</strong>
                        <CloseIcon
                            fontSize="small"
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                </DialogTitle>
                <Divider />
                <DialogContent>{children}</DialogContent>
            </div>
        </Dialog>
    );
}
