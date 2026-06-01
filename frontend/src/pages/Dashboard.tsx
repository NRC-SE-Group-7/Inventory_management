import { SAMPLE } from '../data/sampleData.ts';


function DetailCard({ title, description}) {
  return (
    <div className="card-modern p-2 rounded-md shadow-md bg-gray-200 text-black">
      <h5 className='text-xl'>{title}</h5>
      <p className='text-muted'>{description}</p>
    </div>
  )
}

function Dashboard() {
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxSales = Math.max(...SAMPLE.salesByMonth);
  const categoryLabels = ['Electronics', 'Stationery', 'Accessories', 'Food', 'Tools', 'Other'];
  const maxInventory = Math.max(...SAMPLE.inventoryByCategory);

  return (
    <>
      <div className="row g-3">
        <div className="col-md-3">
          <DetailCard
            title="Total Products"
            description={SAMPLE.overview.products.toString()}
          />
        </div>
        <div className="col-md-3">
          <DetailCard
            title="Total Categories"
            description={SAMPLE.overview.categories.toString()}
          />
        </div>
        <div className="col-md-3">
          <DetailCard
            title="Total Suppliers"
            description={SAMPLE.overview.suppliers.toString()}
          />
        </div>
        <div className="col-md-3">
          <DetailCard
            title="Total Sales"
            description={SAMPLE.overview.sales.toString()}
          />
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
              <div className="d-flex align-items-end gap-2 h-100 p-5">
                {SAMPLE.salesByMonth.map((sales, index) => (
                  <div key={monthLabels[index]} className="d-flex flex-column align-items-center flex-fill h-100">
                    <div
                      className="bg-primary rounded-top w-100"
                      style={{ height: `${Math.max((sales / maxSales) * 100, 8)}%`, minHeight: 12 }}
                      title={`${monthLabels[index]}: ${sales}`}
                    />
                    <small className="text-muted mt-2">{monthLabels[index]}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card-modern p-3">
            <h6 className="mb-3">Inventory by Category</h6>
            <div className="chart-wrap" style={{ position: 'relative' }}>
              <div className="d-flex flex-column gap-2 pt-2">
                {SAMPLE.inventoryByCategory.map((count, index) => (
                  <div key={categoryLabels[index]}>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>{categoryLabels[index]}</span>
                      <span className="text-muted">{count}</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div
                        className="progress-bar"
                        style={{ width: `${Math.max((count / maxInventory) * 100, 6)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
