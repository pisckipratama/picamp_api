const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorHandler = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get Courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
const getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResult);
  }
});

// @desc    Get Single Course
// @route   GET /api/v1/courses/:id
// @access  Public
const getSingleCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course)
    return next(
      new ErrorHandler(`No resource with the id of ${req.params.id}`, 404)
    );

  res.status(200).json({ success: true, data: course });
});

// @desc    Add Course
// @route   POST /api/v1/bootcamp/:bootcampId/course
// @access  Private
const createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp)
    return next(
      new ErrorHandler(
        `No resource with the id of '${req.params.bootcampId}'`,
        404
      )
    );

  // make sure is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorHandler(
        `User ${req.user.id} is not authorized to add a course to ${bootcamp._id}`,
        401
      )
    );
  }

  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});

// @desc    Update Course
// @route   PUT /api/v1/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course)
    return next(
      new ErrorHandler(`No resource with the id of '${req.params.id}'`, 404)
    );

  // make sure is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorHandler(
        `User ${req.user.id} is not authorized to update a course`,
        401
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: course });
});

// @desc    Delete Course
// @route   DELETE /api/v1/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    return next(
      new ErrorHandler(`No resource with the id of '${req.params.id}'`, 404)
    );

  // make sure is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorHandler(
        `User ${req.user.id} is not authorized to delete a course`,
        401
      )
    );
  }

  await course.remove();
  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
