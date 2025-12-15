import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';
import { type SharedData } from '@/types';
import { Bell, LogOut } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';

export function AppHeaderProfile() {
    const { auth, notificationCount } = usePage<SharedData>().props as any;
    const user = auth.user;
    const getInitials = useInitials();

    const handleLogout = () => {
        router.post(logout());
    };

    const getRoleLabel = () => {
        if (user?.role === 'admin') return 'Admin';
        if (user?.role === 'dokter') return 'Dokter';
        return null;
    };

    const roleLabel = getRoleLabel();

    return (
        <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative h-10 w-10"
                    onClick={() => router.visit('/notifikasi')}
                >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </span>
                    )}
                </Button>
            </div>

            {/* User Info with Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-3 h-auto p-2 hover:bg-gray-50 rounded-lg"
                    >
                        <div className="text-right hidden sm:block">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                {roleLabel && (
                                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                                        {roleLabel}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-pink-500 text-white font-semibold">
                                {user ? getInitials(user.name) : 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                            {roleLabel && (
                                <span className="text-xs mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium inline-block w-fit">
                                    {roleLabel}
                                </span>
                            )}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Keluar</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

