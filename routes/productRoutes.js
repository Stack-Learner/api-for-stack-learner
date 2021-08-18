const express = require('express'); 
const authController = require('../controllers/authController'); 
const productController = require('../controllers/productController')
const router = express.Router(); 


/**
 * @PRODUCTS_Routes
 *  POST    /api/products
 *  GET     /api/products
 *  GET     /api/products/:id
 *  PATCH   /api/products/:id
 *  DELETE  /api/products/:id
 */


/**
 *@PUBLIC 
 */
router.route('/').get(productController.getAllProducts);
router.route('/:id').get(productController.getProduct)


/**
 * @ADMIN_ROUTES
 */
router.use(authController.protect,authController.restrictTo('admin','user')); 
router.post('/',productController.createProduct); 
router.route('/:id').patch(productController.updateProduct).delete(productController.deleteProduct); 

module.exports = router; 

