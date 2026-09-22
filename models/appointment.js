/* =====================================
   AI DOCTOR SYSTEM - APPOINTMENT MODEL
   Database Layer (MySQL Queries)
===================================== */

const db = require("../config/db");

/* =========================
   BOOK APPOINTMENT
========================= */
const bookAppointment = (appointment, callback) => {

    const sql = `
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            date,
            time,
            symptoms,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        appointment.patient_id,
        appointment.doctor_id,
        appointment.date,
        appointment.time,
        appointment.symptoms || "",
        appointment.status || "Pending"
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("❌ Book Appointment DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET ALL APPOINTMENTS
========================= */
const getAllAppointments = (callback) => {

    const sql = `
        SELECT *
        FROM appointments
        ORDER BY date DESC, time DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log("❌ Get Appointments DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET APPOINTMENTS BY PATIENT
========================= */
const getAppointmentsByPatient = (patientId, callback) => {

    const sql = `
        SELECT *
        FROM appointments
        WHERE patient_id = ?
        ORDER BY date DESC, time DESC
    `;

    db.query(sql, [patientId], (err, result) => {

        if (err) {

            console.log("❌ Patient Appointment DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   GET APPOINTMENTS BY DOCTOR
========================= */
const getAppointmentsByDoctor = (doctorId, callback) => {

    const sql = `
        SELECT *
        FROM appointments
        WHERE doctor_id = ?
        ORDER BY date DESC, time DESC
    `;

    db.query(sql, [doctorId], (err, result) => {

        if (err) {

            console.log("❌ Doctor Appointment DB Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   UPDATE APPOINTMENT STATUS
   (Pending / Completed / Cancelled)
========================= */
const updateAppointmentStatus = (id, status, callback) => {

    const sql = `
        UPDATE appointments
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {

            console.log("❌ Update Appointment Status Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   DELETE APPOINTMENT
========================= */
const deleteAppointment = (id, callback) => {

    const sql = `
        DELETE FROM appointments
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log("❌ Delete Appointment Error:", err);

            return callback(err, null);
        }

        return callback(null, result);

    });

};

/* =========================
   EXPORT MODEL
========================= */
module.exports = {
    bookAppointment,
    getAllAppointments,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    updateAppointmentStatus,
    deleteAppointment
};