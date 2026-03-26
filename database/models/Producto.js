module.exports = (sequelize, DataTypes) => {

    const Producto = sequelize.define("Producto", {
        id_productos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        precio: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING
        },
        id_categorias: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_brands: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "productos",
        timestamps: true,
        underscored: true
    });

    Producto.associate = (models) => {

        Producto.belongsTo(models.Categoria, {
            foreignKey: "id_categorias",
            as: "categoria"
        });

        Producto.belongsTo(models.Brand, {
            foreignKey: "id_brands",
            as: "brand"
        });

    };

    return Producto;
};