import { useEffect, useState } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    inventoryApi.getAll()
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const favoriteItems = items.filter(item => favoriteIds.includes(item.id));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Ваші улюблені</h1>
      <p className="text-gray-500 mb-10">Товари, які ви зберегли для швидкого доступу</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3].map(n => <div key={n} className="bg-gray-200 h-80 rounded-2xl animate-pulse"></div>)}
        </div>
      ) : favoriteItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Список порожній</h2>
          <p className="text-gray-500 mb-6">Ви ще не додали жодного товару до улюблених.</p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Перейти до галереї
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteItems.map(item => (
            <InventoryCard 
              key={item.id} 
              item={item} 
              onClick={setSelectedItem}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      <InventoryQuickView 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        isFavorite={selectedItem ? isFavorite(selectedItem.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}