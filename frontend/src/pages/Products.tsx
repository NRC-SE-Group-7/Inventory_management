import { useState } from 'react';
import { SAMPLE } from '../data/sampleData.ts';
import LoadingSpinner from '../components/spinner.tsx';

const API_URL = import.meta.env.VITE_API_URL;

function Products() {
  const [products, setProducts] = useState(SAMPLE.products);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', qty: '', price: '', supplier: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const newForm = {
      ...form,
      [name]: value
    }
    setForm(newForm);
  }
  const handleSubmit = async() => {
    setModalOpen(false);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/products/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const newProduct = await response.json();
      setProducts(prev => [...prev, newProduct]);
      console.log(products);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <> 
       { loading ? ( <LoadingSpinner /> ): (
          <div>
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
                  name='name'
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  name='category'
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Quantity</label>
                <input
                  name='qty'
                  type="number"
                  className="form-control"
                  value={form.qty}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Price</label>
                <input
                  name='price'
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Supplier</label>
                <input
                  name='supplier'
                  className="form-control"
                  value={form.supplier}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-3 text-end">
              <button className="btn btn-secondary btn-sm me-2" type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      )
      }
    </>
  );
}

export default Products;
