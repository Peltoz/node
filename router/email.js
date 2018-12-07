var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'tjdnjs12',
    database : 'node_db'
})

connection.connect()

router.post('/form', function(req, res){
    console.log(req.body.email)
    res.render('email.ejs', {'email' : req.body.email})
});

router.post('/ajax', function(req, res){
    var email = req.body.email;
    var responseData = {}

    var query = connection.query('select name from node where email="' + email + '"', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            responseData.result = "Ok";
            responseData.name = rows[0].name;
        }
        else{
            responseData.result = "none";
            responseData.name = "";
        }
        res.json(responseData)
    })
});

module.exports = router;