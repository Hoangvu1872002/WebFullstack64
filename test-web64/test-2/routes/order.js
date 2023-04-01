const  express = require ('express');
const router = express.Router();

const  {
    getOrders
  } = require ('../controller/orderController.js');
  
  router.get('/', getOrders);

  module.exports = router;