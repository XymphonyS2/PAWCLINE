import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Hapus Akun"
                description="Hapus akun Anda dan semua sumber dayanya"
            />
            <div className="space-y-4 rounded-lg border-2 border-red-200 bg-red-50 p-6">
                <div className="relative space-y-2">
                    <div className="flex items-center gap-2 text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="font-semibold text-base">Peringatan</p>
                    </div>
                    <p className="text-sm text-red-600 font-medium">
                        Harap berhati-hati, tindakan ini tidak dapat dibatalkan. Semua data dan sumber daya akun Anda akan dihapus secara permanen.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                            data-test="delete-user-button"
                        >
                            Hapus Akun
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogTitle className="text-lg font-bold text-gray-900">
                            Apakah Anda yakin ingin menghapus akun Anda?
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. Harap masukkan password Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun secara permanen.
                        </DialogDescription>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({ resetAndClearErrors, processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-gray-900 font-semibold"
                                        >
                                            Password <span className="text-red-500">*</span>
                                        </Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="Masukkan password Anda"
                                            autoComplete="current-password"
                                            className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11"
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    resetAndClearErrors()
                                                }
                                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                            >
                                                Batal
                                            </Button>
                                        </DialogClose>

                                        <Button
                                            variant="destructive"
                                            disabled={processing}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                                            asChild
                                        >
                                            <button
                                                type="submit"
                                                data-test="confirm-delete-user-button"
                                            >
                                                {processing ? 'Menghapus...' : 'Hapus Akun'}
                                            </button>
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
