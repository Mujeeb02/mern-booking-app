import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from "../src/routes/users"
import authRoutes from "../src/routes/auth"

dotenv.config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
if (!MONGODB_CONNECTION_STRING) {
    console.error("MongoDB connection string is missing in the environment variables.");
    process.exit(1);
}

mongoose.connect(MONGODB_CONNECTION_STRING, {
}).then(() => {
    console.log("MongoDB connected successfully.");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "server started" });
});

app.use("/api/auth",authRoutes)
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
