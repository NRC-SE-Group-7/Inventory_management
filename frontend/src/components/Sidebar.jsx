import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
  { to: '/products', icon: 'fa-boxes-stacked', label: 'Products' },
  { to: '/categories', icon: 'fa-tags', label: 'Categories' },
  { to: '/suppliers', icon: 'fa-truck', label: 'Suppliers' },
  { to: '/inventory', icon: 'fa-arrows-right-left', label: 'Inventory' },
  { to: '/sales', icon: 'fa-receipt', label: 'Sales' },
  { to: '/reports', icon: 'fa-file-alt', label: 'Reports' },
  { to: '/users', icon: 'fa-users', label: 'Users' },
  { to: '/settings', icon: 'fa-cog', label: 'Settings' }
];

function Sidebar({ open, onLinkClick }) {
  return (
    <nav className={`sidebar${open ? ' show' : ''}`}>
      <div className="px-3 mb-3 text-center">
        <img src="/assets/img/logo.svg" alt="logo" style={{ height: 42 }} />
      </div>
      <ul className="nav flex-column">
        {navLinks.map(link => (
          <li key={link.to} className="nav-item">
            <NavLink
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={onLinkClick}
            >
              <i className={`fa ${link.icon} me-2`} />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer px-3 small text-muted">v1.0 • © Company</div>
    </nav>
  );
}

export default Sidebar;
