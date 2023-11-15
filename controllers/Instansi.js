import Instansi from "../models/InstansiModel.js";

export const getInstansi = async (req, res) => {
    try {
        let response;
        response = await Instansi.findAll({
            attributes: ['uuid', 'name'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getInstansiId = async (req, res) => {
    try {
        const instansi = await Instansi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!instansi) return res.status(404).json({ msg: "Data tidak ditemukan" })
        let response;
        response = await Instansi.findOne({
            attributes: ['uuid', 'name'],
            where: {
                id: instansi.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createInstansi = async (req, res) => {
    const { name } = req.body;
    try {
        await Instansi.create({
            name: name,
        });
        res.status(201).json({ msg: "Instansi berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateInstansi = async (req, res) => {
    try {
        const instansi = await Instansi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!instansi) return res.status(404).json({ msg: "Data tidak ditemukan" })
        const { name, price } = req.body;
        await Instansi.update({
            name
        }, {
            where: {
                id: instansi.id
            }
        });
        res.status(200).json({ msg: "Instansi berhasil diupdate" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteInstansi = async (req, res) => {
    try {
        const instansi = await Instansi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!instansi) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await Instansi.destroy({
            where: {
                id: instansi.id
            }
        })
        res.status(200).json({ msg: "Instansi berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}