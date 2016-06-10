var mysql = require('mysql2-promise')();
var dbconfig = require('./config');
mysql.configure(dbconfig.connection);
module.exports = {
  getId: (input) => {
    var record = input;
    return mysql.query("SELECT R.id FROM record R WHERE R.uid = ? AND R.wid = ?", [record.uid, record.wid])
      .then(function(data) {
        if (data[0].length == 0) {
          return mysql.query("INSERT INTO record(wid, uid, total_record) VALUE (?, ?, ?)", [record.wid, record.uid, 0])
            .then(function(data) {
              return data[0].insertId;
            });
        } else {
          return data[0][0].id;
        }
      })
      .catch(function(err) {
        console.log(err);
        return false;
      });
  },
  add: (input) => {
    var record = input;
    return mysql.query("UPDATE record SET total_record = total_record + 1 WHERE id = ?", [input.id])
    .then(function(data) {
      return data[0];
    }, function(err)  {
      console.log(err);
      return false;
    })
  },
  getByLessonAndUser: (input) => {
    var param = input;
    return mysql.query("select * from word as w left join record as r on w.id = r.wid and r.uid = ? where w.lid = ? order by total_record", [param.uid, param.lid])
    .then((data) => {
      if(data[0].length > 0) {
        return data[0];
      } else {
        return false;
      }
    }, (err) => {
      console.log(err);
      return false;
    })
  }
}
