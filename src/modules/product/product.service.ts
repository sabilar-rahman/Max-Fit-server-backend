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

const getAllProductsFromDB = async (text = null, filters = {}, sort = {}) => {
  let query = {};

  if (text !== null) {
    query = {
      $or: [
        { name: { $regex: text, $options: "i" } },
        { category: { $regex: text, $options: "i" } },
      ],
    };
  }

  // Merge filters into the query
  query = { ...query, ...filters };

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
