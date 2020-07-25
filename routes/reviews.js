const express = require('express');

const {
  getReviews,
  getReview,
  addReview,
} = require('../controllers/reviews.controller');
const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResult');
const { protects, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protects, authorize('user', 'admin'), addReview);

router.route('/:id').get(getReview);

module.exports = router;
