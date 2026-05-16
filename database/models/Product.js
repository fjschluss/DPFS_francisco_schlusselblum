// database/models/Product.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category'
            });
            Product.belongsTo(models.Brand, {
                foreignKey: 'brandId',
                as: 'brand'
            });
        }
    }

    Product.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(300),
            allowNull: false,
            defaultValue: '/images/placeholder.jpg',
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        brandId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
    });

    return Product;
};