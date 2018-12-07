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

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/join.html'))
});

router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;

    var sql = {email : email, name : name, pw : passwd};
    var query = connection.query('insert into node set?', sql ,function(err, rows){
        if(err) throw err;
        // console.log("db insert", rows)
        res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
    })
})


module.exports = router;