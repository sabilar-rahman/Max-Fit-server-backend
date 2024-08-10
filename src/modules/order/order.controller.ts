import { Request, Response } from "express";
import { OrdersService } from "./order.service";
// import OrderValidationSchema from "./order.zod.validation";

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const orders = req.body;

//     const zodParseOrdersData = OrderValidationSchema.parse(orders);

//     const result = await OrdersService.createOrdersIntoDB(zodParseOrdersData);

//     // send response to user
//     res.status(200).json({
//       success: true,
//       message: "Order created successfully!",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


const createOrder = async (req: Request, res: Response) => {
  try {
    const orders = req.body;

    // const zodParseOrdersData = OrderValidationSchema.parse(orders);

    const result = await OrdersService.createOrdersIntoDB(orders);

    // send response to user
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
     
    })
  }
};




// get all orders

// const createOrder: async (req: Request, res: Response) => {
//   try {
//       // Validate the request body against the schema
//       const validatedOrder = OrderValidationSchema.parse(req.body);
      
//       // Create the order in the database
//       const order = await OrdersService.createOrdersIntoDB(validatedOrder);
      
//       res.status(201).json(order);
//   } catch (error) {
//       res.status(400).json({ error: error.message });
//   }
// }


const getAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    // const result = null
    const email = query?.email as string;
    if (Object.keys(query).length === 0) {
      const result = await OrdersService.getOrdersFromDB(null);
      if (!result.length) {
        return res.status(400).json({
          success: false,
          message: "Orders Not found",
          data: result,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } else if (query.email) {
      const result = await OrdersService.getOrdersFromDB(email);
      if (result.length) {
        return res.status(202).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const OrdersController = {
  createOrder,
  getAllOrders,
};
