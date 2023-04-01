const express = require('express');
const productRouter = express.Router();
const { getAllProduct,
     fillterProduct
} = require('../controller/productController');

const { protect } = require('../middleware/authMiddleware');

productRouter.get('/', getAllProduct);

productRouter.get('/fill', fillterProduct)

module.exports = productRouter;