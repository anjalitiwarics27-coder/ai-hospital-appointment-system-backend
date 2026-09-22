/* =====================================
   AI DOCTOR SYSTEM - APPOINTMENT CONTROLLER
   Handles Appointment Business Logic
===================================== */

const Appointment = require("../models/appointment");

/* =========================
   BOOK APPOINTMENT
========================= */
const bookAppointment = (req, res) => {

    try {

        const appointment = req.body;

        // Validation
        if (
            !appointment.patient_id ||
            !appointment.doctor_id ||
            !appointment.date ||
            !appointment.time
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing ❌"
            });
        }

        Appointment.bookAppointment(appointment, (err, result) => {

            if (err) {

                console.log("❌ Book Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error booking appointment ❌"
                });
            }

            res.status(201).json({
                success: true,
                message: "Appointment booked successfully ✔",
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
   GET ALL APPOINTMENTS
========================= */
const getAllAppointments = (req, res) => {

    try {

        Appointment.getAllAppointments((err, result) => {

            if (err) {

                console.log("❌ Get Appointments Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching appointments ❌"
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
   GET APPOINTMENTS BY PATIENT
========================= */
const getAppointmentsByPatient = (req, res) => {

    try {

        const patientId = req.params.id;

        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: "Patient ID is required ❌"
            });
        }

        Appointment.getAppointmentsByPatient(patientId, (err, result) => {

            if (err) {

                console.log("❌ Patient Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching patient appointments ❌"
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
   GET APPOINTMENTS BY DOCTOR
========================= */
const getAppointmentsByDoctor = (req, res) => {

    try {

        const doctorId = req.params.id;

        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required ❌"
            });
        }

        Appointment.getAppointmentsByDoctor(doctorId, (err, result) => {

            if (err) {

                console.log("❌ Doctor Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error fetching doctor appointments ❌"
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
   UPDATE APPOINTMENT STATUS
========================= */
const updateAppointmentStatus = (req, res) => {

    try {

        const id = req.params.id;
        const { status } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID missing ❌"
            });
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required ❌"
            });
        }

        Appointment.updateAppointmentStatus(id, status, (err, result) => {

            if (err) {

                console.log("❌ Update Status Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error updating status ❌"
                });
            }

            res.status(200).json({
                success: true,
                message: "Appointment status updated ✔",
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
   DELETE APPOINTMENT
========================= */
const deleteAppointment = (req, res) => {

    try {

        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID missing ❌"
            });
        }

        Appointment.deleteAppointment(id, (err, result) => {

            if (err) {

                console.log("❌ Delete Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Error deleting appointment ❌"
                });
            }

            res.status(200).json({
                success: true,
                message: "Appointment deleted successfully ✔",
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
    bookAppointment,
    getAllAppointments,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    updateAppointmentStatus,
    deleteAppointment
};