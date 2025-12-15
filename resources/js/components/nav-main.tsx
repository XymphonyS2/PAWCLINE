import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-gray-500 text-xs font-medium mb-3 px-2">Platform</SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => {
                    // Untuk Manajemen Akun, cek apakah URL dimulai dengan /admin/user (tanpa query string)
                    let isActive = false;
                    const itemUrl = resolveUrl(item.href);
                    const currentUrl = page.url.split('?')[0]; // Ambil path tanpa query string
                    const itemPath = itemUrl.split('?')[0]; // Ambil path tanpa query string
                    
                    if (itemPath === '/admin/user') {
                        // Untuk Manajemen Akun, aktif jika path dimulai dengan /admin/user (termasuk /admin/user/create, /admin/user/edit, dll)
                        isActive = currentUrl.startsWith('/admin/user');
                    } else if (itemPath === '/settings/profil') {
                        // Untuk Pengaturan, aktif jika path dimulai dengan /settings (termasuk /settings/profil, /settings/keamanan, dll)
                        isActive = currentUrl.startsWith('/settings');
                    } else {
                        // Untuk menu lain, gunakan logika normal
                        isActive = currentUrl.startsWith(itemPath);
                    }
                    
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className={`rounded-lg transition-all focus:!outline-none focus-visible:!ring-0 ${
                                    isActive 
                                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md hover:from-pink-600 hover:to-purple-700 data-[active=true]:bg-gradient-to-r data-[active=true]:from-pink-500 data-[active=true]:to-purple-600" 
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                <Link href={item.href} prefetch className="flex items-center gap-3">
                                    {item.icon && (
                                        <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
                                    )}
                                    <span className={`${isActive ? "text-white font-semibold" : "text-gray-700 font-medium"}`}>
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
