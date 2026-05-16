// database/config/config.js
module.exports = {
    development: {
        username: 'root',
        password: '2512Aika',       // ← reemplazar con tu contraseña local
        database: 'lubo_db',
        host: '127.0.0.1',
        dialect: 'mysql',
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
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
};