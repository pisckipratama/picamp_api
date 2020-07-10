const express = require('express');
const { getCourses, getSingleCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courses.controller');
const Courses = require('../models/Course');
const advancedResult = require('../middleware/advancedResult');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(advancedResult(Courses, {
    path: 'bootcamp',
    select: 'name description'
  }), getCourses)
  .post(createCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;