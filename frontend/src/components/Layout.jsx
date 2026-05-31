import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

function Layout({ children, title, onToggleSidebar, sidebarOpen, onCloseSidebar }) {
  return (
    <div className="d-flex">
      <Sidebar open={sidebarOpen} onLinkClick={onCloseSidebar} />
      <div className="content flex-fill">
        <Topbar title={title} onToggleSidebar={onToggleSidebar} />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
