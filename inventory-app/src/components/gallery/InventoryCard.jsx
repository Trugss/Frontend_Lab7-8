export default function InventoryCard({ item, onClick, isFavorite, onToggleFavorite }) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer relative flex flex-col h-full border border-gray-100"
      onClick={() => onClick(item)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={item.photoUrl || '/placeholder.png'} 
          alt={item.inventory_name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{item.inventory_name}</h3>
        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{item.description}</p>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          onToggleFavorite(item.id);
        }}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform z-10"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={isFavorite ? "currentColor" : "none"} 
          stroke="currentColor" 
          className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}