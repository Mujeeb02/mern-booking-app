import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../../shared/types";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

// Define multer storage configuration (in-memory storage in this case)
const storage = multer.memoryStorage();

// Initialize multer instance with configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// POST route for handling file upload
router.post("/", [body("name").notEmpty().withMessage('Name is required...'),
    body("city").notEmpty().withMessage('city is required..'),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
], verifyToken, upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        // Access uploaded files from request object
        const imageFiles = req.files as Express.Multer.File[];

        const newHotel: HotelType = req.body;
        //upload the image to the cloudinary
        //if upload was succesfull , add the urls  to the new hotel
        // save the new hotel in our database 
        // return the status of 201
        
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        return res.status(201).json({ data: hotel });


    } catch (error) {
        // Handle any errors that occurred during file upload or processing
        console.error("Error uploading files:", error);
        res.status(500).send("Error uploading files.");
    }
});

export default router;
