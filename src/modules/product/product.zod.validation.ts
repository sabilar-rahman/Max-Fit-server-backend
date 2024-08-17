import { z } from "zod";

// Define the TVariant schema
// const TVariantValidationSchema = z.object({
//     type: z.string({ required_error: "Variant type is required" }),
//     value: z.string({ required_error: "Variant type is required" })
// });

// // Define the TInventory schema
// const TInventoryValidationSchema = z.object({
//     quantity: z.number({ required_error: "Quantity is required" }).min(0, { message: "Quantity must be a non-negative number" }),
//     inStock: z.boolean({ required_error: "InStock status is required" })
// });

// Define the TProduct schema
const TProductValidationSchema = z.object({
  name: z.string({ required_error: "Product name is required" }),
  price: z
    .number({ required_error: "Product price is required" })
    .min(0, { message: "Price must be a non-negative number" }),
  description: z.string({ required_error: "Product description is required" }),
  image: z.string(),
  category: z.string({ required_error: "Product category is required" }),
  stock: z.number(),
  quantity: z.number().optional(),
});

export default TProductValidationSchema;
