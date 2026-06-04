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

type SidebarProps = {
  open: boolean;
  onLinkClick: () => void;
};

function Sidebar({ open, onLinkClick }: SidebarProps) {
  return (
    <nav
      className={`sidebar bg-white border-end shadow-sm${open ? ' show' : ''}`}
      style={{ minWidth: 240, maxWidth: 260, minHeight: '100vh' }}
    >
      <div className="px-3 mb-4 pt-3 text-center border-bottom">
        <img src="/logo.jpeg" alt="Company logo" style={{ height: 42 }} />
      </div>
      <ul className="nav flex-column px-2">
        {navLinks.map(link => (
          <li key={link.to} className="nav-item mb-1">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none ${
                  isActive ? 'bg-primary text-white' : 'text-muted hover-bg-light'
                }`
              }
              onClick={onLinkClick}
            >
              <i className={`fa ${link.icon}`} />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer px-3 mt-auto small text-muted" style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
        v1.0 • Inventory System
      </div>
    </nav>
  );
}

export default Sidebar;
