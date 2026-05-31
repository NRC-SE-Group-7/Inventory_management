function Topbar({ title, onToggleSidebar }) {
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
        <div className="me-3 text-end d-none d-md-block">
          <div className="small text-muted">Welcome back,</div>
          <div className="fw-bold">Admin</div>
        </div>
        <button className="btn btn-sm btn-outline-secondary d-none d-md-inline-block">
          <i className="fa fa-user" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
