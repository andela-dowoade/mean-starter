const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const lodash = require('lodash');

const env = process.env.NODE_ENV || 'development';

const db = {};

const options = {
  logging: false,
  dialect: 'postgres',
};

if (env === 'production') {
  options.dialectOptions = {
    ssl: true,
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, options);

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) && (file !== 'index.js')
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize,
  Sequelize,
}, db);
