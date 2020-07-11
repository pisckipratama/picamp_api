const express = require('express');
const { getBootcamps, getSingleBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsRadius, bootcampPhotoUpload } = require('../controllers/bootcamps.controller');
const advancedResult = require('../middleware/advancedResult');
const { protects } = require('../middleware/auth');
const Bootcamp = require('../models/Bootcamp');
const router = express.Router();

// include other resource
const courseRouter = require('./courses');

// re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsRadius);

router.route('/:id/photo').put(protects, bootcampPhotoUpload);

router.route('/')
  .get(advancedResult(Bootcamp, 'courses'), getBootcamps)
  .post(protects, createBootcamp);

router.route('/:id')
  .get(getSingleBootcamp)
  .put(protects, updateBootcamp)
  .delete(protects, deleteBootcamp);

module.exports = router;