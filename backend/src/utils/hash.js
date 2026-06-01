import bcrypt from "bcrypt";

const hash = async (text) => {
    const saltRounds = 10;
    return await bcrypt.hash(text, saltRounds);
};

const JWT_key = "JWT_SECRET";
const secret = await hash(JWT_key);
console.log(secret);

export default hash;