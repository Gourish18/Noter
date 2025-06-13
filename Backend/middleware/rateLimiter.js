import ratelimit from "../config/upstash.js";
const rateLimiter=async(req,res,next)=>{
  try {
    const {success}=await ratelimit.limit("my-rate-limit");
    if(!success){
      return res.status(429).json({message:"Too many requests"});
    }
    next();
  } catch (error) {
    console.error("Error in rateLimiter middleware:", error);
    next(error);
  }
}
export default rateLimiter;