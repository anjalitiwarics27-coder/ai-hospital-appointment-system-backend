/* =====================================
   AI DOCTOR SYSTEM - AUTH CONTROLLER
   CLEAN + STABLE + PRODUCTION READY
===================================== */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // your mysql pool

/* =========================
   SECRET KEY (MOVE TO .ENV LATER)
========================= */
const SECRET_KEY = "mysecretkey123";

/* =========================
   SIGNUP CONTROLLER
========================= */
const signup = (req, res) => {
  const { name, email, password, role } = req.body;

  // validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields required (name, email, password, role)"
    });
  }

  // check user exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log("DB Error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (result.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User already exists"
        });
      }

      try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, role],
          (err, insertResult) => {
            if (err) {
              console.log("Insert Error:", err);
              return res.status(500).json({
                success: false,
                message: "Signup failed"
              });
            }

            return res.status(201).json({
              success: true,
              message: "User registered successfully",
              user: {
                id: insertResult.insertId,
                name,
                email,
                role
              }
            });
          }
        );
      } catch (error) {
        console.log("Signup Error:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  );
};

/* =========================
   LOGIN CONTROLLER
========================= */
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }

      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid password"
          });
        }

        // create token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role
          },
          SECRET_KEY,
          { expiresIn: "1d" }
        );

        return res.json({
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } catch (error) {
        console.log("Login Error:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  );
};

/* =========================
   PROFILE (JWT middleware required)
========================= */
const getProfile = (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
};

/* =========================
   EXPORTS
========================= */
module.exports = {
  signup,
  login,
  getProfile
};