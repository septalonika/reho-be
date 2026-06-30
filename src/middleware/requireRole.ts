import { Request, Response, NextFunction } from "express";

export const requireRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const role = req.userSession?.user?.role;
    if (!role || !roles.includes(role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
