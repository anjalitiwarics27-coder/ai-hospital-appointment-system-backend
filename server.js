/* =====================================
   AI DOCTOR SYSTEM - SERVER FILE
   CLEAN + STABLE + ERROR SAFE VERSION
===================================== */

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const path = require("path");
/* =========================
   PORT
========================= */
const PORT = process.env.PORT || 5001;

/* =========================
   MIDDLEWARE
========================= */

/* ✔ FIXED CORS (MAIN ISSUE FIXED) */
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://anjalitiwarics27-coder.github.io",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "http://localhost:5001/Pages/patient/view_dashboard.html"))); // Serve frontend files

/* =========================
   LOGGER
========================= */
app.use((req, res, next) => {
  console.log("API:", req.method, req.url);
  next();
});

/* =========================
   DATABASE CONNECTION (shared pool, supports Railway via MYSQL_URL/DATABASE_URL)
========================= */
const db = require("./config/db");

db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ DATABASE CONNECTION FAILED");
    console.log(err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
  connection.release();
});

global.db = db;

/* =========================
   SOCKET.IO (FIXED CORS)
========================= */
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("👤 User connected:", socket.id);

  socket.on("join", (userId) => {
    if (!userId) return;
    socket.join(userId);
  });

  socket.on("sendMessage", (data) => {
    if (!data?.sender || !data?.receiver || !data?.message) return;

    if (!db) return;

    db.query(
      "INSERT INTO chat_messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [data.sender, data.receiver, data.message],
      (err, result) => {
        if (err) {
          console.log("❌ DB Error:", err.message);
          return;
        }

        io.to(data.receiver).emit("receiveMessage", {
          id: result.insertId,
          ...data,
          created_at: new Date()
        });
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("👤 User disconnected:", socket.id);
  });
});

/* =========================
   AUTH MIDDLEWARE
========================= */
const { verifyToken } = require("./middleware/authMiddleware");

/* =========================
   TEST ROUTES
========================= */
app.get("/api/test-public", (req, res) => {
  res.json({ success: true, message: "Public route working" });
});

app.get("/api/test-auth", verifyToken, (req, res) => {
  res.json({ success: true, message: "Auth working" });
});

/* =========================
   ROUTES IMPORT
========================= */
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const emergencyRoutes = require("./routes/emergency");

/* =========================
   ROUTES USE
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/emergency", emergencyRoutes);

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send("AI Doctor Backend Running 🚀");
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found"
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* =========================
   START SERVER
========================= */
server.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:" + PORT);
});