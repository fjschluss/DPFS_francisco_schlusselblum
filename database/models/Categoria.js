module.exports = (sequelize, DataTypes) => {

    const Categoria = sequelize.define("Categoria", {
        id_categorias: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: "categorias",
        timestamps: false
    });

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Producto, {
            foreignKey: "id_categorias",
            as: "productos"
        });
    };

    return Categoria;
};