import pool from './db';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  // Add other profile fields as necessary
}

declare global {
  namespace Express {
    interface Request {
      user?: UserProfile;
    }
  }
}

const API_URL = import.meta.env.VITE_API_URL;