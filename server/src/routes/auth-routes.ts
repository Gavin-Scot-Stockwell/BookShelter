import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/*
 * login
 *
 * Authenticate a user.
 * 
 * The user must exist in the database, including a stored hashed password.
 * If the database password matches the password in the request header (added by the 
 * middlware), then return a JWT token.
 * 
 */
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  /* Find the user in the database by username to retrieve their encrypted 
    stored password */
  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  /* Use bcrypt to compare the password stored in the incoming request object 
    to the hashed password stored in the database */
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Read the JWT secret key from environment variable
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a temporary JWT token for the authenticated, valid for 1 hour
  const token = jwt.sign(
    { username: user.username, id: user.id }, secretKey, { expiresIn: '1h' }
  );
  
  // Send the token back to the client in as a JSON response
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
