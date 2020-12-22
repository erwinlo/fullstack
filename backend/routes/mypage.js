var express = require('express');
var router = express.Router();

var mystr = 'I am sending this DATA from backend to Frontend';

router.get('/', (req, res, next) => {
    res.send(mystr);
});

module.exports = router;