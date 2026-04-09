import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem('inventory_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      }
      return [...prev, id];
    });
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  return { favoriteIds, toggleFavorite, isFavorite };
}