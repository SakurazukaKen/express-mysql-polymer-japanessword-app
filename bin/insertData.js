var mysql = require('mysql2-promise') ();
var lessons = require('./data').lessons;
var lessonModel = require('../model/lesson');
var wordModel = require("../model/words");
var dbconfig = require('../model/config');
mysql.configure(dbconfig.connection);

lessons.forEach(function(lesson) {
  var id = 0;
  lessonModel.add({book: '标日初级上', chapter: Math.ceil(lesson.lesson / 4), lesson: lesson.lesson})
  .then(function(data) {
    id = data.id;
    console.log('start ' + id);
    addNew(lesson, id);
  })
})
function addNew(lesson, input) {
  if(lesson.wordList.length > 0) {
  var word = lesson.wordList.shift();
  var id = input;
  wordModel.add({kana: word.hana, kanji: word.kanji, type: word.type, trans: word.trans, lid: id})
  .then(function(data) {
    console.log("add " + data.id);
    addNew(lesson, id);
  })
  } else if (lesson.specList.length > 0) {
    var word = lesson.specList.shift();
  var id = input;
  wordModel.add({kana: word.hana, kanji: word.kanji, type: 'sp', trans: word.trans, lid: id})
  .then(function(data) {
    console.log("add " + data.id);
    addNew(lesson, id);
  })
  } else {
    console.log("finish class " + input);
  }
}