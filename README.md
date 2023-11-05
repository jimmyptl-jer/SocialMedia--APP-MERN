# Social Media App Backend

This is the backend code for a social media app. It provides the necessary APIs and functionality to create, retrieve, and manage posts, user data, and interactions within the social media platform.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage user profiles.
- Create, retrieve, and update posts.
- Like and comment on posts.
- Follow and unfollow other users.
- Secure authentication and authorization.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

# Project Dependencies

This project relies on several key dependencies to enable its functionality. Below is a list of these dependencies along with their purposes:

1. **bcrypt**: Used for securely hashing and salting passwords, ensuring they are stored safely in the database.

2. **body-parser**: Middleware for parsing incoming request bodies, facilitating the handling of JSON and form data in HTTP requests.

3. **cors**: Enables Cross-Origin Resource Sharing (CORS), allowing the server to accept requests from different origins or domains.

4. **dotenv**: Utilized to load environment variables from a `.env` file, providing a secure way to store sensitive configuration data.

5. **express**: A powerful web application framework for building APIs and handling HTTP requests efficiently.

6. **gridfs-stream**: A library for working with MongoDB's GridFS, commonly used for storing and retrieving large files such as images and videos in MongoDB.

7. **helmet**: Middleware that enhances the security of Express applications by setting various HTTP headers to protect against common vulnerabilities.

8. **jsonwebtoken**: Used for generating and verifying JSON Web Tokens (JWTs), an integral component of user authentication and authorization in web applications.

9. **mongoose**: An Object Data Modeling (ODM) library designed for MongoDB, simplifying database interaction, including schema creation and validation.

10. **morgan**: Middleware that logs HTTP request information, aiding in debugging and monitoring the application's functionality.

11. **multer**: A middleware for handling file uploads in HTTP requests, making it easier to process and manage files sent by users.

12. **multer-gridfs-storage**: Integrates Multer with MongoDB's GridFS, allowing the storage of files within MongoDB GridFS using the Multer middleware.

These dependencies are essential for the successful development of a Node.js application, particularly for building web servers that handle user authentication, file uploads, and interactions with MongoDB databases.
