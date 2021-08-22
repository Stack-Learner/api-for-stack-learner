const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * @PUBLC ROUES
 */

/**
 * @ADMIN ROUTES
 */
router.use(authController.protect, authController.restrictTo('admin', 'user'));
router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router; 