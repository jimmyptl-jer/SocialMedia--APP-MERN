// Import required modules and models
import bcrypt from 'bcrypt';                 // Library for hashing passwords
import jwt from 'jsonwebtoken';               // Library for generating JSON Web Tokens
import User from "../Models/userModel.js";    // Import the User model

// Define a function to handle user registration
export const register = async (request, response) => {
  try {
    // Extract user registration data from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impression
    } = request.body;

    // Check if a user with the same email already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
      // Respond with a conflict status if the user already exists
      response.status(409).json({msg:"User already exit"});
    }

    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new User instance with the provided data
    const newUser = new User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      picturePath: picturePath,
      friends: friends,
      location: location,
      occupation: occupation,
      viewedProfile: Math.floor(Math.random() * 1000), // Random number for viewedProfile
      impression: Math.floor(Math.random() * 1000)      // Random number for impression
    });

    // Respond with a success status and the newly created user object
    response.status(201).json(newUser);

  } catch (error) {
    // Handle errors and respond with an internal server error status
    console.log("Error in Register", error);
    response.status(500).send(error.message);
  }
}

// Define a function to handle user login
export const login = async (request, response) => {
  try {
    // Extract email and password from the request body
    const { email, password } = request.body;

    // Find a user with the provided email in the database
    const user = await User.findOne({ email });

    if (!user) {
      // Respond with a 400 status and a message if the user doesn't exist
      response.status(400).json({ message: "User doesn't exist" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // Respond with a 400 status and a message if the password is invalid
      return response.status(400).json({ message: "Invalid Password!" });
    }

    // If the password is valid, generate a JSON Web Token (JWT)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the password field from the user object (for security)
    delete user.password;

    // Respond with a 200 status, the JWT token, and the user object
    response.status(200).json({
      token, user
    });
  } catch (error) {
    // Handle errors and respond with an internal server error status
    console.log("Error in Login", error);
    response.status(500).send(error.message);
  }
}
