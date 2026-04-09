import { useState, useEffect } from 'react';

export default function InventoryForm({ initialData = {}, onSubmit, isEdit = false }) {
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: '',
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (initialData.inventory_name) {
      setFormData({
        inventory_name: initialData.inventory_name || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, photo);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Назва інвентарю *</label>
        <input 
          type="text" 
          required
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.inventory_name}
          onChange={(e) => setFormData({...formData, inventory_name: e.target.value})}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
        <textarea 
          rows="4"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Фото {isEdit && <span className="text-gray-400 font-normal">(залиште пустим, щоб не змінювати)</span>}
        </label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full border p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition">
        {isEdit ? 'Зберегти зміни' : 'Створити позицію'}
      </button>
    </form>
  );
}