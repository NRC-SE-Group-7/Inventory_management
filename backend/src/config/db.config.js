import {Pool} from 'pg';

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'inventory_management',
    password: 'admin',
    port: 5432,
});

export default pool;