import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';

export default function AdminInventory() {
  const { items, fetchItems, loading } = useInventory();
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await inventoryApi.delete(itemToDelete.id);
      fetchItems(); 
    } catch (error) {
      console.error("Помилка видалення:", error);
    } finally {
      setItemToDelete(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управління інвентарем</h1>
        <Link to="/admin/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Додати нову
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Завантаження...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 bg-white border rounded-lg text-gray-500">Інвентар порожній.</div>
      ) : (
        <InventoryTable items={items} onDeleteClick={setItemToDelete} />
      )}

      <ConfirmModal 
        isOpen={!!itemToDelete} 
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.inventory_name}
      />
    </div>
  );
}