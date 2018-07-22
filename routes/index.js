    var express = require('express');
    var mysql = require('mysql');
    var router = express.Router();
    var db = require('../config/db');
    const paginate = require('express-paginate');

    var pagination = require('pagination');

    var total_employees;

    router.get('/', function (req, res) {
        res.send('{"200" : "OK"}');
        res.end();
    })

    router.get('/employee/:id', function (req, res) {
      var emp_no = req.params.id;
      console.log(emp_no);
      var find_employee = 'SELECT * FROM `employee` WHERE `emp_no` = ?';
      db.query(find_employee, [emp_no], function(error, rows, fields){
        if (error) { res.status(500).json({"status_code": 500, "status_message": "Internal server error"}); }
        res.send(JSON.stringify(rows));
        res.end();
      });
    })

    router.put('/employee/:id', function (req, res) {
        var emp_no = req.params.id;
        var first_name = req.body.FirstName;
        var last_name = req.body.LastName;
        //console.log(emp_no+first_name+last_name);
        var update_employee = 'UPDATE `employee` SET `first_name`=?,`last_name`=? WHERE `emp_no` = ?;';
        db.query(update_employee, [first_name,last_name,emp_no], function(error, result, fields){
        if (error) {
            console.log(error);
            res.status(500).json({"status_code": 500, "status_message": "Internal server error"}); }
            if(result.changedRows === 0)
            {
            console.log("Total rows deleted "+result.affectedRows);
            }
            res.send(JSON.stringify("Success"));
            res.end();
        });
    })

    router.post('/employee', function (req, res) {
        console.log(req.body);
        var emp_no = req.body.emp_no;
        var first_name = req.body.FirstName;
        var last_name = req.body.LastName;
        console.log(req.body.FirstName);
        var insert_employee = 'INSERT INTO `employee` (`first_name`,`last_name`) VALUES(?,?)';
        db.query(insert_employee, [first_name,last_name], function(error, result, fields){
          if (error) {
          console.log(error);
          res.status(500).json({"status_code": 500, "status_message": "Internal server error"}); }
          console.log("1 record inserted, ID: " + result.insertId);
          res.send(JSON.stringify(result.insertId));
          res.end();
        });
      })

    router.delete('/employee/:id', function (req, res) {
            var emp_no = req.params.id;
            console.log("ID to be deleted "+req.params.id);
            var delete_employee = 'DELETE FROM `employee` WHERE `emp_no` = ?';
            db.query(delete_employee, [emp_no], function(error, result, fields){
              if (error) {
              res.status(500).json({"status_code": 500, "status_message": "Internal server error"}); }
              if(result.changedRows === 0){
                console.log("Total rows deleted "+result.affectedRows);
              }
              res.send(JSON.stringify(result.deleteId));
              res.end();
            });
          })

    router.get('/employees/:page_no', function (req, res) {
          var page_no = req.params.page_no || 1;
          var page_size = 10;
          offset = (page_no-1) * page_size;
          console.log(page_no);

          db.query('SELECT count(*) AS total_employees FROM `employee`', function (error, result, fields) {
                      if (error)
                      {
                          res.status(500).json(
                              {
                                  "status_code": 500,
                                  "status_message": "Internal server error"
                              });
                      }
                      console.log(result[0].total_employees);
                      total_employees = result[0].total_employees;
                      console.log(total_employees);
                    });

          var find_employee = 'SELECT `emp_no`,`first_name`,`last_name` FROM `employee` ORDER BY `emp_no` limit ?,10';

          db.query(find_employee, [offset], function (error, rows, fields) {
            if (error)
            {
                res.status(500).json(
                    {
                        "status_code": 500,
                        "status_message": "Internal server error"
                    });
            }
            //res.send(JSON.stringify(rows));
            res.send(
                {
                    "total_employees": total_employees,
                    "employees_data": rows
                }
            );
            res.end();
          });
        })

    module.exports = router;

    //var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 5, totalResult: rows.length});
    //    var paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 10, totalResult: rows.length});
    //    console.log(paginator.render());
