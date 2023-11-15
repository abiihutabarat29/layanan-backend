import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Instansi from "./InstansiModel.js";

const { DataTypes } = Sequelize;

const Division = db.define('division', {
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
    instansiId: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});

Instansi.hasMany(Division);
Division.belongsTo(Instansi, { foreignKey: 'instansiId' })

export default Division;