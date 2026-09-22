/* =====================================
   AI DOCTOR SYSTEM - EMERGENCY ROUTES
   API Layer (Emergency Alert)
===================================== */

const express = require("express");
const router = express.Router();

/* =========================
   CONTROLLER IMPORT (optional future use)
========================= */
// const emergencyController = require("../controllers/emergencyController");

/* =========================
   MIDDLEWARE IMPORT (optional protection)
========================= */
const { verifyToken } = require("../middleware/authMiddleware");

/* =====================================
   🚨 EMERGENCY ALERT ROUTE
===================================== */

router.post(
    "/alert",
    verifyToken,   // 🔐 protect route (important)
    async (req, res) => {

        try {

            const { userId, location } = req.body;

            /* =========================
               VALIDATION
            ========================= */
            if (!userId || !location) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields ❌"
                });
            }

            console.log("🚨 EMERGENCY ALERT RECEIVED");
            console.log("User:", userId);
            console.log("Location:", location);

            /* =========================
               FUTURE ENHANCEMENTS:
               - Save to DB
               - Notify doctors via socket/email/SMS
            ========================= */

            return res.status(200).json({
                success: true,
                message: "🚨 Emergency alert sent successfully!"
            });

        } catch (err) {

            console.log("❌ Emergency Route Error:", err);

            return res.status(500).json({
                success: false,
                message: "Server error in emergency ❌"
            });
        }

    }
);

/* =========================
   TEST ROUTE
========================= */
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Emergency route working ✔"
    });
});

/* =========================
   EXPORT ROUTER
========================= */
module.exports = router;