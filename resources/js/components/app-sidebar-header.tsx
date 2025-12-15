import { Breadcrumbs } from '@/components/breadcrumbs';
import { AppHeaderProfile } from '@/components/app-header-profile';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
    showProfile = true,
}: {
    breadcrumbs?: BreadcrumbItemType[];
    showProfile?: boolean;
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-6 transition-[width,height] ease-linear md:px-4 w-full">
            <div className="flex items-center gap-2">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {showProfile && (
                <div className="flex items-center">
                    <AppHeaderProfile />
                </div>
            )}
        </header>
    );
}
