import { useMemo, useState } from 'react';
import { SAMPLE } from '../data/sampleData.ts';

function Products() {
  const [products, setProducts] = useState(SAMPLE.products);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', qty: '', price: '', supplier: '' });

  const filteredProducts = useMemo(() => {
    const term = query.toLowerCase();
    return products.filter(
      product =>
        product.id.toLowerCase().includes(term) ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.supplier.toLowerCase().includes(term)
    );
  }, [products, query]);

  const saveProduct = () => {
    const nextId = `P-${Date.now().toString().slice(-4)}`;
    setProducts(prev => [
      ...prev,
      {
        id: nextId,
        name: form.name || 'New product',
        category: form.category || 'Uncategorized',
        qty: Number(form.qty) || 0,
        price: form.price || '$0.00',
        supplier: form.supplier || 'Unknown'
      }
    ]);
    setForm({ name: '', category: '', qty: '', price: '', supplier: '' });
    setModalOpen(false);
  };

  return (
    <>
      <div className="card-modern p-3 mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex mb-3 w-100">
            <input
              className="form-control me-2"
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
          <button className="btn btn-primary btn-sm" type="button" onClick={() => setModalOpen(true)}>
            <i className="fa fa-plus me-1" /> Add Product
          </button>
        </div>
      </div>
      <div className="card-modern p-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.qty}</td>
                  <td>{product.price}</td>
                  <td>{product.supplier}</td>
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

      {modalOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', zIndex: 1050 }}>
          <div className="card-modern p-3 bg-white shadow" style={{ width: 'min(560px, 100%)' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Add Product</h5>
              <button className="btn-close" type="button" onClick={() => setModalOpen(false)} />
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  className="form-control"
                  value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.qty}
                  onChange={e => setForm(prev => ({ ...prev, qty: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Price</label>
                <input
                  className="form-control"
                  value={form.price}
                  onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Supplier</label>
                <input
                  className="form-control"
                  value={form.supplier}
                  onChange={e => setForm(prev => ({ ...prev, supplier: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-3 text-end">
              <button className="btn btn-secondary btn-sm me-2" type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" type="button" onClick={saveProduct}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
