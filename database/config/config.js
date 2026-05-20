// database/config/config.js
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || null,
        database: process.env.DB_NAME || 'lubo_db',
        host:     process.env.DB_HOST || '127.0.0.1',
        dialect:  'mysql',
        timezone: '-03:00',
        define: {
            timestamps: true,
            underscored: false,
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host:     process.env.DB_HOST,
        dialect:  'mysql',
    }
};