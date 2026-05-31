import { useState } from 'react';
import { SAMPLE } from '../data/sampleData.js';

function Categories() {
  const [query, setQuery] = useState('');

  const filteredCategories = SAMPLE.categories.filter(category =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="card-modern p-3 mb-3">
        <div className="d-flex mb-3">
          <input
            className="form-control me-2"
            placeholder="Search categories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-primary btn-sm">Add Category</button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.products}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
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

export default Categories;
