const mongoose = require('mongoose');

const {
  MONGO_URL,
  DB_NAME,
} = require('../config/config');

const databaseConnection = () => {
  mongoose.connect(MONGO_URL, { dbName: DB_NAME })
    .then(() => {
      console.log('Successfully connected with MongoDB');
    })
    .catch((err) => {
      console.error(`Error occurred while connected with database: ${err}`);
    });
}

module.exports = databaseConnection;
