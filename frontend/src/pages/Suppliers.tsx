import { useState } from 'react';
import { SAMPLE } from '../data/sampleData.js';

function Suppliers() {
  const [query, setQuery] = useState('');
  const filteredSuppliers = SAMPLE.suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(query.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="card-modern p-3 mb-3">
        <div className="d-flex mb-3">
          <input
            className="form-control me-2"
            placeholder="Search suppliers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-primary btn-sm">Add Supplier</button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Supplier</th>
                <th>Contact</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.products}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Suppliers;
