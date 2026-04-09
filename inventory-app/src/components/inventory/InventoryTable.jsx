import { Link } from 'react-router-dom';

export default function InventoryTable({ items, onDeleteClick }) {
  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-4 w-24">Фото</th>
            <th className="p-4">Назва</th>
            <th className="p-4">Опис</th>
            <th className="p-4 text-right">Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">
                <img src={item.photoUrl || 'https://via.placeholder.com/150'} alt="item" className="w-12 h-12 object-cover rounded bg-gray-200" />
              </td>
              <td className="p-4 font-medium">{item.inventory_name}</td>
              <td className="p-4 text-gray-500 text-sm max-w-xs truncate">{item.description}</td>
              <td className="p-4">
                <div className="flex justify-end gap-3 text-sm font-medium">
                  <Link to={`/admin/details/${item.id}`} className="text-green-600 hover:text-green-800">Переглянути</Link>
                  <Link to={`/admin/edit/${item.id}`} className="text-blue-600 hover:text-blue-800">Редагувати</Link>
                  <button onClick={() => onDeleteClick(item)} className="text-red-600 hover:text-red-800">Видалити</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}