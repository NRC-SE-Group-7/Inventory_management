import { useState } from 'react';
import { SAMPLE } from '../data/sampleData.js';

function Inventory() {
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [reference, setReference] = useState('');

  return (
    <>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card-modern p-3">
            <h6>Stock In</h6>
            <form className="row g-2" onSubmit={e => e.preventDefault()}>
              <div className="col-12">
                <input
                  className="form-control"
                  placeholder="Product"
                  value={product}
                  onChange={e => setProduct(e.target.value)}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  placeholder="Qty"
                  type="number"
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  placeholder="Reference"
                  value={reference}
                  onChange={e => setReference(e.target.value)}
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
            <form className="row g-2" onSubmit={e => e.preventDefault()}>
              <div className="col-12">
                <input className="form-control" placeholder="Product" />
              </div>
              <div className="col-6">
                <input className="form-control" placeholder="Qty" type="number" />
              </div>
              <div className="col-6">
                <input className="form-control" placeholder="Reference" />
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-danger btn-sm" type="submit">Remove Stock</button>
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
    </>
  );
}

export default Inventory;
