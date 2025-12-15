<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\RegisteredUserResponse;

class CustomRegisteredUserResponse implements RegisteredUserResponse
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        // Logout user immediately after registration (prevent auto login)
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        // Redirect to login page with success message
        return redirect()->route('login')->with('success', 'Akun berhasil dibuat! Silakan login untuk melanjutkan.');
    }
}

