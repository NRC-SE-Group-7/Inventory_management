import pool from '../../config/db.config.js';


export const stockIn = async(req, res, next) => {
    const {name, quantity} = req.body;
    console.log(name, quantity);

    //validate input
    if(!name || !quantity){
        return res.status(400).json({message: "Product and quantity are required"});
    }

    const client = await pool.connect();
    await client.query('BEGIN');
    console.log("checkpoint")

    try{
        //check if product exists
        const {rows: productRows, rowCount: productRowcount} = await client.query('SELECT id, quantity FROM products WHERE name = $1', [name]);
            
        if(productRowcount !== 1){
            client.query('ROLLBACK');
            return res.status(404).json({message: "Product not found"});
        }

        const product  = productRows[0];

        const currentQuantity = product.quantity;
        const newQuantity = currentQuantity + quantity;
        console.log("checkpoint");
        //update product quantity
        const {rowCount} = await client.query('UPDATE products SET quantity = $1 WHERE id = $2', [newQuantity, product.id]);
        if(rowCount !== 1){
            client.query('ROLLBACK');
            return res.status(500).json({message: "Failed to update product quantity"});
        }
        console.log("checkpoint")
        await client.query('COMMIT');
        res.status(200).json({message: "Stock in successful", productId: product.id, newQuantity});

    //catch and rollback transaction in case of error
    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
}

export const getInventorySummary = async (req, res, next) => {
  const company_id = 1;

  try {
    const { rows: products } = await pool.query(
      'SELECT id, name, quantity, selling_price FROM products WHERE company_id = $1',
      [company_id]
    );

    const totalQuantity = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0);
    const totalValue = products.reduce(
      (sum, product) => sum + Number(product.quantity || 0) * Number(product.selling_price || 0),
      0
    );
    const lowStock = products.filter(product => Number(product.quantity || 0) <= 5);

    res.status(200).json({
      success: true,
      data: {
        products,
        totalQuantity,
        totalProducts: products.length,
        totalValue,
        lowStock
      }
    });
  } catch (error) {
    next(error);
  }
};

export const stockOut = async(req, res, next) => {
    const {name, quantity} = req.body;

    //validate input
    if(!name || !quantity){
        return res.status(400).json({message: "Product and quantity are required"});
    }

    const client = await pool.connect();
    await client.query('BEGIN');

    try{
        //check if product exists
        const {rows: productRows, rowCount: productRowcount} = await client.query('SELECT id, quantity FROM products WHERE name = $1', [name]);

        if(productRowcount !== 1){
            client.query('ROLLBACK');
            return res.status(404).json({message: "Product not found"});
        }
        const product  = productRows[0];

        const currentQuantity = product.quantity;
        if(currentQuantity < quantity){
            client.query('ROLLBACK');
            return res.status(400).json({message: "Insufficient stock"});
        }

        const newQuantity = currentQuantity - quantity;

        //update product quantity
        const {rowCount} = await client.query('UPDATE products SET quantity = $1 WHERE id = $2', [newQuantity, product.id]);
        if(rowCount !== 1){
            client.query('ROLLBACK');
            return res.status(500).json({message: "Failed to update product quantity"});
        }
        console.log("checkpoint");
        await client.query('COMMIT');
        res.status(200).json({message: "Stock out successful", productId: product.id, newQuantity});

    //catch and rollback transaction in case of error
    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
}