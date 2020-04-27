const chalk = require('chalk');

const createDatabaseConnection = require('../db');
const config = require('./config');

async function flush() {
  let client = null;
  try {
    client = await createDatabaseConnection();
    const db = client.db(config.database.name);
    await dropCollection(db);
    console.log(chalk.yellow('Database dropped'));
    client.close();
  } catch (error) {
    client && client.close();
    const nothingToDrop = error.message === 'ns not found';
    if (nothingToDrop) {
      console.log(chalk.yellow('Nothing to drop'));
      return;
    } else {
      throw error;
    }
  }
}

async function dropCollection(db) {
  await db.collection('articles').drop();
}

module.exports = flush;
