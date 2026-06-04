type TopbarProps = {
  title: string;
  actionLabel?: string;
  onToggleSidebar: () => void;
};

function Topbar({ title, actionLabel, onToggleSidebar }: TopbarProps) {
  return (
    <header className="topbar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-lg-none me-2"
          onClick={onToggleSidebar}
        >
          <i className="fa fa-bars" />
        </button>
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="d-flex align-items-center">
        {actionLabel && (
          <button className="btn btn-sm btn-primary me-2" type="button">
            <i className="fa fa-plus me-1" />
            {actionLabel}
          </button>
        )}
        <div className="me-3 text-end d-none d-md-block">
          <div className="small text-muted font-semibold">Welcome back,</div>
          <div className="fw-bold">Admin</div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
