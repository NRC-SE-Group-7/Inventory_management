<<<<<<< HEAD
import Pool from "pg";

const pool = new Pool.Pool({
    user: "admin",
    host: "localhost",
    database: "inventory",
    password: "admin",
=======
import {Pool} from 'pg';

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'inventory_management',
    password: 'admin',
>>>>>>> feature/ui
    port: 5432,
});

export default pool;