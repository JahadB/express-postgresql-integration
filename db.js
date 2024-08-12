const {Pool} = require('pg');
const config = require('./config');
const { query, text } = require('express');

const pool = new Pool(config);

module.exports = {
    query: (text, params) => pool.query(text, params),
};
