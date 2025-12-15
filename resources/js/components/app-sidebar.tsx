import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Heart, 
    Calendar, 
    Stethoscope, 
    Settings, 
    LogOut,
    Users,
    FileCheck,
    Clock,
    MessageSquare
} from 'lucide-react';
import AppLogo from './app-logo';
import { type SharedData } from '@/types';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    let mainNavItems: NavItem[] = [];
    let dashboardUrl = '/';

    if (user?.role === 'pemilik_hewan') {
        dashboardUrl = '/pemilik-hewan/dashboard';
        mainNavItems = [
            {
                title: 'Dashboard',
                href: '/pemilik-hewan/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Hewan Saya',
                href: '/pemilik-hewan/hewan',
                icon: Heart,
            },
            {
                title: 'Jadwal',
                href: '/pemilik-hewan/antrian',
                icon: Calendar,
            },
            {
                title: 'Dokter',
                href: '/pemilik-hewan/chat',
                icon: Stethoscope,
            },
                  {
                      title: 'Pengaturan',
                      href: '/settings/profil',
                      icon: Settings,
                  },
        ];
    } else if (user?.role === 'admin') {
        dashboardUrl = '/admin/dashboard';
        mainNavItems = [
            {
                title: 'Dashboard',
                href: '/admin/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Manajemen Akun',
                href: '/admin/user?role=admin',
                icon: Users,
            },
            {
                title: 'Verifikasi',
                href: '/admin/verifikasi',
                icon: FileCheck,
            },
            {
                title: 'Antrian',
                href: '/admin/antrian',
                icon: Clock,
            },
            {
                title: 'Jadwal Dokter',
                href: '/admin/jadwal-dokter',
                icon: Calendar,
            },
                  {
                      title: 'Pengaturan',
                      href: '/settings/profil',
                      icon: Settings,
                  },
        ];
    } else if (user?.role === 'dokter') {
        dashboardUrl = '/dokter/dashboard';
        mainNavItems = [
            {
                title: 'Dashboard',
                href: '/dokter/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Antrian',
                href: '/dokter/antrian',
                icon: Clock,
            },
            {
                title: 'Chat',
                href: '/dokter/chat',
                icon: MessageSquare,
            },
                  {
                      title: 'Pengaturan',
                      href: '/settings/profil',
                      icon: Settings,
                  },
        ];
    }

    return (
        <Sidebar 
            collapsible={undefined}
            variant="inset" 
            className="bg-white border-r border-gray-200 [&_[data-sidebar=sidebar]]:!bg-white [&_[data-sidebar=sidebar]]:!text-gray-900 [&_.group\\/sidebar-wrapper]:!bg-white [&_.group\\/sidebar-wrapper.has-data-\\[variant\\=inset\\]\\:bg-sidebar]:!bg-white"
        >
            <SidebarHeader className="border-b border-gray-200 pb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
                            <Link href={dashboardUrl} prefetch>
                                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                    🐾 Pawcline
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* NavUser removed - profile moved to header */}
        </Sidebar>
    );
}
