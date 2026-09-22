/* =====================================
   AI DOCTOR SYSTEM - DOCTOR MODEL
   Database Layer (MySQL Queries)
===================================== */

const db = require("../config/db");

/* =========================
   CREATE DOCTOR PROFILE
========================= */
const createDoctor = (doctor, callback) => {

    const sql = `
        INSERT INTO doctors
        (
            name,
            email,
            specialization,
            experience,
            password
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        doctor.name,
        doctor.email,
        doctor.specialization,
        doctor.experience || 0,
        doctor.password
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("❌ Create Doctor DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET ALL DOCTORS
========================= */
const getAllDoctors = (callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            specialization,
            experience
        FROM doctors
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("❌ Get Doctors DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   FIND DOCTOR BY EMAIL
========================= */
const findDoctorByEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM doctors
        WHERE email = ?
    `;

    db.query(sql, [email], (err, result) => {

        if (err) {

            console.log("❌ Find Doctor By Email Error:", err);

            return callback(err, null);
        }

        return callback(null, result[0]);

    });

};

/* =========================
   GET DOCTOR BY ID
========================= */
const getDoctorById = (id, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            specialization,
            experience
        FROM doctors
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ Get Doctor By ID Error:", err);

            return callback(err, null);
        }

        return callback(null, result[0]);

    });

};

/* =========================
   UPDATE DOCTOR PROFILE
========================= */
const updateDoctor = (id, data, callback) => {

    const sql = `
        UPDATE doctors
        SET
            name = ?,
            email = ?,
            specialization = ?,
            experience = ?
        WHERE id = ?
    `;

    const values = [
        data.name,
        data.email,
        data.specialization,
        data.experience || 0,
        id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("❌ Update Doctor DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   DELETE DOCTOR
========================= */
const deleteDoctor = (id, callback) => {

    const sql = `
        DELETE FROM doctors
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ Delete Doctor DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   EXPORT MODEL
========================= */
module.exports = {
    createDoctor,
    getAllDoctors,
    findDoctorByEmail,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};