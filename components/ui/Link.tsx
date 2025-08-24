import React from "react";

type ActionLinkProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
};

const ActionLink = ({ label, icon, onClick, disabled }: ActionLinkProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="text-orange-base hover:underline cursor-pointer flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {icon} {label}
        </button>
    );
};

export default ActionLink;
