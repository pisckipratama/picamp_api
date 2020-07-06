const Bootcamp = require('../models/Bootcamp');
const ErrorHandler = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({ success: true, message: "show all bootcamps", count: bootcamps.length, data: bootcamps });
});

/**
 * @desc    Get Bootcamp 
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
const getSingleBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));
  res.status(200).json({ success: true, message: `show bootcamps ${req.params.id}`, data: bootcamp });
});

/**
 * @desc    Create Bootcamp 
 * @route   POST /api/v1/bootcamps
 * @access  Public
 */
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, message: "create bootcamp success", data: bootcamp });
});

/**
 * @desc    Update Bootcamp 
 * @route   PUT /api/v1/bootcamps
 * @access  Public
 */
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));
  res.status(200).json({ success: true, message: `update bootcamps ${req.params.id}`, data: bootcamp });
});

/**
 * @desc    Delete Bootcamp 
 * @route   DELETE /api/v1/bootcamps
 * @access  Public
 */
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));
  res.json({ success: true, message: `delete bootcamps ${req.params.id}`, data: {} });
});

module.exports = {
  getBootcamps,
  getSingleBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp
};