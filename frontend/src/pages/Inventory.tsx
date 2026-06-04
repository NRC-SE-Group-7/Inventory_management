import { useState, useEffect } from 'react';
import { SAMPLE } from '../data/sampleData.js';
import LoadingSpinner from '../components/spinner.tsx';

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
let API_URL = '';

if (NODE_ENV === 'development') {
  API_URL = 'http://127.0.0.1:3000';
} else {
  API_URL = import.meta.env.VITE_DEV_API_URL;
}

function Inventory() {
  const [form, setForm] = useState({ product: '', quantity: '' });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    products: [] as any[],
    totalQuantity: 0,
    lowStock: [] as any[],
    totalProducts: 0,
    totalValue: 0
  });

  useEffect(() => {
    const fetchInventorySummary = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/inventory/`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error(`Failed to load inventory summary (${response.status})`);
        }

        const data = await response.json();
        if (data.success && data.data) {
          setSummary(data.data);
        } else {
          setSummary({
            products: SAMPLE.products,
            totalQuantity: SAMPLE.products.reduce((sum, item) => sum + Number(item.qty || 0), 0),
            lowStock: SAMPLE.products.filter(item => Number(item.qty) <= 5),
            totalProducts: SAMPLE.products.length,
            totalValue: 0
          });
        }
      } catch (error) {
        console.error('Error fetching inventory summary:', error);
        setSummary({
          products: SAMPLE.products,
          totalQuantity: SAMPLE.products.reduce((sum, item) => sum + Number(item.qty || 0), 0),
          lowStock: SAMPLE.products.filter(item => Number(item.qty) <= 5),
          totalProducts: SAMPLE.products.length,
          totalValue: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventorySummary();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submitStock = async (stockIn: boolean) => {
    const { product, quantity } = form;
    if (!product.trim() || !quantity.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const formData = {
      name: product,
      quantity: parseInt(quantity, 10)
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/inventory/${stockIn ? 'in' : 'out'}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }

      setForm({ product: '', quantity: '' });

      const summaryResponse = await fetch(`${API_URL}/inventory/`, {
        method: 'GET'
      });
      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json();
        if (summaryData.success && summaryData.data) {
          setSummary(summaryData.data);
        }
      }
    } catch (error) {
      console.error('Error submitting stock update:', error);
      alert('Unable to update stock.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card-modern p-3">
                <small className="text-muted">Total Products</small>
                <div className="h4">{summary.totalProducts}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-modern p-3">
                <small className="text-muted">Total Stock Qty</small>
                <div className="h4">{summary.totalQuantity}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-modern p-3">
                <small className="text-muted">Low Stock Products</small>
                <div className="h4">{summary.lowStock.length}</div>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-lg-6">
              <div className="card-modern p-3">
                <h6>Stock Adjustment</h6>
                <div className="row g-2">
                  <div className="col-12">
                    <input
                      name="product"
                      className="form-control"
                      placeholder="Product name"
                      value={form.product}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      name="quantity"
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      value={form.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 text-end">
                    <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => submitStock(true)}>
                      Add Stock
                    </button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => submitStock(false)}>
                      Remove Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card-modern p-3">
                <h6>Low Stock Alerts</h6>
                <ul className="list-group list-group-flush">
                  {(summary.lowStock.length ? summary.lowStock : SAMPLE.products.filter(item => Number(item.qty) <= 5)).map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {item.name}
                      <span className="badge rounded-pill bg-danger">{item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="card-modern p-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Current Inventory</h6>
              <small className="text-muted">Updated from system</small>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(summary.products.length ? summary.products : SAMPLE.products).map(product => (
                    <tr key={product.id || product.name}>
                      <td>{product.name}</td>
                      <td>{product.quantity ?? product.qty}</td>
                      <td>{(product.selling_price ?? product.price) || '-'}</td>
                      <td>{(Number(product.quantity ?? product.qty) <= 5) ? 'Low stock' : 'In stock'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Inventory;
