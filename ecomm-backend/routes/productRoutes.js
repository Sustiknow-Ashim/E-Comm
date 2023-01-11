import express from "express";
const router = express.Router();
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { getProductById, getProducts } from "../controllers/productController.js";


router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

export default router;