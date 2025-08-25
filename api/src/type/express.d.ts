import "express"; 

declare global {
  namespace Express {
    interface Request {
      verifiedData?: any;
    }
  }
}

