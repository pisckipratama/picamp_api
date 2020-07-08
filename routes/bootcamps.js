const express = require('express');
const { getBootcamps, getSingleBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsRadius } = require('../controllers/bootcamps.controller');
const router = express.Router();

// include other resource
const courseRouter = require('./courses');

// re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsRadius);

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;