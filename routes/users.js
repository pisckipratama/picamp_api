const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResult = require('../middleware/advancedResult');
const { protects, authorize } = require('../middleware/auth');

router.use(protects);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResult(User), getUsers)
  .post(createUser);


router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;