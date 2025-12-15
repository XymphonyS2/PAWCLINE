import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    hideDefaultHeader = false,
    showProfileInHeader = true,
}: PropsWithChildren<{ 
    breadcrumbs?: BreadcrumbItem[]; 
    hideDefaultHeader?: boolean;
    showProfileInHeader?: boolean;
}>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden border-0 shadow-none">
                {!hideDefaultHeader && (
                    <AppSidebarHeader 
                        breadcrumbs={breadcrumbs} 
                        showProfile={showProfileInHeader}
                    />
                )}
                {children}
            </AppContent>
        </AppShell>
    );
}
