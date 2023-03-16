import { useContext } from "react";
import { CustomDialogServiceContext } from "@/Contexts/DialogContext";

const useDialog = () => useContext(CustomDialogServiceContext);
export default useDialog;
