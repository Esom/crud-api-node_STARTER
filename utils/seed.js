const promisify = require('util').promisify;
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const createDatabaseConnection = require('../db');
const config = require('./config');

async function seed({test}) {
  const dataPath = path.resolve(process.cwd(), test ? './testData.json' : './data.json');
  const promisifiedFsReadFile = promisify(fs.readFile);

  const rawData = await promisifiedFsReadFile(dataPath, 'UTF-8');
  const data = rawData
    .trim()
    .split(/\r?\n/)
    .map((d) => JSON.parse(d));
  
  let client = null
  try {
    client = await createDatabaseConnection();
    const db = client.db(config.database.name);
    await insertDocuments(db, data);
    console.log(chalk.green('Database seeded'));
    client.close();
  } catch (error) {
    client && client.close();
    throw error;
  }
}

async function insertDocuments(db, chunk) {
  await db.collection('articles').insertMany(chunk);
}

module.exports = seed;
