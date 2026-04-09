export default function ConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Підтвердження видалення</h3>
        <p className="mb-6 text-gray-600">
          Ви дійсно хочете видалити <b>{itemName}</b>? Цю дію неможливо скасувати.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
            Скасувати
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}