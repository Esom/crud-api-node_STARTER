const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.resolve(process.cwd(), '.test.env') });
} else {
  dotenv.config();
}

module.exports = {
  database: {
    connectionString: process.env.MONGO_DB_CONNECTION_STRING,
    name: process.env.MONGO_DB_DATABASE_NAME,
  },
};
