import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myhotelRoutes from "./routes/my-hotels"
import hotelRoutes from "./routes/hotels"
import cookieParser from "cookie-parser";
import path from 'path';
import { v2 as cloudinary } from "cloudinary";
import { get } from 'http';
// Load environment variables from the .env file or .env.e2e file
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || '.env' });

console.log(process.env.CLOUDINARY_SECRET_KEY)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_CONNECTION_STRING) {
    console.error("MongoDB connection string is missing in environment variables.");
    process.exit(1);
}

mongoose.connect(MONGODB_CONNECTION_STRING, {})
    .then(() => {
        console.log("MongoDB connected successfully.", MONGODB_CONNECTION_STRING);
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "server started" });
});
//
app.use(express.static( path.join(__dirname,"../../frontend/dist")));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels",myhotelRoutes);
app.use("/api/hotels",hotelRoutes);

app.get("*",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
