const mysql = require('mysql2');

const connect = mysql.createConnection(
    {
      port: 3001,
      host: 'localhost',
      user: 'root',
      password: 'skenne6793',
      database: 'employee tracker'
    },
    console.log(`Connected.`)
  );



  module.exports = connect