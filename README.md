# generasi-gigih-midterm-backend

## Installation

1. Clone the repository:

### `git clone https://github.com/yudistirarivaldi/generasi-gigih-homework-Module-2.3.git`


2. Install the dependencies:

### `npm install`


3. Start the server:

### `npm run dev`

4. Run unit test:

### `npm run test`

5. Documentation API With POSTMAN

### `https://documenter.getpostman.com/view/17375603/2s9XxsUvj5`

6. List API request and response

### `https://gist.github.com/yudistirarivaldi/5a4beea432cfe548d5fa7a94de2b5dc8`

## Database Models

### Model Comment

This model represents comments made by users on specific videos.

- **username:** ` Stores the username of the user who made the comment. This field is required.`
- **comment:** `Stores the content of the comment made by the user. This field is required.`
- **VideoThumbnail:** `References the "VideoThumbnail" model and stores the ID of the associated video for this comment.`
- **timestamps:** `An additional field that automatically adds the creation time (createdAt) and the update time (updatedAt) whenever a new comment is created or modified.`
- **unique:** `Indicates that each entry in the "Comment" collection must have a unique value for each field.`

### Model Product

This model represents a product that may be related to a specific video.

- **linkProduct:** `Stores the link or URL to the related product. This field is required.`
- **title:** `Stores the title or name of the product. This field is required.`
- **price:** `Stores the price of the product. This field is required.`
- **VideoThumbnail:** `References the "VideoThumbnail" model and stores the ID of the associated video for this product.`
- **timestamps:** `An additional field that automatically adds the creation time (createdAt) and the update time (updatedAt) whenever a new comment is created or modified.`
- **unique:** `Indicates that each entry in the "Comment" collection must have a unique value for each field.`

### Model User

This model represents users who can make comments and is associated with user account data.

- **username:** `Stores the username of the user. This field is required.`
- **email:** ` Stores the email address of the user. This field is required.`
- **password:** `Stores the password of the user. This field is required.`
- **role:** `Stores the role or access level of the user within the system, with a default value of "user" if not specified.`
- **timestamps:** `An additional field that automatically adds the creation time (createdAt) and the update time (updatedAt) whenever a new comment is created or modified.`
- **unique:** `Indicates that each entry in the "Comment" collection must have a unique value for each field.`

### Model VideoThumbnail

This model represents users who can make comments and is associated with user account data.

- **thumbnail:** `This model represents users who can make comments and is associated with user account data.`
- **videoUrl:** `This model represents users who can make comments and is associated with user account data.`
- **timestamps:** `An additional field that automatically adds the creation time (createdAt) and the update time (updatedAt) whenever a new comment is created or modified.`
- **unique:** `Indicates that each entry in the "Comment" collection must have a unique value for each field.`

## API Structure Overview

- **Models:** `The API has four models defined using Mongoose: Comment, Product, User, and VideoThumbnail. These models represent the data structure of each entity and define their fields and data types.`

- **Routes:** `The API has several routes defined for different resources. Each route corresponds to an endpoint and specifies the HTTP methods allowed for that endpoint.`
```
/comment: Handles operations related to comments.
/product: Handles operations related to products.
/users: Handles operations related to users, such as registration and login.
/videothumbnail: Handles operations related to video thumbnails.
```

- **Controllers:** `Each route is associated with a controller function that defines the logic for handling the incoming requests and generating responses. Controllers interact with the models to perform CRUD (Create, Read, Update, Delete) operations on the database.`
  
- **Middleware:** `Each route is associated with a controller function that defines the logic for handling the incoming requests and generating responses. Controllers interact with the models to perform CRUD (Create, Read, Update, Delete) operations on the database.`
- **authentication:** ` A middleware function that checks if the user is authenticated before proceeding to certain routes.`
- **authorization:** `A middleware function that checks if the user has the required role for accessing certain routes.`

- **API Endpoints and Operations:** `The API has several routes defined for different resources. Each route corresponds to an endpoint and specifies the HTTP methods allowed for that endpoint.`
```
/Comment API:
POST /comment: Creates a new comment associated with a specific video thumbnail.

Product API:
GET /product: Retrieves a paginated list of products with video thumbnails.
GET /product/:id: Retrieves a specific product by its ID with the associated video thumbnail.
POST /product: Creates a new product associated with a specific video thumbnail.
PUT /product/:id: Updates an existing product with the specified ID.
DELETE /product/:id: Deletes an existing product with the specified ID.

User API:
POST /user/register: Registers a new user with a username, email, and password.
POST /user/login: Logs in a user with their email and password.
GET /user: Retrieves a list of all users (requires authentication).

Video Thumbnail API:
GET /videothumbnail: Retrieves a paginated list of video thumbnails.
GET /videothumbnail/:id: Retrieves a specific video thumbnail by its ID with associated products and comments.
POST /videothumbnail: Creates a new video thumbnail with the specified URL and thumbnail image.
PUT /videothumbnail/:id: Updates an existing video thumbnail with the specified ID.
DELETE /videothumbnail/:id: Deletes an existing video thumbnail with the specified ID.
```

- **Request and Response Format:** `he API uses JSON format for both request and response data. Requests carry data in the request body, and responses contain data fetched from the database..`

