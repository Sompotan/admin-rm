import React from "react";

export type NavItem = {
    label: string;
    icon: React.ReactNode;
    path?: string;
    isActive: boolean;
}