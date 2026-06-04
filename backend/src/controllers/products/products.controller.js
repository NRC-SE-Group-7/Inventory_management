import pool from "../../config/db.config.js";
import { checkSupplier } from "../../services/supplier.service.js";

export const createProduct = async(req, res, next) => {
    console.log(req.body);
    const { name, qty, supplier, price, category} = req.body;

    //all fields are required
    if (!name || !qty || !price || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    //check supplier
    const existingSupplier = await checkSupplier(supplier);
    if(!existingSupplier.exists){
        return res.status(400).json({success:false, message:"Provided supplier does not exist"});
    }

    const {name: supplierName} = existingSupplier.data;

    try {
    //check duplicate products
    const {rows, rowCount} = await pool.query('SELECT * FROM products WHERE name = $1', [name]);
    if(rowCount > 0) {
        return res.status(400).json({ message: 'Product with the same name already exists' });
    }

    //saving product
    const {rows: newProduct, rowCount: newProductCount} = await pool.query('INSERT INTO products (name, quantity, selling_price, description, supplier) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, parseInt(qty), parseInt(price), category, supplierName]);
    if(newProductCount !== 1) {
        return res.status(500).json({ message: 'Failed to create product' });
    }
    res.status(201).json({ message: 'Product created successfully', data: newProduct[0] });
    }
    catch (error) {
        next(error);
    }       
}

export const getProducts = async(req, res, next) => {
    //const company_id = 1; //replace with user company id from auth
    try {
        //querying database 
        const {rows: products, rowCount} = await pool.query('SELECT * FROM products');
        if(rowCount === 0) {
            return res.status(203).json({ success:false, message: 'No products found' });
        }
        res.status(200).json({ success:true, data:products });
    }
    catch (error) {
        next(error);
    }
}

export const deleteProduct = async(req, res, next) => {
    const { id } = req.params;
    try {
        //deleting product
        const {rowCount} = await pool.query('DELETE FROM products WHERE id=$1', [id]);
        if(rowCount === 0) {
            return res.status(404).json({ success:false, message: 'Product not found' });
        }
        res.status(203).json({ success:true, message: 'Product deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}