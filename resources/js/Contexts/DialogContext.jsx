import { createContext, useRef, useState } from "react";
import CustomDialog from "@/Components/CustomDialog";

export const CustomDialogServiceContext = createContext(Promise.reject);

export const CustomDialogServiceProvider = ({ children }) => {
    const [dialog, setDialog] = useState({ open: false });
    const awaitingPromiseRef = useRef();

    const openDialog = (options) => {
        setDialog({ ...options, open: true });
        return new Promise((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    const handleClose = () => {
        if (dialog.catchOnCancel && awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject();
        }

        setDialog({ ...dialog, open: false });
    };

    const handleSubmit = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
        }

        setDialog({ ...dialog, open: false });
    };

    return (
        <>
            <CustomDialogServiceContext.Provider value={openDialog}>
                {children}
            </CustomDialogServiceContext.Provider>

            <CustomDialog
                open={dialog?.open}
                onSubmit={handleSubmit}
                onClose={handleClose}
                {...dialog}
            />
        </>
    );
};
