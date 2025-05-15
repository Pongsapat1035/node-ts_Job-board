import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt";
import type { Role } from "../types";

type UserData = { email: string, role: Role }

declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}

const accessControl = {
  admin: ['*'],
  company: ['/company'],
  user: ['/user']
};

const checkRoleAccess = (role: keyof typeof accessControl, path: string): boolean => {
  const allowedPaths = accessControl[role] || [];
  return allowedPaths.includes('*') || allowedPaths.some(p => path.startsWith(p));
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken: string = req.headers.authorization?.split(" ")[1] || "";
    if (authToken === "") throw new Error("User not login");

    const decoded = validateToken(authToken) as UserData;
    
    const requestPath = req.path
    const role = decoded.role
   
    const checkRole = checkRoleAccess(role, requestPath)
    
    if (!checkRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    return next();
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      const errorMsg = error.message
      if (errorMsg === "don't have permission") {
        return res.status(403).json({ message: "You don't have permission to access" })
      }
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

  }
}


