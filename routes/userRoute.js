

const express = require('express');
const { getData } = require('../controller/userController');
const router = express();


router.get('/data', getData)


module.exports = router