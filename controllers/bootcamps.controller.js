const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorHandler = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../helpers/geocoder');

// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // field to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // loop over removefield and delete from req.query
  removeFields.forEach(param => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // executing query
  const bootcamps = await query;

  // pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res
    .status(200)
    .json({
      success: true,
      count: bootcamps.length,
      pagination,
      data: bootcamps
    });
});

// @desc    Get Bootcamp 
// @route   GET /api/v1/bootcamps/:id
// @access  Public
const getSingleBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));
  res.status(200).json({ success: true, message: `show bootcamps ${req.params.id}`, data: bootcamp });
});

// @desc    Create Bootcamp 
// @route   POST /api/v1/bootcamps
// @access  Public
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, message: "create bootcamp success", data: bootcamp });
});

// @desc    Update Bootcamp 
// @route   PUT /api/v1/bootcamps
// @access  Public
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));
  res.status(200).json({ success: true, message: `update bootcamps ${req.params.id}`, data: bootcamp });
});

// @desc    Delete Bootcamp 
// @route   DELETE /api/v1/bootcamps
// @access  Public
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));
  bootcamp.remove();
  res.json({ success: true, message: `delete bootcamps ${req.params.id}`, data: {} });
});

// @desc    Get Bootcamp by radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Public
const getBootcampsRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat / lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians
  // divide dist by radius of earth
  // earth radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc    Upload photo for Bootcamp 
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private
const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));

  if (!req.files) {
    return next(new ErrorHandler(`Please upload an image file`, 400));
  }
  console.log(req.files);

  const file = req.files.file;

  // make sure the image photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorHandler(`Please upload an image file`, 400));
  }

  // check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorHandler(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorHandler(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
  });

  res.status(200).json({ success: true, data: file.name });
});

module.exports = {
  getBootcamps,
  getSingleBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
  getBootcampsRadius,
  bootcampPhotoUpload,
};