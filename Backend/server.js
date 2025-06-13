import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import notesRoutes from "./Routes/notesRoute.js";
import { connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config()

const app=express();
const PORT=process.env.PORT||5001;
const __dirname=path.resolve();
if(process.env.NODE_ENV!=="production"){
    app.use(
        cors({
            origin:"http://localhost:5173",
        })
    )
}

app.use(express.json());

app.use(cors());

app.use(rateLimiter);

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../Frontend","dist","index.html"));
    })
}
connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
})



//h3kct6vw3SdYrIqI
//mongodb+srv://ayancoe877:h3kct6vw3SdYrIqI@cluster0.vwpzum5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0