export {};

declare global {
  namespace Express {
    interface Request {
      userSession?: {
        user: {
          id: string;
          email: string;
          role: string;
        };
      };
    }
  }
}
