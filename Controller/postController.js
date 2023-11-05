import Post from '../Models/postModel.js'
import User from '../Models/userModel.js'

// Define a function to create a new post
export const createPost = async (request, response) => {
  try {
    // Extract the necessary data from the request body
    const { userId, description, picturePath } = request.body;

    // Find the user by their ID
    const user = await User.findById(userId);

    // Create a new post with the provided data
    const newPost = new Post({
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: description,
      userPicturePath: user.picturePath,
      picturePath: picturePath,
      likes: {},
      comments: []
    });

    // Save the new post to the database
    await newPost.save();

    // Fetch all posts from the database
    const posts = await Post.find();

    // Respond with a 200 status and the list of all posts in JSON format
    response.status(200).json(posts);
  } catch (error) {
    // Handle errors and respond with a 409 status and an error message
    response.status(409).json({ message: error.message });
  }
};

// Define a function to fetch all posts for a feed
export const getFeedPost = async (request, response) => {
  try {
    // Find and fetch all posts from the database
    const posts = await Post.find();

    // Respond with a 200 status and the list of all posts in JSON format
    response.status(200).json(posts);
  } catch (error) {
    // Handle errors and respond with a 404 status and an error message
    response.status(404).json({ message: error.message });
  }
}

// Define a function to fetch all posts for a specific user
export const getUserPost = async (request, response) => {
  try {
    // Extract the 'userId' parameter from the request's URL
    const { userId } = request.params;

    // Find and fetch all posts for the specified user from the database
    const posts = await Post.find({ userId });

    // Respond with a 200 status and the list of user-specific posts in JSON format
    response.status(200).json(posts);
  } catch (error) {
    // Handle errors and respond with a 404 status and an error message
    response.status(404).json({ message: error.message });
  }
}



// Define a function to handle toggling likes on a post for a specific user
export const likePost = async (request, response) => {
  try {
    // Extract the 'id' parameter from the request's URL, which represents the post ID to like/unlike
    const { id } = request.params;

    // Extract the 'userId' from the request body to identify the user
    const { userId } = request.body;

    // Find the post by its ID
    const post = await Post.findById(id);

    if (!post) {
      // If the post is not found, respond with a 404 status and a message
      return response.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // If the user has already liked the post, remove the like
      post.likes.delete(userId);
    } else {
      // If the user hasn't liked the post, add the like
      post.likes.set(userId, true);
    }

    // Update the post document with the modified 'likes' data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Respond with a 200 status and the updated post data
    response.status(200).json(updatedPost);
  } catch (error) {
    // Handle errors and respond with a 404 status and an error message
    response.status(404).json({ message: error.message });
  }
};
