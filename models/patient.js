/* =====================================
   AI DOCTOR SYSTEM - PATIENT MODEL
   Database Layer (MySQL Queries)
===================================== */

const db = require("../config/db");

/* =========================
   CREATE PATIENT PROFILE
========================= */
const createPatient = (patient, callback) => {

    const sql = `
        INSERT INTO patients
        (
            name,
            email,
            age,
            gender,
            password
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        patient.name,
        patient.email,
        patient.age || null,
        patient.gender || null,
        patient.password
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("❌ Create Patient DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET ALL PATIENTS
========================= */
const getAllPatients = (callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            age,
            gender
        FROM patients
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("❌ Get Patients DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   FIND PATIENT BY EMAIL
========================= */
const findPatientByEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM patients
        WHERE email = ?
    `;

    db.query(sql, [email], (err, result) => {

        if (err) {

            console.log("❌ Find Patient By Email Error:", err);

            return callback(err, null);
        }

        return callback(null, result[0]);

    });

};

/* =========================
   GET PATIENT BY ID
========================= */
const getPatientById = (id, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            age,
            gender
        FROM patients
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ Get Patient By ID Error:", err);

            return callback(err, null);
        }

        return callback(null, result[0]);

    });

};

/* =========================
   UPDATE PATIENT PROFILE
========================= */
const updatePatient = (id, data, callback) => {

    const sql = `
        UPDATE patients
        SET
            name = ?,
            email = ?,
            age = ?,
            gender = ?
        WHERE id = ?
    `;

    const values = [
        data.name,
        data.email,
        data.age || null,
        data.gender || null,
        id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("❌ Update Patient DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   DELETE PATIENT
========================= */
const deletePatient = (id, callback) => {

    const sql = `
        DELETE FROM patients
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ Delete Patient DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   EXPORT MODEL
========================= */
module.exports = {
    createPatient,
    getAllPatients,
    findPatientByEmail,
    getPatientById,
    updatePatient,
    deletePatient
};