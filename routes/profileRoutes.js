const express = require('express');
const profileController = require('../controllers/profileController');
const authController = require('../controllers/authController');

const router = express.Router();
/**
 * @AUTHENTICATED_USER_ROUTES
 */

router.use(authController.protect);
router
  .route('/')
  .post(profileController.setUserId, profileController.createProfile)
  .get(profileController.setUserId, profileController.getUserProfile)//have only ability to get current user 
  .patch(profileController.setUserId,profileController.updateUserProfile)
  .delete(profileController.setUserId,profileController.deleteUserProfile);
/**
 * @ADMIN_ROUTES
 */
router.use(authController.restrictTo('admin'));
router.get('/getAllUsersProfile',profileController.getAllProfile);
module.exports = router;
