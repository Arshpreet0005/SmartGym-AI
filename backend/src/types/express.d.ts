import { UserRole } from '../models/shared/Enums';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        isAdmin?: boolean;
      };
      file?: any;
    }
  }
}

export {};