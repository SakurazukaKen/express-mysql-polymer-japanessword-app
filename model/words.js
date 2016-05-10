var mysql = require('mysql2-promise') ();
var dbconfig = require('./config');
mysql.configure(dbconfig.connection);
module.exports = {
  add: function(input) {
    var word = input;
    return mysql.query("INSERT INTO word(kana, kanji, trans, lid) VALUE (?, ?, ?, ?)", [word.kana, word.kanji, word.trans, word.lid])
    .then(function(data) {
      word.id = data[0].insertId;
      return word;
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  update: function(input) {
    var word = input;
    return mysql.query("UPDATE word SET kana = ?, kanji = ?, trans = ? WHERE id = ?", [word.kana, word.kanji, word.trans, word.id])
    .then(function(data) {
      return word;
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  remove: function(id) {
    return mysql.query("DELETE FROM word WHERE id = ?", [id])
    .then(function(data) {
      return true;
    }, function(err) {
      console.log(err);
      return false;
    });
  },
  getAllByLid: function(lid) {
    return mysql.query("SELECT * FROM word WHERE lid = ?", [lid])
    .then(function(data) {
      return data[0];
    }, function(err) {
      console.log(err);
      return false;
    });
  }
}