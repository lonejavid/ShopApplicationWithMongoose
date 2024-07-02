const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

 router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);


  router.get('/products/:productId',shopController.getProduct)
//  router.post('/cart',shopController.postCart)
//  router.post('/cart-delete-item',shopController.postCartDelete)



//  router.get('/cart', shopController.getCart);

// // router.post('/cart',shopController.postCart)

// router.post('/create-order', shopController.postOrder);

//  router.get('/orders', shopController.getOrders);

//router.get('/checkout', shopController.getCheckout);

module.exports = router;
