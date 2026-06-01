import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Products from './pages/Products.tsx';
import Categories from './pages/Categories.tsx';
import Suppliers from './pages/Suppliers.tsx';
import Inventory from './pages/Inventory.tsx';
import Sales from './pages/Sales.tsx';
import Reports from './pages/Reports.tsx';
import Users from './pages/Users.tsx';
import Settings from './pages/Settings.tsx';
import Login from './pages/Login.tsx';

const pageConfigs = {
  '/dashboard': { title: 'Dashboard' },
  '/products': { title: 'Products', action: 'Add Product' },
  '/categories': { title: 'Categories', action: 'Add Category' },
  '/suppliers': { title: 'Suppliers', action: 'Add Supplier' },
  '/inventory': { title: 'Inventory' },
  '/sales': { title: 'Sales', action: 'Add Sale' },
  '/reports': { title: 'Reports' },
  '/users': { title: 'User Management', action: 'Add User' },
  '/settings': { title: 'Settings' }
};

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentConfig = pageConfigs[location.pathname] || { title: 'Inventory' };
  const hideLayout = location.pathname === '/login';

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={<Login onLogin={() => setLoggedIn(true)} />}
      />
      <Route
        path="/*"
        element={
          <Layout
            title={currentConfig.title}
            actionLabel={currentConfig.action}
            onToggleSidebar={() => setSidebarOpen(open => !open)}
            sidebarOpen={sidebarOpen}
            onCloseSidebar={() => setSidebarOpen(false)}
          >
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="sales" element={<Sales />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
