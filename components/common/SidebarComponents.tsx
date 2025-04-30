"use client";

import React from 'react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import TitleHeader from './TitleHeader'
import {navItems} from "@/data/navItems";
import {usePathname} from "next/navigation";

export default function SidebarComponents({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
      <Sidebar  {...props}>
        <SidebarHeader>
          <TitleHeader />
        </SidebarHeader>
        <div className="m-2"></div>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
                if (item.path != null) {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <SidebarMenuItem key={item.label} className="px-4 ">
                            <SidebarMenuButton asChild isActive={isActive} className="hover:bg-sidebar-accent">
                                <a href={item.path} className="h-auto p-4">
                                    <div className="flex flex-row items-center justify-center gap-2 ">
                                        <div>{item.icon}</div>
                                        <p>{item.label}</p>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                }
            })}
          </SidebarMenu>
        </SidebarContent>

      </Sidebar>
    )
}