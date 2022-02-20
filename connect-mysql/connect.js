const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      port: 3306,
      host: 'localhost',
      user: 'root',
      password: 'skenne6793',
      database: 'work'
    },
    console.log(`Connected.`)
  );

  // connection.connect(function(err) {
  //   if (err) {
  //     return console.error('error: ' + err.message);
  //   }
  
  //   console.log('Connected to the MySQL server.');
  // });
  


  module.exports = connection