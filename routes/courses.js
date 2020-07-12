const express = require('express');
const { getCourses, getSingleCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses.controller');
const Courses = require('../models/Course');
const advancedResult = require('../middleware/advancedResult');
const { protects, authorize } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(advancedResult(Courses, {
    path: 'bootcamp',
    select: 'name description'
  }), getCourses)
  .post(protects, authorize('publisher', 'admin'), createCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .put(protects, authorize('publisher', 'admin'), updateCourse)
  .delete(protects, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;