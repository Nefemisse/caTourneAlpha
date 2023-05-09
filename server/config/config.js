require('dotenv').config()

module.exports = {
  "development": {
    "username": "root",
    "password": "iscomborch16",
    "database": process.env.DB_DEV,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "iscomborch16",
    "database": process.env.DB_TEST,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "iscomborch16",
    "database": process.env.DB_PROD,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}
