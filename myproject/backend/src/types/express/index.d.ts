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