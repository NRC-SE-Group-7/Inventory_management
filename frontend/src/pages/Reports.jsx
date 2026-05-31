import { useEffect, useRef } from 'react';
//import Chart from 'chart.js/auto';
import { SAMPLE } from '../data/sampleData.js';

function Reports() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart;
    if (chartRef.current) {
      chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Sales',
              data: SAMPLE.salesByMonth.slice(0, 7),
              borderColor: '#0d6efd',
              backgroundColor: 'rgba(13,110,253,0.08)',
              tension: 0.3
            }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    return () => {
      chart?.destroy();
    };
  }, []);

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
          <canvas ref={chartRef} />
        </div>
      </div>
    </>
  );
}

export default Reports;
