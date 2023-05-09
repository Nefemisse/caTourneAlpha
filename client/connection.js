const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  user: "thomas",
  password: "iscomborch16",
  database: "database_development_caTourne",
  host: "127.0.0.1",
});

// Connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = db;
