// createComment.test.js
const { createComment } = require("../comment");
const Comment = require("../../models/Comment");
const VideoThumbnail = require("../../models/VideoThumbnail");
const Validator = require("fastest-validator");

const v = new Validator();

jest.mock("../models/Comment", () => ({
  create: jest.fn(),
}));

jest.mock("../models/VideoThumbnail", () => ({
  findById: jest.fn(),
}));

describe("createComment controller", () => {
  it("should create a comment successfully", async () => {
    const req = {
      body: {
        comment: "Test comment",
        videoId: "video123",
      },
      loggedUser: {
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    v.validate = jest.fn(() => []);

    VideoThumbnail.findById.mockResolvedValue({
      _id: "video123",
    });

    const newCommentData = {
      _id: "comment456",
      comment: "Test comment",
      VideoThumbnail: "video123",
      username: "testuser",
    };
    Comment.create.mockResolvedValue(newCommentData);

    await createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Successfully create data comment",
      data: newCommentData,
    });
  });

  it("should return 400 if request data is invalid", async () => {
    const req = {
      body: {
        videoId: "video123",
      },
      loggedUser: {
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    v.validate = jest.fn(() => [
      { type: "string", field: "comment", message: "Required field" },
    ]);

    // Call the controller function
    await createComment(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: expect.any(Array),
    });
  });

  it("should return 404 if video is not found", async () => {
    const req = {
      body: {
        comment: "Test comment",
        videoId: "video123",
      },
      loggedUser: {
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    v.validate = jest.fn(() => []);

    VideoThumbnail.findById.mockResolvedValue(null);

    await createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Data video not found" });
  });

  it("should return 500 if an error occurs during comment creation", async () => {
    const req = {
      body: {
        comment: "Test comment",
        videoId: "video123",
      },
      loggedUser: {
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    v.validate = jest.fn(() => []);

    VideoThumbnail.findById.mockResolvedValue({
      _id: "video123",
    });

    Comment.create.mockRejectedValue(new Error("Database error"));

    await createComment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error retrieving comment data.",
    });
  });
});
