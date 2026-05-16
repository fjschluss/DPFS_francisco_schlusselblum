// database/models/User.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Relaciones futuras (ej: carrito) se agregan acá
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(300),
            allowNull: false,
            defaultValue: '/images/users/default.jpg',
        },
        category: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: false,
            defaultValue: 'cliente',
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    });

    return User;
};