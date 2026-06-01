import { SAMPLE } from '../data/sampleData.ts';

function Reports() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const sales = SAMPLE.salesByMonth.slice(0, labels.length);
  const maxSales = Math.max(...sales);

  return (
    <>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card-modern p-3">
            <h6>Sales Report</h6>
            <p className="text-muted small">Monthly sales overview</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-modern p-3">
            <h6>Inventory Report</h6>
            <p className="text-muted small">Stock levels & movements</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-modern p-3">
            <h6>Supplier Report</h6>
            <p className="text-muted small">Supplier performance</p>
          </div>
        </div>
      </div>
      <div className="card-modern p-3 mt-3">
        <div className="chart-wrap" style={{ position: 'relative', minHeight: 240 }}>
          <div className="d-flex align-items-end gap-3 h-100 pt-3">
            {sales.map((value, index) => (
              <div key={labels[index]} className="d-flex flex-column align-items-center flex-fill h-100">
                <div
                  className="bg-primary rounded-top w-100"
                  style={{ height: `${Math.max((value / maxSales) * 100, 8)}%`, minHeight: 14 }}
                  title={`${labels[index]}: ${value}`}
                />
                <small className="text-muted mt-2">{labels[index]}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
