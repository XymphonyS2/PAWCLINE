<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: [
            __DIR__.'/../routes/web.php',
            __DIR__.'/../routes/pemilik-hewan.php',
            __DIR__.'/../routes/admin.php',
            __DIR__.'/../routes/dokter.php',
        ],
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\EnsureRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\HttpException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getStatusCode());
            }

            // Handle 403 Forbidden with Inertia
            if ($e->getStatusCode() === 403) {
                return \Inertia\Inertia::render('errors/403', [
                    'status' => $e->getStatusCode(),
                    'message' => $e->getMessage() ?: 'Akses ditolak',
                ])->toResponse($request)->setStatusCode(403);
            }

            // Handle other HTTP exceptions with Inertia if needed
            if (in_array($e->getStatusCode(), [404, 500, 503])) {
                return \Inertia\Inertia::render('errors/' . $e->getStatusCode(), [
                    'status' => $e->getStatusCode(),
                    'message' => $e->getMessage(),
                ])->toResponse($request)->setStatusCode($e->getStatusCode());
            }
        });
    })->create();
