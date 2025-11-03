import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET!);
    req.user = decoded;

    console.log('user---------->', req.user);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
