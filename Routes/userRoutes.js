import express from 'express';

// Import controller functions and middleware
import {
  getUser,
  getUserFriend,
  addRemoveFriend
} from '../Controller/userController.js';

import { verifyToken } from '../Middleware/auth.js';

// Create an Express router instance
const router = express.Router();

/* READ Operations */

// GET route to fetch user details by ID, requires token verification
router.get("/:id", verifyToken, getUser);

// GET route to fetch user's friend details by ID, also requires token verification
router.get("/:id", verifyToken, getUserFriend);

/* UPDATE Operations */

// PATCH route to add or remove a friend for a user, token verification required
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Export the router to be used in your Express application
export default router;
