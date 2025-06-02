import { OAuth2Client } from 'google-auth-library';
import jwt from "jsonwebtoken"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];



  try {
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // req.user = ticket.getPayload();
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid',error });
  }
};
