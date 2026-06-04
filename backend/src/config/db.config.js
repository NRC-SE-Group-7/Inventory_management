import {Pool} from "pg";

const production = process.env.NODE_ENV === "production";

 
const pool = production ? new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false
  }
}) : new Pool({
  user: "admin",
  host: "localhost",
  database: "inventory",
  password: "admin",
  port: 5432,
});

export default pool;
