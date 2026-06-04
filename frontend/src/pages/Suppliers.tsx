import { useState, useEffect } from 'react';
import { SAMPLE } from '../data/sampleData.js';
import LoadingSpinner from '../components/spinner.tsx';

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
let API_URL = '';

if (NODE_ENV === 'development') {
  API_URL = 'http://localhost:3000';
} else {
  API_URL = import.meta.env.VITE_API_URL;
}

function Suppliers() {
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState(SAMPLE.suppliers);
  const [form, setForm] = useState({ company_id: '',name: '', email: '' });

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(query.toLowerCase()) ||
    supplier.email.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/suppliers/get/`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch suppliers (${response.status})`);
        }
        if(response.status === 203){
          return;
        }
        const responseJson = await response.json();
        if (responseJson.success && Array.isArray(responseJson.data)) {
          setSuppliers(responseJson.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async () => {
    if (!form.company_id.trim() || !form.name.trim() || !form.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/suppliers/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error adding supplier:', errorData);
        alert(errorData.message || 'Failed to add supplier');
        return;
      }

        const responseData = await response.json();
      const createdSupplier = responseData.data ?? responseData;
      setSuppliers(prev => [...prev, { ...createdSupplier, products: createdSupplier.products ?? 0 }]);
      setForm({ company_id: '', name: '', email: '' });
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Failed to add supplier');
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
          <div className="card-modern p-3 mb-3">
        <div className="d-flex mb-3">
          <input
            className="form-control me-2"
            placeholder="Search suppliers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-primary btn-sm" type="button" onClick={() => setModalOpen(true)}>
            Add Supplier
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.company_id || supplier.id}>
                  <td>{supplier.company_id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
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

      {modalOpen && (
        <div className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', zIndex: 1050 }}>
          <div className="card-modern p-3 bg-white shadow" style={{ width: 'min(560px, 100%)' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Add Supplier</h5>
              <button className="btn-close" type="button" onClick={() => setModalOpen(false)} />
            </div>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">Company ID</label>
                <input
                  name="company_id"
                  className="form-control"
                  value={form.company_id}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Supplier Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
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
        </>
      )}
    </>
  );
}

export default Suppliers;
