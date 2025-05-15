import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import type { Role } from "../types";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

type userData = { email: string, role: Role };

export const getJwt = (data: userData): string => {
  const privateKey: string = process.env.JWT_PRIVATE_KEY || "secret";
  const token = jwt.sign(data, privateKey, {
    expiresIn: "1h",
  });
  return token;
};

export const validateToken =  (token: string)  => {
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY || "secret") ;
  return decoded
};