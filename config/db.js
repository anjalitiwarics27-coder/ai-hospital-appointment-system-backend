/* =====================================
   AI DOCTOR SYSTEM - DB CONFIG
   MySQL Database Connection
===================================== */

const mysql = require("mysql2");
require("dotenv").config();

/* =========================
   DATABASE CONNECTION POOL
========================= */
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Anjali@123",
    database: "project_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/* =========================
   TEST CONNECTION (SAFE ONCE ONLY)
========================= */
db.getConnection((err, connection) => {
    if (err) {
        console.log("=====================================");
        console.log("❌ DATABASE CONNECTION FAILED");
        console.log("Error:", err.message);
        console.log("=====================================");
        return;
    }

    console.log("=====================================");
    console.log("✅ MySQL Connected Successfully");
    console.log("Database:", process.env.DB_NAME || "project_db");
    console.log("=====================================");

    connection.release();
});

/* =========================
   HANDLE DB RUNTIME ERRORS
========================= */
db.on("error", (err) => {
    console.log("❌ MySQL Runtime Error:", err.message);
});

/* =========================
   EXPORT DATABASE
========================= */
module.exports = db;