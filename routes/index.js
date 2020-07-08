var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index')

router.get('/', IndexController.getList)
router.get('/add', IndexController.add)

module.exports = router;
