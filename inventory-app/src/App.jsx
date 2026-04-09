import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        
        <nav className="bg-white shadow-sm p-4 mb-8">
          <div className="max-w-6xl mx-auto flex items-center gap-6 font-medium">
            <span className="text-xl font-bold mr-4">Склад UI</span>
            <Link to="/admin" className="text-blue-600 hover:text-blue-800">
              Адмін-панель
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/admin/create" element={<AdminInventoryCreate />} />
          <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
          <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;