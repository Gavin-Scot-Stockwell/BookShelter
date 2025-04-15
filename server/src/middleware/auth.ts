import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
  id: number;
}

interface CustomRequest extends Request {
  user?: JwtPayload;
}

// Middleware function to authenticate JWT token
export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    // Get the secret key from the environment variable
    const secretKey = process.env.JWT_SECRET_KEY || "";

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      // Attach the user information to the request object
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    // Send unauthorized status if no authorization header is present
    res.sendStatus(401);
  }
};
