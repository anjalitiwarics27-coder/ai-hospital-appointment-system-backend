/* =====================================
   AI DOCTOR SYSTEM - USER MODEL
   Database Layer (MySQL Queries)
===================================== */

const db = require("../config/db");

/* =========================
   CREATE USER (SIGNUP)
========================= */
const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users
        (
            name,
            email,
            password,
            role
        )
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        user.name,
        user.email,
        user.password,
        user.role
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("❌ DB ERROR (createUser):", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   FIND USER BY EMAIL
========================= */
const findUserByEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], (err, result) => {

        if (err) {

            console.log("❌ DB ERROR (findUserByEmail):", err);

            return callback(err, null);
        }

        /* =========================
           SAFE CHECK
        ========================= */
        if (!result || result.length === 0) {

            return callback(null, null);
        }

        return callback(null, result[0]);

    });

};

/* =========================
   GET ALL USERS
========================= */
const getAllUsers = (callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            role
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("❌ DB ERROR (getAllUsers):", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET USERS BY ROLE
========================= */
const getUsersByRole = (role, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            role
        FROM users
        WHERE role = ?
        ORDER BY id DESC
    `;

    db.query(sql, [role], (err, result) => {

        if (err) {

            console.log("❌ DB ERROR (getUsersByRole):", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET USER BY ID
========================= */
const getUserById = (id, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            role
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ DB ERROR (getUserById):", err);

            return callback(err, null);
        }

        if (!result || result.length === 0) {

            return callback(null, null);
        }

        return callback(null, result[0]);

    });

};

/* =========================
   DELETE USER
========================= */
const deleteUser = (id, callback) => {

    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ DB ERROR (deleteUser):", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   EXPORT FUNCTIONS
========================= */
module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers,
    getUsersByRole,
    getUserById,
    deleteUser
};