const express = require('express');
const { getCourses, getSingleCourse, createCourse } = require('../controllers/courses.controller');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getCourses)
  .post(createCourse);

router
  .route('/:id')
  .get(getSingleCourse);

module.exports = router;