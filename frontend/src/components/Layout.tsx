import type { ReactNode } from 'react';
import Sidebar from './Sidebar.tsx';
import Topbar from './Topbar.tsx';

type LayoutProps = {
  children: ReactNode;
  title: string;
  actionLabel?: string;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
};

function Layout({ children, title, actionLabel, onToggleSidebar, sidebarOpen, onCloseSidebar }: LayoutProps) {
  return (
    <div className="d-flex">
      <Sidebar open={sidebarOpen} onLinkClick={onCloseSidebar} />
      <div className="content flex-fill">
        <Topbar title={title} actionLabel={actionLabel} onToggleSidebar={onToggleSidebar} />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
