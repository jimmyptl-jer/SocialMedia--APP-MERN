// Import necessary modules
import express from 'express'           // Express.js framework for building web applications
import bodyParser from 'body-parser'    // Middleware for parsing request bodies
import mongoose from 'mongoose'         // MongoDB object modeling tool
import cors from 'cors'                 // Middleware for enabling Cross-Origin Resource Sharing
import dotenv from 'dotenv'             // For loading environment variables
import multer from 'multer'             // Middleware for handling file uploads
import helmet from 'helmet'             // Middleware for enhancing security
import morgan from 'morgan'             // HTTP request logger middleware
import path from 'path'                 // Node.js module for working with file paths
import { fileURLToPath } from 'url'      // For getting the path from a URL

import {register} from './Controller/authController.js'
import {createPost} from './Controller/postController.js'

import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import postRoutes from './Routes/postRoutes.js'
import { verifyToken } from './Middleware/auth.js'

import User from './Models/userModel.js'
import Post from './Models/postModel.js'

import {users,posts} from './data/index.js'

/* Configuration */

// Get the current file's path and directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from a .env file
dotenv.config()

// Create an Express application
const app = express()

// Middleware for parsing JSON data in incoming requests
app.use(express.json())

// Middleware for enhancing security with helmet
app.use(helmet())

// Configure Cross-Origin Resource Sharing (CORS) policy
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

// HTTP request logger middleware (common format)
app.use(morgan("common"))

// Middleware for parsing JSON data with specified limits
app.use(bodyParser.json({ limit: "30mb", extended: true }))

// Middleware for parsing URL-encoded data with specified limits
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// Middleware for enabling CORS for web clients
app.use(cors())

// Serve static files from the 'public/assets' directory under the '/assets' route
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))


/* File Storage Configuration */
// Configure disk storage for multer
const storage = multer.diskStorage({
  // Set the destination directory where uploaded files will be stored
  destination: function(req, file, cb) {
    cb(null, "public/assets");
  },
  // Set the filename for the uploaded file
  filename: function(req, file, cb) {
    // Use the original filename for the stored file
    cb(null, file.originalname);
  }
});

// Create a middleware for handling file uploads using the configured storage
const upload = multer({ storage });

/*Routes*/
app.post("/auth/register",upload.single("picture"),register)
app.post("/posts",verifyToken,upload.single("picture"),createPost)

/*Routes*/
app.use('/auth',authRoutes)
app.use('/users',userRoutes)
app.use('/post',postRoutes)

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  app.listen(PORT,()=>console.log(`Server Port: ${PORT}`))
  console.log('mongo connected')

  // User.insertMany(users)
  // Post.insertMany(posts)
}).catch((error)=>{
  console.log(`Error while connecting to database ${error}`)
})