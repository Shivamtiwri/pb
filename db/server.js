const mysql = require("mysql");

const con = mysql.createConnection({
  // host: "localhost",
  // user: "fnnodeapi", // Replace with your MySQL username
  // password: "Km)sP$_VKz-P", // Replace with your MySQL password
  // database: "fnnodeapi",
  // port: 3306,
  user: "root",
  host: "localhost",
  password: "",
  database: "sachinproject",
  port: 3308,
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
