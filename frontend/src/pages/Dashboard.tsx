import { useState, useEffect } from 'react';
import { SAMPLE } from '../data/sampleData.ts';
import LoadingSpinner from '../components/spinner.tsx';

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
let API_URL = '';

if (NODE_ENV === 'development') {
  API_URL = 'http://localhost:3000';
} else {
  API_URL = import.meta.env.VITE_API_URL;
}

type CardProps = {
  title: string;
  text: string | number;
};

function Card({ title, text }: CardProps) {
  return (
    <div className="col-md-3">
      <div className="card-modern bg-gray-200 p-3 rounded-md shadow-lg min-w-6">
        <small className="text-muted">{title}</small>
        <div className="h4">{text}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxSales = Math.max(...SAMPLE.salesByMonth);
  const categoryLabels = ['Electronics', 'Stationery', 'Accessories', 'Food', 'Tools', 'Other'];
  const maxInventory = Math.max(...SAMPLE.inventoryByCategory);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [productsResponse, suppliersResponse] = await Promise.all([
          fetch(`${API_URL}/products/`),
          fetch(`${API_URL}/suppliers/`)
        ]);

        const productsData = productsResponse.ok ? await productsResponse.json() : null;
        const suppliersData = suppliersResponse.ok ? await suppliersResponse.json() : null;

        setProducts(Array.isArray(productsData?.data) ? productsData.data : SAMPLE.products);
        setSuppliers(Array.isArray(suppliersData?.data) ? suppliersData.data : SAMPLE.suppliers);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setProducts(SAMPLE.products);
        setSuppliers(SAMPLE.suppliers);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalProducts = products.length || SAMPLE.overview.products;
  const totalSuppliers = suppliers.length || SAMPLE.overview.suppliers;
  const totalCategories = new Set(products.map(product => product.category)).size || SAMPLE.overview.categories;
  const totalStock = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0) || 0;
  const lowStockItems = products.filter(product => Number(product.quantity) <= 5).slice(0, 3);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="row g-3 ml-2">
            <Card title="Total Products" text={totalProducts} />
            <Card title="Total Catgories" text={totalCategories} />
            <Card title="Total Suppliers" text={totalSuppliers} />
            <Card title="Stock on Hand" text={totalStock} />
        </div>

          <div className="row mt-4 g-3">
            <div className="col-lg-8">
              <div className="card-modern p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Sales (Monthly)</h6>
                  <small className="text-muted">Last 12 months</small>
                </div>
                <div className="chart-wrap" style={{ position: 'relative' }}>
                  <div className="d-flex align-items-end gap-2 h-100 pt-3">
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
                  {(lowStockItems.length ? lowStockItems : SAMPLE.lowStock).map(item => (
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
      )}
    </>
  );
}

export default Dashboard;
