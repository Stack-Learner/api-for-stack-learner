const express = require('express'); 
const bannerController = require('../controllers/bannerController'); 
const authController = require('../controllers/authController'); 
const router = express.Router(); 

/**
 * @BANNER_Routes
 *  POST    /api/banner
 *  GET     /api/banner
 *  GET     /api/banner/:id
 *  PATCH   /api/banner/:id
 *  DELETE  /api/banner/:id
 */


/**
 *@PUBLIC 
 */
router.route('/').get(bannerController.getAllBanners);
router.route('/:id').get(bannerController.getBanner)


/**
 * @ADMIN_ROUTES
 */
router.use(authController.protect,authController.restrictTo('admin','user')); 
router.post('/',bannerController.createBanner); 
router.route('/:id').patch(bannerController.updateBanner).delete(bannerController.deleteBanner); 

module.exports = router; 