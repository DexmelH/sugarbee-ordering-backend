var express = require("express");
var router=express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sugarbee"
});

router.get("/", function(req, res, next){
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM orders", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

module.exports=router;