import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt";
import type { Role } from "../types";

type UserData = { email: string, role: Role, userId:number }

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
    if (authToken === "") return res.status(401).json({ message: "Missing or invalid JWT" })

    const decoded = validateToken(authToken) as UserData;
    
    const requestPath = req.path
    const role = decoded.role
    
    const checkRole = checkRoleAccess(role, requestPath)
    
    if (!checkRole) return res.status(403).json({ message: 'Forbidden' });
    
    req.user = decoded
    return next();

  } catch (error) {
    console.log('error from middleware : ', error)
    if (error instanceof Error) {
      const errorMsg = error.message
      return res.status(500).json({ message: errorMsg });
    }

  }
}


