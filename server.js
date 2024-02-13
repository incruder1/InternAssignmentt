import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import userModel from "./models/userModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
 
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url'

//configure env
dotenv.config();

//databse config
connectDB();

//esmoduleFix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Blinkit</h1>");
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
      // console.log(req.body.email);
      // console.log(result.url);
      const existingUser= await userModel.findOne({email:req.body.email});
      // console.log("-------------------"+existingUser+"-------------------");
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      existingUser.uploadedImages.push({
        imageUrl: result.url,     
        // uploadedBy: req.body.email,
      });

      const updateResult = await existingUser.save();
      if (!updateResult) {
                    // If the update did not modify any document, handle accordingly
                    return res.status(404).json({ message: 'User not found or document not modified.' });
                }
        
                res.status(200).json({ message: 'Image uploaded successfully' });

     
      
    }).end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.get("/images", async (req, res) => {
  try {
    console.log("Received GET request to /images"); // Log the request
    // Find all users with their uploaded images
    const usersWithImages = await userModel.find(
      {},
      { email: 1, uploadedImages: 1 }
    );

    // Map the response to include only necessary information
    const formattedImages = usersWithImages.map((user) => ({
      userModel: user.userModel,
      uploadedImages: user.uploadedImages.map((image) => ({
        imageUrl: image.imageUrl,
        uploadedBy: image.uploadedBy,
        timestamp: image.timestamp,
      })),
    }));

    res.status(200).json(formattedImages);
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.use("*", function(req,res){
//   res.sendFile(path.join(__dirname,"./client/build/index.html"));
// })

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
