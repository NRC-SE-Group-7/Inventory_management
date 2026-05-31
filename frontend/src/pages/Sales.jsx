import { useState } from 'react';
import { SAMPLE } from '../data/sampleData.js';

function Sales() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const filteredSales = SAMPLE.sales.filter(sale => {
    const matchesQuery = sale.id.toLowerCase().includes(query.toLowerCase()) ||
      sale.customer.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'All' || sale.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card-modern p-3">
            <small className="text-muted">Today</small>
            <div className="h5">$1,230</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-modern p-3">
            <small className="text-muted">This Month</small>
            <div className="h5">$23,400</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-modern p-3">
            <small className="text-muted">This Year</small>
            <div className="h5">$198,230</div>
          </div>
        </div>
      </div>

      <div className="card-modern p-3 mt-3">
        <div className="d-flex mb-3 flex-column flex-md-row gap-2">
          <input
            className="form-control me-2"
            placeholder="Search sales..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select className="form-select me-2" style={{ width: 160 }} value={status} onChange={e => setStatus(e.target.value)}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>
          <button className="btn btn-outline-secondary">Filter</button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.total}</td>
                  <td><span className={`badge bg-${sale.status === 'Paid' ? 'success' : 'warning'}`}>{sale.status}</span></td>
                  <td>{sale.date}</td>
                  <td><button className="btn btn-sm btn-outline-secondary">Receipt</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Sales;
