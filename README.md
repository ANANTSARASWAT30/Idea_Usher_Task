# Node.js REST API with MongoDB

This project is a RESTful API built with Node.js and MongoDB. It provides endpoints for managing posts and tags, allowing users to create and retrieve data efficiently.

## Project Structure

```
nodejs-rest-api
├── src
│   ├── controllers
│   │   ├── postController.js
│   │   └── tagController.js
│   ├── models
│   │   ├── postModel.js
│   │   └── tagModel.js
│   ├── routes
│   │   ├── postRoutes.js
│   │   └── tagRoutes.js
│   ├── app.js
│   └── config
│       └── db.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd nodejs-rest-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. **Run the application:**
   ```
   npm start
   ```

## API Endpoints

### Posts

- **GET /api/posts**: Retrieve all posts with optional sorting, pagination, and filtering.
- **POST /api/posts**: Create a new post.

### Tags

- **GET /api/tags**: Retrieve all tags.
- **POST /api/tags**: Create a new tag.

## Usage Examples

### Retrieve All Posts

```
GET /api/posts
```

### Create a New Post

```
POST /api/posts
Content-Type: application/json

{
  "title": "Post Title",
  "desc": "Post Description",
  "image": "image-url",
  "tags": ["tagId1", "tagId2"]
}
```

## Deployment

To deploy the application, ensure that your environment variables are set correctly on your production server. You can use services like Heroku, AWS, or DigitalOcean to host your Node.js application. Follow the respective service's documentation for deployment instructions.