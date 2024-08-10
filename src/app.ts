import express, { Request, Response } from "express";
import { ProductsRoutes } from "./modules/product/product.route";
import cors from "cors";
import { OrderRoutes } from "./modules/order/order.route";
const app = express();

// Parser start---------
app.use(express.json());
app.use(cors());

// parser end----------

app.use("/api/products", ProductsRoutes);

app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

// global error

app.use((err: Error, req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: err?.message || "Something went wrong",
  });
});

export default app;
