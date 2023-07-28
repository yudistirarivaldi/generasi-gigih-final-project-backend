# generasi-gigih-midterm-backend

## Installation

1. Clone the repository:

git clone https://github.com/yudistirarivaldi/generasi-gigih-homework-Module-2.3.git


2. Install the dependencies:

### `npm install`


3. Start the server:

### `npm run dev`

4. Run unit test:

### `npm run test`

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
