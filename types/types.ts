import React from "react";

export type NavItem = {
    label: string;
    icon: React.ReactNode;
    path?: string;
}

export type HeaderItem = {
    title: string;
    description: string;
    path?: string;
}