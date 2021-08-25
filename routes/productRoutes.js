const express = require('express'); 
const authController = require('../controllers/authController'); 
const productController = require('../controllers/productController')
const reviewRouter = require('./reviewRoutes'); 
const uploadS3 = require('../uploadS3'); 
const router = express.Router(); 

router.use('/:productId/review',reviewRouter); 

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
router.get('/category/:name', productController.getProductByCategory); 


/**
 * @ADMIN_ROUTES
 */
router.use(authController.protect,authController.restrictTo('admin'));

//when an admin is creating a product it's mendatory to upload an image . 
router.post(
  '/',
  uploadS3.array('product-images',process.env.MAX_PRODUCT_IMAGE), 
  productController.setProductImages,
  productController.categoryAndAdminIdSetter, 
  productController.createProduct
); 
router.route('/:id').patch(productController.updateProduct).delete(productController.deleteProduct); 

module.exports = router; 

