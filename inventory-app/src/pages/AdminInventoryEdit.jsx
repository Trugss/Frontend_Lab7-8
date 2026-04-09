import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    inventoryApi.getById(id)
      .then(res => setInitialData(res.data))
      .catch(err => console.error("Помилка завантаження:", err));
  }, [id]);

  const handleEdit = async (textData, photoFile) => {
    try {
      await inventoryApi.updateText(id, textData);

      if (photoFile) {
        const photoData = new FormData();
        photoData.append('photo', photoFile);
        await inventoryApi.updatePhoto(id, photoData);
      }

      navigate('/admin');
    } catch (error) {
      console.error("Помилка оновлення:", error);
      alert("Не вдалося оновити інвентар");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Редагування позиції</h1>
      <InventoryForm initialData={initialData} onSubmit={handleEdit} isEdit={true} />
    </div>
  );
}