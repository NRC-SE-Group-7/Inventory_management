import { NavLink } from 'react-router-dom';
import "../tailwind.css";

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
    <nav className={`sidebar${open ? ' show' : ''} mr-3`}>
      <div className="px-3 mb-3 text-center bg-gray-200 shadow-md rounded-md shadow-md">
        <img src="/assets/img/logo.svg" alt="logo" style={{ height: 42 }} />
      </div>
      <ul className="nav flex-column rounded-md bg-gray-200 p-2 shadow-md h-full my-3 ">
        {navLinks.map(link => (
          <li key={link.to} className="nav-item text-md ">
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
