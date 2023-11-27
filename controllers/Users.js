import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'nip', 'email', 'address', 'phone', 'instansiId', 'RoleId', 'divisionId', 'picture', 'verified', 'status'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createUser = async (req, res) => {
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    }
    function isNumericNIP(nip) {
        const numericNIPRegex = /^[0-9]+$/;
        return numericNIPRegex.test(nip);
    }
    const { name, nip, email, instansiId, RoleId, divisionId, password, confPassword } = req.body;
    if (!nip) {
        return res.status(400).json({ msg: "NIP harus diisi" });
    } else if (!isNumericNIP(nip)) {
        return res.status(400).json({ msg: "NIP harus angka" });
    } else if (nip.length < 18) {
        return res.status(400).json({ msg: "NIP minimal 18 karakter" });
    } else if (nip.length > 18) {
        return res.status(400).json({ msg: "NIP maksimal 18 karakter" });
    }
    if (!name) {
        return res.status(400).json({ msg: "Nama harus diisi" });
    } else if (name.length > 50) {
        return res.status(400).json({ msg: "Nama melebihi batas karakter" });
    }
    if (!email) {
        return res.status(400).json({ msg: "Email harus diisi" });
    } else if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Format email tidak valid" });
    }
    if (!instansiId) {
        return res.status(400).json({ msg: "Instansi harus dipilih" });
    }
    if (!password) {
        return res.status(400).json({ msg: "Password harus diisi" });
    } else if (password.length < 8) {
        return res.status(400).json({ msg: "Password minimal 8 karakter kombinasi huruf kecil, huruf besar, dan simbol" });
    } else if (!isValidPassword(password)) {
        return res.status(400).json({ msg: "Password harus memiliki kombinasi huruf kecil, huruf besar, dan simbol" });
    }
    if (!confPassword) {
        return res.status(400).json({ msg: "Konfirmasi Password harus diisi." });
    } else if (confPassword.length < 8) {
        return res.status(400).json({ msg: "Konfirmasi Password minimal 8 karakter" });
    }
    if (password !== confPassword)
        return res.status(400).json({ msg: "Password dan Konfirmasi Password harus sama" });
    const hashPassword = await argon2.hash(password);
    if (!RoleId) {
        return res.status(400).json({ msg: "Role harus dipilih." });
    }
    try {
        await User.create({
            name: name,
            nip: nip,
            email: email,
            instansiId: instansiId,
            RoleId: RoleId,
            divisionId: divisionId,
            password: hashPassword,
        });
        res.status(201).json({ msg: "Pendaftaran Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan." })
    const { name, nip, email, instansiId, RoleId, divisionId, password, confPassword } = req.body;
    let hashPassword;

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    }
    function isNumericNIP(nip) {
        const numericNIPRegex = /^[0-9]+$/;
        return numericNIPRegex.test(nip);
    }

    if (!nip) {
        return res.status(400).json({ msg: "NIP harus diisi" });
    } else if (!isNumericNIP(nip)) {
        return res.status(400).json({ msg: "NIP harus angka" });
    } else if (nip.length < 18) {
        return res.status(400).json({ msg: "NIP minimal 18 karakter" });
    } else if (nip.length > 18) {
        return res.status(400).json({ msg: "NIP maksimal 18 karakter" });
    }
    if (!name) {
        return res.status(400).json({ msg: "Nama harus diisi" });
    } else if (name.length > 50) {
        return res.status(400).json({ msg: "Nama melebihi batas karakter" });
    }
    if (!email) {
        return res.status(400).json({ msg: "Email harus diisi" });
    } else if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Format email tidak valid" });
    }
    if (!instansiId) {
        return res.status(400).json({ msg: "Instansi harus dipilih" });
    }
    if (!password || password === "") {
        hashPassword = user.password
    } else {
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password minimal 8 karakter kombinasi huruf kecil, huruf besar, dan simbol" });
        } else if (!isValidPassword(password)) {
            return res.status(400).json({ msg: "Password harus memiliki kombinasi huruf kecil, huruf besar, dan simbol" });
        }
        if (confPassword.length < 8) {
            return res.status(400).json({ msg: "Konfirmasi Password minimal 8 karakter" });
        }
        if (password !== confPassword)
            return res.status(400).json({ msg: "Password dan Confirm Password tidak sama" });
        hashPassword = await argon2.hash(password);
    }
    try {
        await User.update({
            name: name,
            nip: nip,
            email: email,
            instansiId: instansiId,
            RoleId: RoleId,
            divisionId: divisionId,
            password: hashPassword,
        }, {
            where: {
                id: user.id
            }
        });
        res.status(201).json({ msg: "Update Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan." })
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(201).json({ msg: "Hapus Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}