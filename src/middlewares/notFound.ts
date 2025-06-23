// Handles all requests to routes that don’t exist ( /not-a-route), and returns a clean JSON response.

import { Request, Response, NextFunction } from "express";

const NotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: `404 - ${req.path} Not Found`, data: [] });
};

export default NotFoundHandler;
