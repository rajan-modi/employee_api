var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var db = require('../config/db');

router.get('/', function (req, res) {
    res.send('{"200" : "OK"}');
    res.end();
})

router.get('/employees', function (req, res) {
  var emp_no = req.query.emp_no;
  console.log(emp_no);
  var find_employee = 'SELECT * FROM `employees` limit 10';
  db.query(find_employee, function (error, rows, fields) {
    if (error) { res.status(500).json({"status_code": 500, "status_message": "Internal server error"}); }
    res.send(JSON.stringify(rows));
    res.end();
  });
})

router.get('/employee/:emp_no', function (req, res) {
  var emp_no = req.params.emp_no;
  var find_employee = 'SELECT * FROM `employees` WHERE `emp_no` = ?';
  db.query(find_employee, [emp_no], function(error, rows, fields){
    if (error) { res.status(500).json({"status_code": 500, "status_message": "Internal server error"}); }
    res.send(JSON.stringify(rows));
    res.end();
  });
})

module.exports = router;
