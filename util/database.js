/* const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete' , 'root'  ,'nodecomplete' ,{dialect :'mysql' , host :'localhost'}); */


 const mysql = require("mysql2");

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    database : "node-complete",
    password : "Kraken_1223"
});

module.exports = pool.promise(); 