var mysql = require('mysql2-promise') ();
var dbconfig = require('./config');
var _ = require('lodash');
mysql.configure(dbconfig.connection);
module.exports = {
  add: function(input) {
    var lesson = input;
    return mysql.query("INSERT INTO lesson(chapter, lesson, book) VALUE (?, ?, ?)", [lesson.chapter, lesson.lesson, lesson.book])
    .then(function(data) {
      lesson.id = data[0].insertId;
      return lesson;
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  update: function(input) {
    var lesson = input;
    return mysql.query("UPDATE lesson SET chapter = ?, lesson = ?, book = ? WHERE id = ?", [lesson.chapter, lesson.lesson, lesson.book, lesson.id])
    .then(function(data) {
      return lesson;
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  remove: function(id) {
    return mysql.query("DELETE FROM word WHERE lid = ?", [id])
    .then(function(data) {
      return mysql.query("DELETE FROM lesson WHERE id = ?", [id]);
    })
    .then(function(data) {
      return true;
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  getAll: function() {
    return mysql.query("SELECT * FROM lesson")
    .then(function(data) {
      return data[0];
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  getById: function(id) {
    return mysql.query("SELECT * FROM lesson WHERE id = ?", [id])
    .then(function(data) {
      return data[0][0];
    }, function(err) {
      console.log(err);
      return false;
    });
  }
}