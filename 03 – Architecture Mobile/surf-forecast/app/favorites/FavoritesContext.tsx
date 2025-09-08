import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'favorites:spots';

const FavoritesContext = createContext<{
    favorites: Set<string>;
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
} | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode; }) {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    useEffect(() => {
        AsyncStorage.getItem(KEY).then((raw) => {
            if (raw) setFavorites(new Set(JSON.parse(raw)));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(KEY, JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    const toggleFavorite = useCallback((id: string) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
    return ctx;
}
