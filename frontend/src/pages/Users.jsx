import { SAMPLE } from '../data/sampleData.js';

function Users() {
  return (
    <div className="card-modern p-3">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE.users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge bg-${user.role === 'Admin' ? 'primary' : 'secondary'} badge-role`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
