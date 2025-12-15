import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Edit, Heart, Plus, Shield, Stethoscope, Trash2, Users } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    gelar: string | null;
    alamat: string | null;
    kontak: string | null;
    is_verified: boolean;
    created_at: string;
}

export default function Index({
    users,
    role,
}: {
    users: User[];
    role: string;
}) {
    const { flash } = usePage<SharedData>().props;
    const successMessage = flash?.success as string | undefined;
    
    const roles = [
        { value: 'admin', label: 'Admin', icon: Shield },
        { value: 'dokter', label: 'Dokter', icon: Stethoscope },
        { value: 'pemilik_hewan', label: 'Pemilik Hewan', icon: Heart },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
            router.delete(`/admin/user/${id}`, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['users'] });
                },
            });
        }
    };

    const getRoleLabel = (roleValue: string) => {
        const roleObj = roles.find(r => r.value === roleValue);
        return roleObj ? roleObj.label : roleValue;
    };

    const getRoleIcon = (roleValue: string) => {
        const roleObj = roles.find(r => r.value === roleValue);
        return roleObj ? roleObj.icon : Users;
    };

    return (
        <AppSidebarLayout>
            <Head title="Manajemen Akun" />
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Success Message */}
                {successMessage && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <AlertTitle className="text-green-900 font-semibold">Berhasil</AlertTitle>
                        <AlertDescription className="text-green-700">
                            {successMessage}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Manajemen Akun
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Kelola semua akun pengguna sistem
                        </p>
                    </div>
                    <Link href={`/admin/user/create?role=${role}`}>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah {getRoleLabel(role)}
                        </Button>
                    </Link>
                </div>

                {/* Role Filter Tabs */}
                <Card className="p-1 bg-white border-gray-200">
                    <div className="flex gap-1">
                        {roles.map((roleOption) => {
                            const Icon = roleOption.icon;
                            const isActive = role === roleOption.value;
                            return (
                                <button
                                    key={roleOption.value}
                                    onClick={() => router.visit(`/admin/user?role=${roleOption.value}`, {
                                        preserveState: false,
                                    })}
                                    className={cn(
                                        'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all',
                                        isActive
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {roleOption.label}
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Users List */}
                {users.length === 0 ? (
                    <Card className="p-12 text-center bg-white border-gray-200">
                        {(() => {
                            const Icon = getRoleIcon(role);
                            return <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />;
                        })()}
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                            Belum ada {getRoleLabel(role).toLowerCase()}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Mulai dengan menambahkan {getRoleLabel(role).toLowerCase()} pertama
                        </p>
                        <Link href={`/admin/user/create?role=${role}`}>
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah {getRoleLabel(role)}
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {users.map((user) => (
                            <Card key={user.id} className="p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-lg text-gray-900">
                                                {role === 'dokter' && user.gelar 
                                                    ? `dr. ${user.name} ${user.gelar}` 
                                                    : user.name}
                                            </h3>
                                            {!user.is_verified && role === 'pemilik_hewan' && (
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                                    Belum Terverifikasi
                                                </Badge>
                                            )}
                                            {user.is_verified && (
                                                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                                                    Terverifikasi
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                                        {user.alamat && (
                                            <p className="text-sm text-gray-600 mb-1">
                                                Alamat: {user.alamat}
                                            </p>
                                        )}
                                        {user.kontak && (
                                            <p className="text-sm text-gray-600">
                                                Kontak: {user.kontak}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-300 hover:bg-gray-50"
                                            onClick={() => router.visit(`/admin/user/${user.id}/edit`)}
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
