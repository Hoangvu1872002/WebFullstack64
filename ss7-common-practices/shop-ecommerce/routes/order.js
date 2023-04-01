const  express = require ('express');
const router = express.Router();
const  {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require ('../controller/orderController.js');
const  { protect, isAdmin } = require ('../middleware/authMiddleware.js');

// router.route('/').post(protect, createOrder).get(protect, isAdmin, getOrders)
router.post('/', protect, createOrder);
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

module.exports = router;
