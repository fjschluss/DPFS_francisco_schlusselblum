module.exports = (sequelize, DataTypes) => {

    const Usuario = sequelize.define("Usuario", {
        id_usuarios: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(50),
            defaultValue: "user"
        },
        avatar: {
            type: DataTypes.STRING
        }
    }, {
        tableName: "usuarios",
        timestamps: true,
        underscored: true
    });

    return Usuario;
};