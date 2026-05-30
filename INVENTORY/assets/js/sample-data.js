// Sample dummy data for charts and overview
const SAMPLE = {
  overview: { products: 128, categories: 12, suppliers: 9, sales: 342 },
  lowStock: [
    {id:'P-102', name:'AA Batteries', qty:3},
    {id:'P-58', name:'USB C Cable', qty:2},
    {id:'P-201', name:'Paper A4', qty:5}
  ],
  salesByMonth: [1200, 1800, 1400, 2000, 2200, 2100, 1900, 2300, 2400, 2600, 2800, 3200],
  inventoryByCategory: [34, 16, 21, 12, 7, 8],
  recentTransactions: [
    {id:'S-1001', product:'AA Batteries', qty:5, total:'$25.00', date:'2026-05-28'},
    {id:'S-1002', product:'USB C Cable', qty:2, total:'$18.00', date:'2026-05-28'},
    {id:'S-1003', product:'Paper A4', qty:10, total:'$45.00', date:'2026-05-27'}
  ]
};
