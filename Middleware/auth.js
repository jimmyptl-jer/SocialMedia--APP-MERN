import jwt from 'jsonwebtoken';

// Middleware to verify and decode JWT tokens from request headers
export const verifyToken = async (request, response, next) => {
  try {
    // Extract the token from the "Authorization" header
    let token = request.header("Authorization");

    if (!token) {
      // If no token is provided, send a 401 Unauthorized response
      return response.status(401).send("Access Denied");
    }

    // Remove the "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimLeft();
    }

    // Verify and decode the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the decoded user data in the request object for later use
    request.user = decoded;

    // Call the next middleware or route handler to proceed with the request
    next();
  } catch (error) {
    // If the token is invalid or there's an error, send a 401 Unauthorized response
    response.status(401).json({ message: 'Invalid token' });
  }
};
