import { TProduct } from "./product.interface";
import { ProductsModel } from "./product.model";

// create products
const createProductsIntoDB = async (product: TProduct) => {
  const result = await ProductsModel.create(product);
  return result;
};

// get products
// const getAllProductsFromDB = async (text: string | null) => {
//   if (text === null) {
//     const result = await ProductsModel.find();
//     return result;
//   } else {
//     const result = await ProductsModel.find({
//       $or: [{ name: { $regex: text, $options: "i" } },
//         { category: { $regex: text, $options: "i" } },
//       ],
//     });
//     return result;
//   }
// };

// const getAllProductsFromDB = async (text = null, filters = {}, sort = {}) => {
//   let query = {};

//   if (text !== null) {
//     query = {
//       $or: [
//         { name: { $regex: text, $options: "i" } },
//         { category: { $regex: text, $options: "i" } },
//       ],
//     };
//   }

//   // Merge filters into the query
//   query = { ...query, ...filters };

//   const result = await ProductsModel.find(query).sort(sort);

//   return result;
// };

// 11 aug try,
// const getAllProductsFromDB = async (text : string | null = null, filters = {}, sort = {}) => {
//   let query = {};

//   if (text) {
//     query = {
//       $or: [
//         { name: { $regex: text, $options: "i" } },
//         { category: { $regex: text, $options: "i" } },
//       ],
//     };
//   }

//   // Merge filters into the query
//   query = { ...query, ...filters };

//   // Fetch products with applied filters and sorting
//   const result = await ProductsModel.find(query).sort(sort);

//   return result;
// };

//  ok ok  ok =====================

interface ProductQuery {
  name?: { $regex: string; $options: "i" };
  category?: { $regex: string; $options: "i" };
  price?: { $gte: number; $lte: number };
  [key: string]: any ; // Allow additional properties
}

interface Filters {
  category?: string;
  [key: string]: any; // Allow additional filters
}

const getAllProductsFromDB = async (
  text: string | null = null,
  filters: Filters = {},
  sort: { [key: string]: 1 | -1 } = {},
  minPrice: number = 0,
  maxPrice: number = 3000
) => {
  const query: ProductQuery = {};

  // Add text search filter
  if (text) {
    query.$or = [
      { name: { $regex: text, $options: "i" } },
      { category: { $regex: text, $options: "i" } },
    ];
  }

  // Add price range filter
  if (minPrice >= 0 && maxPrice >= 0) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  // Add category filter
  if (filters.category) {
    query.category = { $regex: filters.category, $options: "i" };
  }

  // Add additional filters
  for (const key in filters) {
    if (key !== "category") {
      query[key] = filters[key];
    }
  }

  // Fetch products with applied filters and sorting
  const result = await ProductsModel.find(query).sort(sort);

  return result;
};





const getSingleProductsFromDB = async (_id: string) => {
  const result = await ProductsModel.findOne({ _id });
  return result;
};

const deleteProductFromDB = async (_id: string) => {
  const result = await ProductsModel.findByIdAndDelete(_id);
  return result;
};

const updateProductInDB = async (_id: string, updatedData: TProduct) => {
  const result = await ProductsModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
  });
  return result;
};

//     const result = await ProductsModel.find({
//         $or: [
//             { name: { $regex: searchTerm, $options: 'i' } },
//             // { description: { $regex: searchTerm, $options: 'i' } },
//             // { category: { $regex: searchTerm, $options: 'i' } },
//             // { 'variants.type': { $regex: searchTerm, $options: 'i' } },
//             // { 'variants.value': { $regex: searchTerm, $options: 'i' } },
//         ]
//     });
//     return result;
// };

// const searchProductsInDB = async (searchTerm: string) => {
//     const result = await ProductsModel.find({
//         $or: [
//             { name: { $regex: searchTerm, $options: 'i' } },
//             // { description: { $regex: searchTerm, $options: 'i' } },
//             // { category: { $regex: searchTerm, $options: 'i' } },
//             // { 'tags': { $regex: searchTerm, $options: 'i' } }, // Adjusted to search tags
//             // { 'variants.type': { $regex: searchTerm, $options: 'i' } },
//             // { 'variants.value': { $regex: searchTerm, $options: 'i' } },
//         ]
//     });
//     return result;
// };

// const searchProductsInDB = async (query: object) => {
//     const result = await ProductsModel.findOne(query);

//     return result;
// };

export const ProductService = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  deleteProductFromDB,
  updateProductInDB,
  // searchProductsInDB
};
