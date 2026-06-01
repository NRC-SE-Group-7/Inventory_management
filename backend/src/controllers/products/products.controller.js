import pool from "../../config/db.config.js";

export const createProduct = async(req, res, next) => {
    const data = req.body;
    try {
    //check duplicate products
    const { name } = data;
    const {rows, rowCount} = await pool.query('SELECT * FROM products WHERE name = $1', [name]);
    if(rowCount > 0) {
        return res.status(400).json({ message: 'Product with the same name already exists' });
    }
    
    }
    catch (error) {
        next(error);
    }       
}
