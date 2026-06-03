import { useState } from 'react';
import { SAMPLE } from '../data/sampleData.js';
import  LoadingSpinner  from '../components/spinner.tsx';

//setting up API_URL
const isDevelopment = import.meta.env.VITE_NODE_ENV === "development";
let API_URL = '';
if (isDevelopment) {
  API_URL = "http://127.0.0.1:3000"
} else {
  API_URL = import.meta.env.VITE_DEV_API_URL;
}
console.log("API_URL:", API_URL)


function Inventory() {
  const [form, setForm] = useState({product:'', quantity:''}); // 'in' or 'out'
  const [stockIn, setStockIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value
    }
    setForm(newForm); 
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {product, quantity} = form;
    console.log(product, quantity)
    if (!product || !quantity) {
      alert("Please fill in all fields");
      return;
    }
    const formData = {
      name: product,
      quantity: parseInt(quantity)
    }
    const URL = stockIn ? `${API_URL}/inventory/in/` : `${API_URL}/inventory/out/`;
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  }

  const toggleStockOut = () => {
    setStockIn(!stockIn);
  }

  return (
    <>
    { loading ? ( <LoadingSpinner /> ) : (
      <div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card-modern p-3">
            <h6>Stock In</h6>
            <form className="row g-2" onSubmit={handleSubmit}>
              <div className="col-12">
                <input
                  name="product"
                  className="form-control"
                  placeholder="Product"
                  value={form.product}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  name="quantity"
                  placeholder="Qty"
                  type="number"
                  value={form.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  name="reference"
                  placeholder="Reference"
                  value={"Reference input"}
                  //onChange={}
                />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-primary btn-sm" type="submit">Add Stock</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-modern p-3">
            <h6>Stock Out</h6>
            <form className="row g-2" onSubmit={handleSubmit}>
              <div className="col-12">
                <input className="form-control" placeholder="Product" name="product" value={form.product} onChange={handleChange} />
              </div>
              <div className="col-6">
                <input className="form-control" placeholder="Qty" type="number" name="quantity" value={form.quantity} onChange={handleChange} />
              </div>
              <div className="col-6">
                <input className="form-control" placeholder="Reference" name="reference" value="Reference field" onChange={handleChange} />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-danger btn-sm" type="submit" onClick={toggleStockOut}
                >Remove Stock</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="card-modern p-3 mt-3">
        <div className="d-flex justify-content-between mb-2">
          <h6 className="mb-0">Inventory Movement</h6>
          <div>
            <input className="form-control form-control-sm d-inline-block me-2" style={{ width: 180 }} placeholder="Filter product" />
            <input className="form-control form-control-sm d-inline-block" style={{ width: 180 }} placeholder="Date range" />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Ref</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE.inventoryMovements.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.product}</td>
                  <td>{item.qty}</td>
                  <td>{item.ref}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    ) }
    </>
  );
}

export default Inventory;
