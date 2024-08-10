import { Request, Response } from "express";
import { ProductService } from "./product.service";
import TProductValidationSchema from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // data validation using zod

    const zodParsedData = TProductValidationSchema.parse(product);

    const result = await ProductService.createProductsIntoDB(zodParsedData);

    // send response to user
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     // Extract the query parameters from the request
//     // product get start
//     const query = req.query;
//     // for search
//     const searchTerm = req?.query?.searchTerm as string;
//     // If a search term is provided, perform a search based on the search term
//     if (searchTerm) {
//       const result = await ProductService.getAllProductsFromDB(searchTerm);
//       // If no products are found, return a 404 response
//       if (!result.length) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }
//       // If products are found, return a 200 response with the products
//       res.status(200).json({
//         success: true,
//         message: `Products matching search term ${searchTerm} fetched successfully!`,
//         data: result,
//       });

//       //   product get
//     } else if (Object.keys(query).length === 0) {
//       // If no search term is provided, check if there are other query parameters
//       const result = await ProductService.getAllProductsFromDB(null);
//       res.status(200).json({
//         success: true,
//         message: "Products fetched successfully!",
//         data: result,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// get single products by id ---------

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const searchTerm = req.query.searchTerm as string;
    const categoryFilter = req.query.category as string;
    const sortByPrice = req.query.sortByPrice as string;

    let filters = {};
    if (
      categoryFilter &&
      [
        "Leg Extension machine",
        "Chest press",
        "Lat pulldown",
        "Treadmill",
        "Dumbbells",
        "Rowing machine",
        "StairMaster",
      ].includes(categoryFilter)
    ) {
      filters = { category: categoryFilter };
    }

    let sort = {};
    if (sortByPrice) {
      sort = { price: sortByPrice === "asc" ? 1 : -1 };
    }

  

    const result = await ProductService.getAllProductsFromDB(
      searchTerm,
      filters,
      sort
    );

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Products fetched successfully!`,
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductsFromDB(productId);

    // send response to user
    res.status(200).json({
      success: true,
      message: "A sleek and powerful smartphone with cutting-edge features.",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// delete single product from db

const deleteSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // send response to user
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
    });
  }
};

// update product put

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await ProductService.updateProductInDB(
      productId,
      updatedData
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  deleteSingleProducts,
  updateSingleProduct,
  // searchProducts
};
