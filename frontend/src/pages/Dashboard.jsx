import { useEffect, useRef } from 'react';
//import Chart from 'chart.js/auto';
import { SAMPLE } from '../data/sampleData.js';

function Dashboard() {
  const salesRef = useRef(null);
  const inventoryRef = useRef(null);

  useEffect(() => {
    let salesChart;
    let inventoryChart;

    if (salesRef.current) {
      salesChart = new Chart(salesRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Sales',
              data: SAMPLE.salesByMonth,
              borderColor: '#0d6efd',
              backgroundColor: 'rgba(13,110,253,0.08)',
              tension: 0.3
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    if (inventoryRef.current) {
      inventoryChart = new Chart(inventoryRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Electronics', 'Stationery', 'Accessories', 'Food', 'Tools', 'Other'],
          datasets: [
            {
              data: SAMPLE.inventoryByCategory,
              backgroundColor: ['#0d6efd', '#6c757d', '#198754', '#ffc107', '#dc3545', '#0dcaf0']
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    return () => {
      salesChart?.destroy();
      inventoryChart?.destroy();
    };
  }, []);

  return (
    <>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card-modern p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Total Products</small>
                <div className="h4 mb-0">{SAMPLE.overview.products}</div>
              </div>
              <div className="text-primary display-6"><i className="fa fa-boxes-stacked" /></div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-modern p-3">
            <small className="text-muted">Total Categories</small>
            <div className="h4">{SAMPLE.overview.categories}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-modern p-3">
            <small className="text-muted">Total Suppliers</small>
            <div className="h4">{SAMPLE.overview.suppliers}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-modern p-3">
            <small className="text-muted">Total Sales</small>
            <div className="h4">{SAMPLE.overview.sales}</div>
          </div>
        </div>
      </div>

      <div className="row mt-4 g-3">
        <div className="col-lg-8">
          <div className="card-modern p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Sales (Monthly)</h6>
              <small className="text-muted">Last 12 months</small>
            </div>
            <div className="chart-wrap" style={{ position: 'relative' }}>
              <canvas ref={salesRef} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card-modern p-3">
            <h6 className="mb-3">Inventory by Category</h6>
            <div className="chart-wrap" style={{ position: 'relative' }}>
              <canvas ref={inventoryRef} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="card-modern p-3">
            <h6>Low Stock Items</h6>
            <ul className="list-group list-group-flush">
              {SAMPLE.lowStock.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  {item.name}
                  <span className={item.qty <= 3 ? 'text-danger' : 'text-warning'}>{item.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card-modern p-3">
            <h6>Recent Transactions</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE.recentTransactions.map(tx => (
                    <tr key={tx.id}>
                      <td>{tx.id}</td>
                      <td>{tx.product}</td>
                      <td>{tx.qty}</td>
                      <td>{tx.total}</td>
                      <td>{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
