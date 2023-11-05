import express from 'express';

// Import the login function from the authController
import { login } from '../Controller/authController.js';

// Create an Express router instance
const router = express.Router();

// Define a route for handling user login
router.post("/login", login);

// Export the router to be used in your application
export default router;
