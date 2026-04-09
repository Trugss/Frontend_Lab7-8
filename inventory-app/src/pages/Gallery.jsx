import { useEffect, useState } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    inventoryApi.getAll()
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Каталог інвентарю</h1>
      <p className="text-gray-500 mb-10">Переглядайте та обирайте найкраще обладнання</p>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="bg-gray-200 h-80 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-400">Галерея порожня</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map(item => (
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