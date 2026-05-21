const { User } = require('../../database/models');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const apiUsersController = {

    list: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'createdAt']
            });
            res.json({
                count: users.length,
                users: users.map(u => ({
                    id:     u.id,
                    name:   `${u.firstName} ${u.lastName}`,
                    email:  u.email,
                    detail: `${BASE_URL}/api/users/${u.id}`
                }))
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    detail: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'createdAt', 'updatedAt']
            });
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
            res.json({
                id:        user.id,
                firstName: user.firstName,
                lastName:  user.lastName,
                email:     user.email,
                imageUrl:  `${BASE_URL}${user.image}`,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = apiUsersController;