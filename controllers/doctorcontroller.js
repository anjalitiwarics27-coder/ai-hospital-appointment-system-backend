/* =====================================
   AI DOCTOR SYSTEM - DOCTOR CONTROLLER
   Handles Doctor Business Logic
===================================== */

const Doctor = require("../models/doctor");

/* =========================
   GET ALL DOCTORS
========================= */
const getAllDoctors = (req, res) => {

    try {

        Doctor.getAllDoctors((err, result) => {

            if (err) {

                console.log("❌ Get Doctors Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching doctors ❌"
                });
            }

            res.status(200).json({
                success: true,
                count: result.length,
                data: result
            });

        });

    } catch (error) {

        console.log("❌ Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   GET DOCTOR BY ID
========================= */
const getDoctorById = (req, res) => {

    try {

        const id = req.params.id;

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Doctor ID is required ❌"
            });
        }

        Doctor.getDoctorById(id, (err, result) => {

            if (err) {

                console.log("❌ Get Doctor Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching doctor ❌"
                });
            }

            if (!result || result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Doctor not found ❌"
                });
            }

            res.status(200).json({
                success: true,
                data: result
            });

        });

    } catch (error) {

        console.log("❌ Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   CREATE DOCTOR
========================= */
const createDoctor = (req, res) => {

    try {

        const doctor = req.body;

        /* =========================
           VALIDATION
        ========================= */
        if (
            !doctor.name ||
            !doctor.email ||
            !doctor.specialization ||
            !doctor.password
        ) {

            return res.status(400).json({
                success: false,
                message: "All required fields are missing ❌"
            });
        }

        Doctor.createDoctor(doctor, (err, result) => {

            if (err) {

                console.log("❌ Create Doctor Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error creating doctor ❌"
                });
            }

            res.status(201).json({
                success: true,
                message: "Doctor created successfully ✔",
                data: result
            });

        });

    } catch (error) {

        console.log("❌ Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   UPDATE DOCTOR
========================= */
const updateDoctor = (req, res) => {

    try {

        const id = req.params.id;
        const data = req.body;

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Doctor ID is required ❌"
            });
        }

        Doctor.updateDoctor(id, data, (err, result) => {

            if (err) {

                console.log("❌ Update Doctor Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error updating doctor ❌"
                });
            }

            res.status(200).json({
                success: true,
                message: "Doctor updated successfully ✔",
                data: result
            });

        });

    } catch (error) {

        console.log("❌ Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   DELETE DOCTOR
========================= */
const deleteDoctor = (req, res) => {

    try {

        const id = req.params.id;

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Doctor ID is required ❌"
            });
        }

        Doctor.deleteDoctor(id, (err, result) => {

            if (err) {

                console.log("❌ Delete Doctor Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error deleting doctor ❌"
                });
            }

            res.status(200).json({
                success: true,
                message: "Doctor deleted successfully ✔",
                data: result
            });

        });

    } catch (error) {

        console.log("❌ Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   EXPORT CONTROLLER
========================= */
module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};