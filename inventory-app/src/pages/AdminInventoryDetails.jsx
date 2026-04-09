import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    inventoryApi.getById(id)
      .then(res => setItem(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!item) return <div className="p-6">Завантаження деталей...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <img 
          src={item.photoUrl || 'https://via.placeholder.com/600x400'} 
          alt={item.inventory_name} 
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{item.inventory_name}</h1>
        <p className="text-gray-600 mb-6 whitespace-pre-wrap">{item.description}</p>
        
        <div className="flex gap-4">
          <Link to={`/admin/edit/${item.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Редагувати
          </Link>
          <Link to="/admin" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Назад до списку
          </Link>
        </div>
      </div>
    </div>
  );
}