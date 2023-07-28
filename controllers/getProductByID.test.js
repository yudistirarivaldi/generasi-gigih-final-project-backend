const request = require("supertest");
const app = require("../your-express-app"); // Replace this with your actual Express app file
const Product = require("../models/Product"); // Assuming this is the Product model used in the controller
const productController = require("./product"); // Replace this with the actual path to your controller file

// Mock the Product.findById method
jest.mock("../models/Product", () => ({
  findById: jest.fn(),
}));

describe("Product Controller", () => {
  describe("getByIDProduct", () => {
    it("should return 200 and the product data if the product exists", async () => {
      const fakeProductData = {
        _id: "fakeProductId",
        linkProduct: "https://example.com/product",
        title: "Fake Product",
        price: 99.99,
      };

      // Mock the Product.findById to resolve with fakeProductData
      Product.findById.mockResolvedValue(fakeProductData);

      // Make a GET request to the endpoint that corresponds to getByIDProduct
      const response = await request(app).get(
        `/products/${fakeProductData._id}`
      );

      // Expect the status code to be 200
      expect(response.status).toBe(200);

      // Expect the response body to match the fakeProductData
      expect(response.body).toEqual({
        status: "success",
        message: "Successfully get data product",
        data: fakeProductData,
      });

      // Expect that Product.findById was called with the correct ID
      expect(Product.findById).toHaveBeenCalledWith(fakeProductData._id);
    });

    it("should return 404 if the product does not exist", async () => {
      // Mock the Product.findById to resolve with null (product not found)
      Product.findById.mockResolvedValue(null);

      // Make a GET request to the endpoint with a non-existing product ID
      const nonExistingProductId = "nonExistingProductId";
      const response = await request(app).get(
        `/products/${nonExistingProductId}`
      );

      // Expect the status code to be 404
      expect(response.status).toBe(404);

      // Expect the response body to contain the "error" field
      expect(response.body).toHaveProperty("error", "Products not found.");

      // Expect that Product.findById was called with the correct ID
      expect(Product.findById).toHaveBeenCalledWith(nonExistingProductId);
    });

    it("should return 500 if there is an error during product retrieval", async () => {
      // Mock the Product.findById to reject with an error
      const errorMessage = "Database error";
      Product.findById.mockRejectedValue(new Error(errorMessage));

      // Make a GET request to the endpoint
      const fakeProductId = "fakeProductId";
      const response = await request(app).get(`/products/${fakeProductId}`);

      // Expect the status code to be 500
      expect(response.status).toBe(500);

      // Expect the response body to contain the "error" field
      expect(response.body).toHaveProperty(
        "error",
        "Error retrieving product data."
      );

      // Expect that Product.findById was called with the correct ID
      expect(Product.findById).toHaveBeenCalledWith(fakeProductId);
    });
  });
});
