import express from "express";

import { ProductController } from "./product.controller";

const router = express.Router()


router.post('/',ProductController.createProduct);

router.get('/',ProductController.getAllProducts);

router.get('/:productId',ProductController.getSingleProducts)
router.delete('/:productId',ProductController.deleteSingleProducts)

router.put('/:productId',ProductController.updateSingleProduct)

// router.get('/',ProductController.searchProducts);

export const ProductsRoutes = router;