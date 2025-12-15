import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    // Dark mode disabled - always use light mode
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    // Dark mode disabled - always use light mode
    applyTheme('light');
}

export function useAppearance() {
    // Dark mode disabled - always return light
    const [appearance] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        // Dark mode disabled - always apply light mode
        applyTheme('light');
    }, []);

    useEffect(() => {
        // Dark mode disabled - always use light mode
        applyTheme('light');
    }, []);

    return { appearance, updateAppearance } as const;
}
