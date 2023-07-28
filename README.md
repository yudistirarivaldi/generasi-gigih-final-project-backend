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
- **VideoThumbnail:** References the "VideoThumbnail" model and stores the ID of the associated video for this comment.
- **timestamps:** An additional field that automatically adds the creation time (createdAt) and the update time (updatedAt) whenever a new comment is created or modified.
- **unique:** Indicates that each entry in the "Comment" collection must have a unique value for each field.

### Model Product
