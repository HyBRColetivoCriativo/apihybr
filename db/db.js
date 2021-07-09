const mysql = require('mysql2')


//////////////// ////////////////////////////////////////////// LOCALHOST JULIO

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1Telesapiens@best',
//     database: 'DBTelesapiens',
//     port: "3306"
// })

//////////////// ////////////////////////////////////////////// LOCALHOST MAYKE
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Codebase1@1',
//     database: 'dbhybr',
//     port: "3306"
// }) 

//////////////// ////////////////////////////////////////////// HOSTGATOR JULIO
// const db = mysql.createConnection({
//     host: '50.116.87.155',
//     user: 'hybrcc04_julio',
//     password: '1Database2best',
//     database: 'hybrcc04_DBTelesapiens',
//     port: "3306"
// })


//////////////// ////////////////////////////////////////////// HOSTGATOR MAYKE
// const db = mysql.createConnection({
//     host: '50.116.87.155',
//     user: 'hybrcc04_mayke',
//     password: '1Banco2best',
//     database: 'hybrcc04_MovEDU',
//     port: "3306"
// })

//////////////// ////////////////////////////////////////////// AMAZON AWS ADMIN
const db = mysql.createConnection({
    host: 'dbtelesapiens.c6kmbmsyde4v.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '1Database2best',
    database: 'DBTelesapiens',
    port: "3306"
})



db.connect(() => {
    console.log('server mysql running...')
});


module.exports = db;