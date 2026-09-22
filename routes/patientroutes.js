/* =====================================
   AI DOCTOR SYSTEM - PATIENT ROUTES
   API Layer (Patient) + SECURITY
===================================== */

const express = require("express");
const router = express.Router();

const db = require("../config/db"); // MySQL Connection

/* =========================
   CONTROLLER IMPORT
========================= */
const patientController = require("../controllers/patientController");

/* =========================
   MIDDLEWARE IMPORT
========================= */
const {
    verifyToken,
    patientOnly,
    doctorOnly
} = require("../middleware/authMiddleware");

/* =====================================
   🧑 MY DOCTORS + APPOINTMENTS
===================================== */
router.get(
    "/my-doctors/:patientId",
    verifyToken,
    patientOnly,
    (req, res) => {

        const patientId = req.params.patientId;

        const query = `
            SELECT 
                d.id AS doctorId,
                d.name,
                d.specialization,
                d.email,
                a.date,
                a.time,
                a.status,
                a.symptoms,
                a.created_at
            FROM appointments a
            INNER JOIN doctors d ON a.doctor_id = d.id
            WHERE a.patient_id = ?
            ORDER BY a.date DESC
        `;

        db.query(query, [patientId], (err, result) => {

            if (err) {

                console.log("❌ My Doctors Query Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Database error ❌",
                    error: err
                });
            }

            return res.json({
                success: true,
                data: result
            });
        });
    }
);

/* =====================================
   🧑 PATIENT CRUD APIs (SECURE)
===================================== */

/* =========================
   GET ALL PATIENTS (DOCTOR ONLY)
========================= */
router.get(
    "/",
    verifyToken,
    doctorOnly,
    patientController.getAllPatients
);

/* =========================
   GET PATIENT BY ID
========================= */
router.get(
    "/:id",
    verifyToken,
    patientController.getPatientById
);

/* =========================
   CREATE PATIENT
========================= */
router.post(
    "/create",
    verifyToken,
    patientOnly,
    patientController.createPatient
);

/* =========================
   UPDATE PATIENT
========================= */
router.put(
    "/update/:id",
    verifyToken,
    patientOnly,
    patientController.updatePatient
);

/* =========================
   DELETE PATIENT
========================= */
router.delete(
    "/delete/:id",
    verifyToken,
    patientOnly,
    patientController.deletePatient
);

/* =========================
   TEST ROUTE
========================= */
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Patient routes working ✔"
    });
});

/* =========================
   EXPORT ROUTER
========================= */
module.exports = router;