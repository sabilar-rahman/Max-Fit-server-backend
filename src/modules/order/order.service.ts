import { ProductsModel } from "../product/product.model";
import { IOrder } from "./order.interface";
import { OrdersModel } from "./order.model";

// post orders
// const createOrdersIntoDB = async (orders: IOrder) => {
//   const result = await OrdersModel.create(orders);
//   for (const singleCartItem of result.cart) {
//     await ProductsModel.findByIdAndUpdate(singleCartItem._id, {
//       stock: singleCartItem.stock - singleCartItem.stock!,
//     });
//   }
//   return result;
// };

// const createOrdersIntoDB = async (orders: IOrder) => {
//   const result = await OrdersModel.create(orders); // Save order to DB
//   for (const singleCartItem of result.cart) {
//     await ProductsModel.findByIdAndUpdate(singleCartItem._id, {
//       stock: singleCartItem.stock - singleCartItem.stock!,
//     }); // Update product stock
//   }
//   return result;
// };

// const createOrdersIntoDB = async (orders: IOrder) => {
//   // First, save the order to the database
//   const result = await OrdersModel.create(orders);

//   // Process each item in the cart
//   for (const singleCartItem of result.cart) {
//     const product = await ProductsModel.findById(singleCartItem._id);

//     if (!product) {
//       throw new Error(`Product with ID ${singleCartItem._id} not found.`);
//     }

//     if (product.stock < singleCartItem.stock) {
//       throw new Error(`Not enough stock for product ${product.name}.`);
//     }

//     // Update the stock of the product
//     await ProductsModel.findByIdAndUpdate(singleCartItem._id, {
//       stock: product.stock - singleCartItem.stock,
//     });
//   }

//   return result;
// };


//  ======================= আজকে 10 অগস্ত এর চেষ্টা ===================

// const createOrdersIntoDB = async (orders: IOrder) => {
//   // First, save the order to the database
//   const result = await OrdersModel.create(orders);

//   // Process each item in the cart
//   for (const CartItem of result.cart) {
//     await ProductsModel.findByIdAndUpdate(CartItem._id, {
//       stock: CartItem.stock - CartItem.quantity!,
//     });
//   }

//   return result;
// };


const createOrdersIntoDB = async (orders: IOrder) => {
  // First, save the order to the database
  const result = await OrdersModel.create(orders);

  // Process each item in the cart
  for (const cartItem of orders.cart) {
    await ProductsModel.findByIdAndUpdate(cartItem._id, {
      $inc: { stock: -cartItem.quantity }
    }, { new: true }); // Use $inc to decrement the stock
  }

  return result;
};


const getOrdersFromDB = async (email: string | null) => {
  if (email === null) {
    const result = await OrdersModel.find();
    return result;
  } else {
    const result = await OrdersModel.find({ email });
    return result;
  }
};

// const getOrdersByEmail = async (email: any) => {
//   const result = await OrdersModel.find({ email });
//   return result;
// };

export const OrdersService = {
  createOrdersIntoDB,
  getOrdersFromDB,
  // getOrdersByEmail,
};
