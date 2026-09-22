/* =====================================
   AI DOCTOR SYSTEM - AUTH MIDDLEWARE
   JWT Token Verification + Role Access
===================================== */

const jwt = require("jsonwebtoken");

/* =========================
   SECRET KEY
   ⚠️ Later move to .env
========================= */
const SECRET_KEY = "mysecretkey123";

/* =========================
   🔐 VERIFY JWT TOKEN
========================= */
const verifyToken = (req, res, next) => {

    try {

        /* =========================
           GET AUTH HEADER
        ========================= */
        const authHeader = req.headers["authorization"];

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Access denied ❌ No token provided"
            });
        }

        /* =========================
           HANDLE BEARER TOKEN
        ========================= */
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Token missing ❌"
            });
        }

        /* =========================
           VERIFY TOKEN
        ========================= */
        const decoded = jwt.verify(token, SECRET_KEY);

        /* =========================
           ATTACH USER DATA
        ========================= */
        req.user = decoded;

        next();

    } catch (error) {

        console.log("❌ JWT Verification Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token ❌"
        });
    }

};

/* =========================
   👨‍⚕️ DOCTOR ONLY ACCESS
========================= */
const doctorOnly = (req, res, next) => {

    try {

        if (req.user && req.user.role === "doctor") {

            next();

        } else {

            return res.status(403).json({
                success: false,
                message: "Access denied ❌ Doctors only"
            });
        }

    } catch (error) {

        console.log("❌ Doctor Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   🧑 PATIENT ONLY ACCESS
========================= */
const patientOnly = (req, res, next) => {

    try {

        if (req.user && req.user.role === "patient") {

            next();

        } else {

            return res.status(403).json({
                success: false,
                message: "Access denied ❌ Patients only"
            });
        }

    } catch (error) {

        console.log("❌ Patient Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   🔒 ADMIN ONLY ACCESS
========================= */
const adminOnly = (req, res, next) => {

    try {

        if (req.user && req.user.role === "admin") {

            next();

        } else {

            return res.status(403).json({
                success: false,
                message: "Access denied ❌ Admin only"
            });
        }

    } catch (error) {

        console.log("❌ Admin Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error ❌"
        });
    }

};

/* =========================
   EXPORT MODULE
========================= */
module.exports = {
    verifyToken,
    doctorOnly,
    patientOnly,
    adminOnly
};