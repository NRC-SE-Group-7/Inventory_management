export const SAMPLE = {
  overview: { products: 128, categories: 12, suppliers: 9, sales: 342 },
  lowStock: [
    { id: 'P-102', name: 'AA Batteries', qty: 3 },
    { id: 'P-58', name: 'USB C Cable', qty: 2 },
    { id: 'P-201', name: 'Paper A4', qty: 5 }
  ],
  salesByMonth: [1200, 1800, 1400, 2000, 2200, 2100, 1900, 2300, 2400, 2600, 2800, 3200],
  inventoryByCategory: [34, 16, 21, 12, 7, 8],
  recentTransactions: [
    { id: 'S-1001', product: 'AA Batteries', qty: 5, total: '$25.00', date: '2026-05-28' },
    { id: 'S-1002', product: 'USB C Cable', qty: 2, total: '$18.00', date: '2026-05-28' },
    { id: 'S-1003', product: 'Paper A4', qty: 10, total: '$45.00', date: '2026-05-27' }
  ],
  products: [
    { id: 'P-1001', name: 'AA Batteries', category: 'Electronics', qty: 12, price: '$5.00', supplier: 'SupplyCo' },
    { id: 'P-1002', name: 'USB C Cable', category: 'Accessories', qty: 2, price: '$9.00', supplier: 'WireWorld' }
  ],
  categories: [
    { id: 1, name: 'Electronics', products: 34 },
    { id: 2, name: 'Stationery', products: 16 }
  ],
  suppliers: [
    { id: 1, name: 'SupplyCo', contact: 'John Doe', products: 12 },
    { id: 2, name: 'WireWorld', contact: 'Emma Smith', products: 9 }
  ],
  inventoryMovements: [
    { type: 'In', product: 'AA Batteries', qty: 20, ref: 'PO-200', date: '2026-05-26' },
    { type: 'Out', product: 'USB C Cable', qty: 2, ref: 'SO-302', date: '2026-05-28' }
  ],
  sales: [
    { id: 'S-1001', customer: 'Acme Inc', total: '$250', status: 'Paid', date: '2026-05-28' }
  ],
  users: [
    { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'Admin' },
    { id: 2, name: 'Staff Member', email: 'staff@company.com', role: 'Staff' }
  ]
};
