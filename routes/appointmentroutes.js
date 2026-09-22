/* =====================================
   AI DOCTOR SYSTEM - APPOINTMENT ROUTES
===================================== */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLLER IMPORT
========================= */
const appointmentController = require("../controllers/appointmentController");

/* =========================
   AUTH MIDDLEWARE IMPORT
========================= */
const {
    verifyToken,
    doctorOnly,
    patientOnly
} = require("../middleware/authMiddleware");

/* =====================================
   APPOINTMENT APIs
===================================== */

/* =========================
   📅 BOOK APPOINTMENT
   Patient Only
========================= */
router.post(
    "/book",
    verifyToken,
    patientOnly,
    appointmentController.bookAppointment
);

/* =========================
   📅 GET ALL APPOINTMENTS
   (Protected Route)
========================= */
router.get(
    "/",
    verifyToken,
    appointmentController.getAllAppointments
);

/* =========================
   📅 GET PATIENT APPOINTMENTS
========================= */
router.get(
    "/patient/:id",
    verifyToken,
    patientOnly,
    appointmentController.getAppointmentsByPatient
);

/* =========================
   📅 GET DOCTOR APPOINTMENTS
========================= */
router.get(
    "/doctor/:id",
    verifyToken,
    doctorOnly,
    appointmentController.getAppointmentsByDoctor
);

/* =========================
   ✏️ UPDATE APPOINTMENT STATUS
   Doctor Only
========================= */
router.put(
    "/status/:id",
    verifyToken,
    doctorOnly,
    appointmentController.updateAppointmentStatus
);

/* =========================
   ❌ DELETE APPOINTMENT
========================= */
router.delete(
    "/delete/:id",
    verifyToken,
    appointmentController.deleteAppointment
);

/* =========================
   HEALTH TEST ROUTE
========================= */
router.get(
    "/test",
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Appointment routes working ✔"
        });
    }
);

/* =========================
   EXPORT ROUTER
========================= */
module.exports = router;