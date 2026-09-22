/* =====================================
   AI DOCTOR SYSTEM - DOCTOR ROUTES
   API Layer (Doctor) + PROTECTION
===================================== */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLLER IMPORT
========================= */
const doctorController = require("../controllers/doctorController");

/* =========================
   MIDDLEWARE IMPORT
========================= */
const {
    verifyToken,
    doctorOnly
} = require("../middleware/authMiddleware");

/* =====================================
   DOCTOR ROUTES
===================================== */

/* =========================
   👨‍⚕️ GET ALL DOCTORS
   Public (for listing doctors)
========================= */
router.get(
    "/",
    doctorController.getAllDoctors
);

/* =========================
   👨‍⚕️ GET DOCTOR BY ID
========================= */
router.get(
    "/:id",
    doctorController.getDoctorById
);

/* =========================
   ➕ CREATE DOCTOR
   (Protected - Admin/Doctor use case)
========================= */
router.post(
    "/create",
    verifyToken,
    doctorOnly,
    doctorController.createDoctor
);

/* =========================
   ✏️ UPDATE DOCTOR
========================= */
router.put(
    "/update/:id",
    verifyToken,
    doctorOnly,
    doctorController.updateDoctor
);

/* =========================
   ❌ DELETE DOCTOR
========================= */
router.delete(
    "/delete/:id",
    verifyToken,
    doctorOnly,
    doctorController.deleteDoctor
);

/* =========================
   🧪 TEST ROUTE
========================= */
router.get(
    "/test",
    (req, res) => {
        res.json({
            success: true,
            message: "Doctor routes working ✔"
        });
    }
);

/* =========================
   EXPORT ROUTER
========================= */
module.exports = router;