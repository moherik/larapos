import "./bootstrap";
import "../css/app.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { SnackbarProvider } from "notistack";

import { CustomDialogServiceProvider } from "./Contexts/DialogContext";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <SnackbarProvider>
                    <CustomDialogServiceProvider>
                        <App {...props} />
                    </CustomDialogServiceProvider>
                </SnackbarProvider>
            </StrictMode>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
