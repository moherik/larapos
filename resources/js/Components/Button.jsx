import * as React from "react";

export default function Button({ icon, label, className, onClick }) {
    return (
        <button type="button" className={`flex items-center gap-2 py-2 px-3 text-sm rounded-lg ${className}`} onClick={onClick}>
            {icon && icon}
            {label}
        </button>
    );
}
