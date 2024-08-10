import { TProduct } from "../product/product.interface";

export type IOrder = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    payment: string;
  }
  cart:TProduct[]
};
