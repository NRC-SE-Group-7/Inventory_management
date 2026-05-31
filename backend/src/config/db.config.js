import Pool from "pg";

const pool = new Pool.Pool({
    user: "admin",
    host: "localhost",
    database: "inventory",
    password: "admin",
    port: 5432,
});

export default pool;