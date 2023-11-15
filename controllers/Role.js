import Role from "../models/RoleModel.js";

export const getRole = async (req, res) => {
    try {
        let response;
        response = await Role.findAll({
            attributes: ['uuid', 'name'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getRoleId = async (req, res) => {
    try {
        const role = await Role.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!role) return res.status(404).json({ msg: "Data tidak ditemukan" })
        let response;
        response = await Role.findOne({
            attributes: ['uuid', 'name'],
            where: {
                id: role.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createRole = async (req, res) => {
    const { name } = req.body;
    try {
        await Role.create({
            name: name,
        });
        res.status(201).json({ msg: "Role berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateRole = async (req, res) => {
    try {
        const role = await Role.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!role) return res.status(404).json({ msg: "Data tidak ditemukan" })
        const { name } = req.body;
        await role.update({
            name
        }, {
            where: {
                id: role.id
            }
        });
        res.status(200).json({ msg: "Role berhasil diupdate" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!role) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await Role.destroy({
            where: {
                id: role.id
            }
        })
        res.status(200).json({ msg: "Role berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}