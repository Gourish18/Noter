import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET ;
export function protect(req,res,next){
  const authHeader=req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message:"Unauthorized"});
  }
  const token=authHeader.split(" ")[1];
  try {
    console.log("Token received:", token);
    console.log("JWT_SECRET:", JWT_SECRET);

    const decoded=jwt.verify(token,JWT_SECRET);
    req.user=decoded;
    next();
  } catch (error) {
    console.log("Error in protect middleware",error);
    res.status(401).json({message:"Invalid or expired token"});
  }
}