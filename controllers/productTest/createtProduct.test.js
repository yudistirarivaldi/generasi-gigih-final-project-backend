const { createProduct, getProduct } = require("../product");
const Product = require("../../models/Product");
const VideoThumbnail = require("../../models/VideoThumbnail");
const Validator = require("fastest-validator");

const v = new Validator();

jest.mock("../../models/Product", () => ({
  create: jest.fn(),
}));

jest.mock("../../models/VideoThumbnail", () => ({
  findById: jest.fn(),
}));

describe("createProduct controller", () => {
  // Test case for successful product creation
  it("should create a product successfully", async () => {
    // Mock request and response objects
    const req = {
      body: {
        linkProduct: "https://example.com/product/123",
        title: "Test Product",
        price: 100,
        videoId: "video123",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock the Validator validate method to return an empty array (valid data)
    v.validate = jest.fn(() => []);

    // Mock the VideoThumbnail.findById method to return a video object
    VideoThumbnail.findById.mockResolvedValue({
      _id: "video123",
      // Include other relevant properties of the video object
    });

    // Mock the Product.create method to return a new product object
    const newProductData = {
      _id: "product456",
      linkProduct: "https://example.com/product/123",
      title: "Test Product",
      price: 100,
      VideoThumbnail: "video123",
    };
    Product.create.mockResolvedValue(newProductData);

    // Call the controller function
    await createProduct(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Successfully create data video thumbnail",
      data: newProductData,
    });
  });

  // Test case for invalid request data
  it("should return 400 if request data is invalid", async () => {
    // Mock request and response objects with invalid data
    const req = {
      body: {
        // Incomplete data to trigger validation error
        title: "Test Product",
        price: 100,
        videoId: "video123",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock the Validator validate method to return validation errors
    v.validate = jest.fn(() => [
      { type: "string", field: "linkProduct", message: "Required field" },
    ]);

    // Call the controller function
    await createProduct(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: expect.any(Array),
    });
  });

  // Test case for video not found
  it("should return 404 if video is not found", async () => {
    // Mock request and response objects
    const req = {
      body: {
        linkProduct: "https://example.com/product/123",
        title: "Test Product",
        price: 100,
        videoId: "video123",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock the Validator validate method to return an empty array (valid data)
    v.validate = jest.fn(() => []);

    // Mock the VideoThumbnail.findById method to return null (video not found)
    VideoThumbnail.findById.mockResolvedValue(null);

    // Call the controller function
    await createProduct(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Data video not found" });
  });

  // Test case for server error
  it("should return 500 if an error occurs during product creation", async () => {
    // Mock request and response objects
    const req = {
      body: {
        linkProduct: "https://example.com/product/123",
        title: "Test Product",
        price: 100,
        videoId: "video123",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock the Validator validate method to return an empty array (valid data)
    v.validate = jest.fn(() => []);

    // Mock the VideoThumbnail.findById method to return a video object
    VideoThumbnail.findById.mockResolvedValue({
      _id: "video123",
      // Include other relevant properties of the video object
    });

    // Mock the Product.create method to throw an error
    Product.create.mockRejectedValue(new Error("Database error"));

    // Call the controller function
    await createProduct(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error retrieving product data.",
    });
  });
});
