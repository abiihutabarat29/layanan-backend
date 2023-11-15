import Division from "../models/DivisionModel.js";
import Instansi from "../models/InstansiModel.js";

export const getDivision = async (req, res) => {
    try {
        let response;
        response = await Division.findAll({
            attributes: ['uuid', 'name'],
            include: [{
                model: Instansi,
                attributes: ['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getDivisionId = async (req, res) => {
    try {
        const division = await Division.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!division) return res.status(404).json({ msg: "Data tidak ditemukan" })
        let response;
        response = await Division.findOne({
            attributes: ['uuid', 'name'],
            where: {
                id: division.id
            },
            include: [{
                model: Instansi,
                attributes: ['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createDivision = async (req, res) => {
    const { name, instansiId } = req.body;
    try {
        await Division.create({
            name: name,
            instansiId: instansiId
        });
        res.status(201).json({ msg: "Divisi berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateDivision = async (req, res) => {
    try {
        const division = await Division.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!division) return res.status(404).json({ msg: "Data tidak ditemukan" })
        const { name, instansiId } = req.body;
        await division.update({
            name, instansiId
        }, {
            where: {
                id: division.id
            }
        });
        res.status(200).json({ msg: "Divisi berhasil diupdate" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteDivision = async (req, res) => {
    try {
        const division = await Division.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!division) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await Division.destroy({
            where: {
                id: division.id
            }
        })
        res.status(200).json({ msg: "Divisi berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}