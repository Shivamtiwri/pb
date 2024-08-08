const mysql = require("mysql");

const con = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
  user: "sql5724705", // Replace with your MySQL username
  password: "fwZK9px9WA", // Replace with your MySQL password
  database: "sql5724705",
  port: 3306,
  //   user: "root",
  //   host: "localhost",
  //   password: "",
  //   database: "sachinproject",
  //   port: 3308,
});

function connectionDb() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

module.exports = {
  connectionDb,
  con,
  query: con.query.bind(con), // Bind query method to connection
};
