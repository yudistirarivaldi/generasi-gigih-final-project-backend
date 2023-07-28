const { getProduct } = require("../product");
const Product = require("../../models/Product");
const VideoThumbnail = require("../../models/VideoThumbnail");

jest.mock("../models/Product", () => ({
  countDocuments: jest.fn(),
  find: jest.fn(),
}));

jest.mock("../models/VideoThumbnail", () => ({}));

describe("getProduct controller", () => {
  it("should retrieve products with pagination", async () => {
    const req = {
      query: {
        page: 1,
        limit: 10,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const products = [
      {
        _id: "product1",
        linkProduct: "https://example.com/product/1",
        title: "Product 1",
        price: 100,
        VideoThumbnail: {
          _id: "video1",
          videoUrl: "https://example.com/video/1",
        },
      },
      // Add more products as needed for testing pagination
    ];

    const totalProducts = 25;

    Product.countDocuments.mockResolvedValue(totalProducts);
    Product.find.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(products), // Return the products array in the exec() method
    });

    await getProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Successfully get data product",
      data: {
        // Return the products array in the 'data' key
        exec: expect.any(Function),
        limit: expect.any(Function),
        populate: expect.any(Function),
        select: expect.any(Function),
        skip: expect.any(Function),
      },

      currentPages: 1,
      totalPages: 3, // Assuming totalProducts is 25 and limit is 10
      totalProducts,
    });
  });

  // Test case for server error
  it("should return 500 if an error occurs during product retrieval", async () => {
    // Mock request and response objects
    const req = {
      query: {
        page: 1, // Assuming the default values for page and limit are used
        limit: 10,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock Product.countDocuments to throw an error
    const errorMessage = "Database error";
    Product.countDocuments.mockRejectedValue(new Error(errorMessage));

    // Call the controller function
    await getProduct(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error retrieving product data.",
    });
  });
});
