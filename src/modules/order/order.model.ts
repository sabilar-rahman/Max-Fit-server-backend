import mongoose, { Schema, } from "mongoose";
import { IOrder } from "./order.interface";
import { TProductSchema } from "../product/product.model";

const OrderSchema = new Schema<IOrder>({
    user: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        payment: {
            type: String,
            required: true,
        },
    },
    cart: [TProductSchema],
});

export const OrdersModel = mongoose.model<IOrder>("Order", OrderSchema);
