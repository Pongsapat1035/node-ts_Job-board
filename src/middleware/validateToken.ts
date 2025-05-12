import jwt from "jsonwebtoken"
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const validateToken =  (token: string)  => {
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || "secret") ;
  return decoded
};