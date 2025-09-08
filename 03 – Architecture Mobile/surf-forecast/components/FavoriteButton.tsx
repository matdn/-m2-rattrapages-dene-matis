import React from 'react';
import { Pressable, Text } from 'react-native';
import { useFavorites } from '../app/favorites/FavoritesContext';

export default function FavoriteButton({ id }: { id: string; }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(id);

    return (
        <Pressable onPress={() => toggleFavorite(id)} accessibilityLabel="Toggle favori">
            <Text style={{ fontSize: 20, color: fav ? 'gold' : 'white' }
            }> {fav ? '★' : '☆'}</Text >
        </Pressable >
    );
}
