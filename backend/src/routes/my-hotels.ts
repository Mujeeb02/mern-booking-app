import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../shared/types";
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
        console.log("inside hotel added ")
        const imageUrls = await uploadImages(imageFiles)
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

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const response = await Hotel.find({ userId: req.userId });
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "error in fetching hotels" });
    }
})

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        })
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching hotel" })
    }
})

router.put(
    "/:hotelId",
    verifyToken,
    upload.array("imageFiles"),
    async (req: Request, res: Response) => {
        try {
            const updatedHotel: HotelType = req.body;
            updatedHotel.lastUpdated = new Date();

            const hotel = await Hotel.findOneAndUpdate(
                {
                    _id: req.params.hotelId,
                    userId: req.userId,
                },
                updatedHotel,
                { new: true }
            );

            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            const files = req.files as Express.Multer.File[];
            const updatedImageUrls = await uploadImages(files);

            hotel.imageUrls = [
                ...updatedImageUrls,
                ...(updatedHotel.imageUrls || []),
            ];

            await hotel.save();
            res.status(201).json(hotel);
        } catch (error) {
            res.status(500).json({ message: "Something went throw" });
        }
    }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;
