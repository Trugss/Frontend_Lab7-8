import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();

  const handleCreate = async (textData, photoFile) => {
    try {
      const formData = new FormData();
      formData.append('inventory_name', textData.inventory_name);
      formData.append('description', textData.description);
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      await inventoryApi.create(formData);
      navigate('/admin');
    } catch (error) {
      console.error("Помилка створення:", error);
      alert("Не вдалося створити інвентар");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Створення нової позиції</h1>
      <InventoryForm onSubmit={handleCreate} isEdit={false} />
    </div>
  );
}