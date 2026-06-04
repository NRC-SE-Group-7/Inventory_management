import pool from '../config/db.config.js';

export const checkSupplier = async(name) => {
    try{
        const {rows:suppliers, rowCount} = await pool.query(`SELECT id, name FROM suppliers WHERE name=$1`, [name]);
        if(rowCount === 1){
            const {id, name} = suppliers[0];
            return {
                exists: true,
                data: {id, name}
            }
        }
        return {
            exists:false, 
            message:"supplier not found"
        }

    }
    catch(error){
        throw new Error(`Error: ${error}`)
    }
}

export const createSupplier = async (data) => {
    const {name, email} = data;
    
    if(!name || !email){
        throw new Error("Name and email are required");
    }

    try {
        //check if supplier already exists
        const supplier = await checkSupplier(name);
        if(supplier.exists){
            throw new Error("Supplier already exists")
        }

        const {rows: newSupplier, rowCount} = await pool.query('INSERT INTO suppliers (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        if(rowCount !== 1){
            throw new Error("Failed to create supplier");
        }

        return {success:true, data: newSupplier[0]};
    } catch (error) {
        throw error;
    }
}
