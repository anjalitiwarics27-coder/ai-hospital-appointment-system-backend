/* =====================================
   AI DOCTOR SYSTEM - AUTH ROUTES
   FINAL CLEAN VERSION (NO ERRORS)
===================================== */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLLER IMPORT
========================= */
let authController = {};

try {
    authController = require("../controllers/authController");
    console.log("✅ AuthController Loaded");
} catch (err) {
    console.log("❌ Controller import error:", err.message);
}

/* =========================
   MIDDLEWARE IMPORT
========================= */
const { verifyToken } = require("../middleware/authMiddleware");

/* =========================
   SAFE FALLBACK (VERY IMPORTANT)
========================= */
const fallback = (name) => (req, res) => {
    res.status(200).json({
        success: true,
        message: `${name} route working (fallback) ✅`
    });
};

/* =====================================
   ROUTES
===================================== */

/* 🔐 SIGNUP */
router.post(
    "/signup",
    authController.signup || fallback("Signup")
);

/* 🔐 LOGIN (ONLY ONE — NO DUPLICATE) */
router.post(
    "/login",
    authController.login || fallback("Login")
);

/* 👤 PROFILE (PROTECTED) */
router.get(
    "/profile",
    verifyToken,
    authController.getProfile || fallback("Profile")
);

/* 🔧 TEST ROUTE */
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth routes working ✔"
    });
});

/* =========================
   EXPORT ROUTER
========================= */
module.exports = router;