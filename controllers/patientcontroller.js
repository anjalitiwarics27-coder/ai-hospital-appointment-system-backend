/* =====================================
   AI DOCTOR SYSTEM - PATIENT CONTROLLER
   Handles Patient Business Logic
===================================== */

const Patient = require("../models/patient");

/* =========================
   GET ALL PATIENTS
========================= */
const getAllPatients = (req, res) => {

    try {

        Patient.getAllPatients((err, result) => {

            if (err) {

                console.log("❌ Get Patients Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching patients ❌"
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
   GET PATIENT BY ID
========================= */
const getPatientById = (req, res) => {

    try {

        const id = req.params.id;

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Patient ID is required ❌"
            });
        }

        Patient.getPatientById(id, (err, result) => {

            if (err) {

                console.log("❌ Get Patient Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching patient ❌"
                });
            }

            if (!result || result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Patient not found ❌"
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
   CREATE PATIENT
========================= */
const createPatient = (req, res) => {

    try {

        const patient = req.body;

        /* =========================
           VALIDATION
        ========================= */
        if (
            !patient.name ||
            !patient.email ||
            !patient.password
        ) {

            return res.status(400).json({
                success: false,
                message: "Required fields missing ❌"
            });
        }

        Patient.createPatient(patient, (err, result) => {

            if (err) {

                console.log("❌ Create Patient Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error creating patient ❌"
                });
            }

            res.status(201).json({
                success: true,
                message: "Patient created successfully ✔",
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
   UPDATE PATIENT
========================= */
const updatePatient = (req, res) => {

    try {

        const id = req.params.id;
        const data = req.body;

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Patient ID is required ❌"
            });
        }

        Patient.updatePatient(id, data, (err, result) => {

            if (err) {

                console.log("❌ Update Patient Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error updating patient ❌"
                });
            }

            res.status(200).json({
                success: true,
                message: "Patient updated successfully ✔",
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
   DELETE PATIENT
========================= */
const deletePatient = (req, res) => {

    try {

        const id = req.params.id;

        if (!id) {

            return res.status(400).json({
                success: false,
                message: "Patient ID is required ❌"
            });
        }

        Patient.deletePatient(id, (err, result) => {

            if (err) {

                console.log("❌ Delete Patient Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error deleting patient ❌"
                });
            }

            res.status(200).json({
                success: true,
                message: "Patient deleted successfully ✔",
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
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};