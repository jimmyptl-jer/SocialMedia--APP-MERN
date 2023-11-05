import User from "../Models/userModel.js"

// Define a function to get user details by ID
export const getUser = async (request, response) => {
  try {
    // Extract the 'id' parameter from the request's URL
    const { id } = request.params;

    // Find a user in the database by their ID
    const user = await User.findById(id);

    // Respond with a 200 status and the user data in JSON format
    response.status(200).json(user);
  } catch (error) {
    // Handle errors and respond with a 404 status and an error message
    response.status(404).json({ message: error.message });
  }
};


// Define a function to get a user's friend details by their ID
export const getUserFriend = async (request, response) => {
  try {
    // Extract the 'id' parameter from the request's URL
    const { id } = request.params;

    // Find the user by their ID
    const user = await User.findById(id);

    // Fetch friend data for each friend ID associated with the user
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        // For each friend ID, find the corresponding user
        return User.findById(friendId);
      })
    );

    // Format the data to include only specific fields
    const formattedData = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return {
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath
      };
    });

    // Respond with a 200 status and the formatted friend data in JSON format
    response.status(200).json(formattedData);
  } catch (error) {
    // Handle errors and respond with a 404 status and an error message
    response.status(404).json({ message: error.message });
  }
};


export const addRemoveFriend = async (request, response) => {
  try {
    
    const {id,friendId} = request.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId)

    if(user.friends.includes(friendId)){
      user.friends = user.friends.filter((id)=> id !== friendId)
      friend.friends = friend.friends.filter((id)=> id !== id)
    }else{
      user.friends.push(friendId)
      friend.friends.push(id)
    }

    await user.save();
    await friend.save();

     // Fetch friend data for each friend ID associated with the user
     const friends = await Promise.all(
      user.friends.map((friendId) => {
        // For each friend ID, find the corresponding user
        return User.findById(friendId);
      })
    );

    // Format the data to include only specific fields
    const formattedData = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return {
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath
      };
    });

    // Respond with a 200 status and the formatted friend data in JSON format
    response.status(200).json(formattedData);

  } catch (error) {
    // Handle errors and respond with a 404 status and an error message
    response.status(404).json({ message: error.message });
  }
}