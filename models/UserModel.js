import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Instansi from "./InstansiModel.js";
import Role from "./RoleModel.js";
import Divisi from "./DivisionModel.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    nip: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [18, 18],
            isNumeric: true
        }
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    instansiId: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    RoleId: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    divisionId: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
    },
    picture: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    verified: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0',
    },
}, {
    freezeTableName: true
});

Instansi.hasMany(Users);
Users.belongsTo(Instansi, { foreignKey: 'instansiId' });

Role.hasMany(Users);
Users.belongsTo(Role, { foreignKey: 'RoleId' });

Divisi.hasMany(Users);
Users.belongsTo(Divisi, { foreignKey: 'divisionId' });

export default Users;