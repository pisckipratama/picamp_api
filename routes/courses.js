const express = require('express');
const { getCourses, getSingleCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses.controller');
const Courses = require('../models/Course');
const advancedResult = require('../middleware/advancedResult');
const { protects } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(advancedResult(Courses, {
    path: 'bootcamp',
    select: 'name description'
  }), getCourses)
  .post(protects, createCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .put(protects, updateCourse)
  .delete(protects, deleteCourse);

module.exports = router;