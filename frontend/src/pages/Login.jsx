import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-sm login-card w-100" style={{ maxWidth: 420 }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <img src="/assets/img/logo.svg" alt="Company" className="mb-3" style={{ height: 56 }} />
            <h5 className="mb-0">Inventory Management</h5>
            <small className="text-muted">Sign in to continue</small>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email or Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                className="form-control"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="••••••"
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberCheck" />
                <label className="form-check-label" htmlFor="rememberCheck">Remember me</label>
              </div>
              <a href="#" className="small">Forgot password?</a>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
