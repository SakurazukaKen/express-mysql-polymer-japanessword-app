var express = require('express');
var lesson = require('../model/lesson');
var words = require('../model/words');
var router = express.Router();

/* GET home page. */
router.get('/lessons', function(req, res, next) {
  lesson.getAll().then(function(data) {
    if (data) {
      res.json(data);
    }else {
      res.json(false);
    }
  })
});
router.post('/lesson', function(req, res, next) {
  lesson.add(req.body.form).then((data)=>{
    if(data) {
      res.json(data);
    } else {
      res.json(false);
    }
  })
});
router.get('/words/:id', function(req, res, next) {
  var result = {};
  lesson.getById(req.params.id).then(function(data) {
    if (data) {
      result.lesson = data;
      return words.getAllByLid(data.id);
    }else {
      return false;
    }
  })
  .then(function(data) {
    if(data) {
      result.words = data;
      res.json(result);
    } else {
      res.json(false);
    }
  })
});
module.exports = router;