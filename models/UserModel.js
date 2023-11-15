import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: null,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: null,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: null,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: null,
        validate: {
            notEmpty: true,
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: null,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});

export default Users;