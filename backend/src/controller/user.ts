import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const register = async (req: Request, res: Response) => {
    try {
        // Validate request body
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password || password.length<6) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create new user with hashed password
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
          });
        // Respond with success message and token
        return res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default register;
