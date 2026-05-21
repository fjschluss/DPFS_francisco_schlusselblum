'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            Brand.hasMany(models.Product, {
                foreignKey: 'brandId',
                as: 'products'
            });
        }
    }

    Brand.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Brand',
        tableName: 'brands',
        timestamps: true,
    });

    return Brand;
};