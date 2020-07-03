const express = require('express');
const { getBootcamps, getSingleBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps.controller');
const router = express.Router();

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;