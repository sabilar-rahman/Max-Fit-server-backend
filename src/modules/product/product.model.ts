import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";



export const TProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required:true,
    default:0
  },
});

export const ProductsModel = model<TProduct>("Products", TProductSchema);
