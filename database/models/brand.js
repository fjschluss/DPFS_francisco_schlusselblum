module.exports = (sequelize, DataTypes) => {

    const Brand = sequelize.define("Brand", {
        id_brands: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: "brands",
        timestamps: false
    });

    Brand.associate = (models) => {
        Brand.hasMany(models.Producto, {
            foreignKey: "id_brands",
            as: "productos"
        });
    };

    return Brand;
};