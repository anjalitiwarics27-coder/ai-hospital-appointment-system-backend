/* =====================================
   AI DOCTOR SYSTEM - HELPERS
   Utility Functions (Reusable Logic)
===================================== */

/* =========================
   SUCCESS RESPONSE FORMAT
========================= */
const successResponse = (res, message, data = null) => {

    return res.status(200).json({
        success: true,
        message: message,
        data: data
    });

};

/* =========================
   ERROR RESPONSE FORMAT
========================= */
const errorResponse = (res, message, statusCode = 400, error = null) => {

    return res.status(statusCode).json({
        success: false,
        message: message,
        error: error || null
    });

};

/* =========================
   VALIDATE EMAIL
========================= */
const isValidEmail = (email) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

};

/* =========================
   VALIDATE EMPTY FIELDS
========================= */
const isEmpty = (value) => {

    return (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
    );

};

/* =========================
   GENERATE RANDOM ID
========================= */
const generateId = () => {

    return (
        Date.now().toString() +
        Math.floor(Math.random() * 10000).toString()
    );

};

/* =========================
   FORMAT DATE (DD-MM-YYYY)
========================= */
const formatDate = (date = new Date()) => {

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;

};

/* =========================
   FORMAT TIME (HH:MM)
========================= */
const formatTime = (date = new Date()) => {

    const d = new Date(date);

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;

};

/* =========================
   EXPORT HELPERS
========================= */
module.exports = {
    successResponse,
    errorResponse,
    isValidEmail,
    isEmpty,
    generateId,
    formatDate,
    formatTime
};