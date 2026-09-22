/* =====================================
   AI DOCTOR SYSTEM - DB CONFIG
   MySQL Database Connection
===================================== */

const mysql = require("mysql2");
require("dotenv").config();

function buildPoolConfig() {
    // Railway / hosted DB: prefer full connection URL if provided.
    // Supported vars: MYSQL_URL, DATABASE_URL, MYSQL_PUBLIC_URL
    const connectionUrl =
        process.env.MYSQL_URL ||
        process.env.DATABASE_URL ||
        process.env.MYSQL_PUBLIC_URL;

    if (connectionUrl) {
        return {
            uri: connectionUrl,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };
    }

    return {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "Anjali@123",
        database: process.env.DB_NAME || "project_db",
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
}

/* =========================
   DATABASE CONNECTION POOL
   Local fallback + Railway/online via env
========================= */
const db = mysql.createPool(buildPoolConfig());

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