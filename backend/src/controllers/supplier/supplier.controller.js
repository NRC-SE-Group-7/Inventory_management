import pool from '../../config/db.config.js';
import { createSupplier as createSupplierService } from '../../services/supplier.service.js';

export const createSupplier = async (req, res, next) => {
  const { name, email } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ message: 'name, and email are required' });
  }

  try {
    //create supplier
    const { success, data: newSupplier } = await createSupplierService({ name, email });
    if(success){
      res.status(201).json({ success: true, data: newSupplier });
    }
    return res.status(500).json({ message: 'Failed to create supplier' });
  } catch (error) {
    next(error);
  }
};

export const getSuppliers = async (req, res, next) => {
  //const company_id = 1;

  try {
    const { rows: suppliers, rowCount } = await pool.query('SELECT * FROM suppliers');
    if(rowCount === 0){
      return res.status(203).json({message:"No suppliers found"})
    }
    res.status(200).json({ success: true, data: suppliers });
  } catch (error) {
    next(error);
  }
};
