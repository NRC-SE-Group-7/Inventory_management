function Settings() {
  return (
    <>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card-modern p-3">
            <h6>Company Info</h6>
            <form className="row g-2" onSubmit={e => e.preventDefault()}>
              <div className="col-12">
                <input className="form-control" placeholder="Company Name" />
              </div>
              <div className="col-12">
                <input className="form-control" placeholder="Address" />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-primary btn-sm" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-modern p-3">
            <h6>Logo Upload</h6>
            <div className="border p-3 text-center">
              <img src="/assets/img/logo.svg" alt="logo" style={{ height: 56 }} />
              <div className="mt-2">
                <button className="btn btn-outline-secondary btn-sm">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-modern p-3 mt-3">
        <h6>Change Password</h6>
        <form className="row g-2" onSubmit={e => e.preventDefault()}>
          <div className="col-12">
            <input className="form-control" placeholder="Current password" type="password" />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="New password" type="password" />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="Confirm" type="password" />
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-primary btn-sm" type="submit">Change</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Settings;
