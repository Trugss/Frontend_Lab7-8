export default function InventoryQuickView({ item, onClose, isFavorite, onToggleFavorite }) {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 z-10 transition">
          ✕
        </button>
        
        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-auto">
            <img src={item.photoUrl || '/placeholder.png'} alt={item.inventory_name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.inventory_name}</h2>
            <p className="text-gray-600 mb-8 flex-grow">{item.description}</p>
            
            <button 
              onClick={() => onToggleFavorite(item.id)}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                isFavorite ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isFavorite ? '♥ Видалити з улюблених' : '♡ Додати в улюблені'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}