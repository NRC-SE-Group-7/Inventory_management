import jwt from "jsonwebtoken";
import hash from "../../utils/hash.js";
import  pool  from "../../config/db.config.js";
import bcrypt from "bcrypt";

export const register = async(req, res, next) => {
    const { full_name, password, company_id, email, role } = req.body;
    //verifying input fields
    if(!full_name || !password || !company_id || !email || !role) {
        return res.status(400).json({ message: "All fields are required"});
    }
    try{
        //hashing password
        const password_hash = await hash(password);
        
        //inserting user into database
        const { rows, rowCount } = await pool.query(
            "INSERT INTO users (full_name, password_hash, company_id, email, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role",
            [full_name, password_hash, company_id, email, role]
        );
        if(rowCount !== 1) {
            return res.status(500).json({ message: "User registration failed"});
        }
        const user = rows[0];
        res.status(201).json({ data: user });
    }
    catch(error){
        next(error);
    }
}
    

export const login = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        //get user from database if exists
        const {rows, rowCount} = await pool.query(`SELECT password_hash, full_name, role FROM users WHERE email='${email}'`);
        if (rowCount !== 1) {
            return res.status(401).json({ message: "Invalid username or password"});
        }
        const user = rows[0];
        //compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password"});
        }

        //generate JWT token
        const refresh = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const access = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "15m" });
        
        //returning tokens and user data
        const {full_name, role} = rows[0];
        const userData = {full_name, role}
        res.json({ success:true, data:userData, tokens: {access, refresh } }).status(200);
    }
    catch (error) {
        console.error("Login error:", error);
        next(error);
    }
}
