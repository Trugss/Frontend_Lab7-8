import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="text-xl font-black text-blue-600">INVENTORY APP</span>
              
              <div className="flex gap-1">
                <NavLink to="/" className={({isActive}) => `px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Галерея
                </NavLink>
                <NavLink to="/favorites" className={({isActive}) => `px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Улюблені
                </NavLink>
              </div>
            </div>
            
            <NavLink to="/admin" className={({isActive}) => `px-4 py-2 rounded-lg font-medium text-sm transition border border-gray-200 shadow-sm ${isActive ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}>
              ⚙️ Адмін-панель
            </NavLink>
          </div>
        </nav>

        <div className="pb-12">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
            <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;