const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const db = require("../database");

const router = express.Router();

const registerValidationRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("gender")
    .notEmpty()
    .withMessage("Please select your gender")
    .isIn(["Male", "Female"])
    .withMessage("Invalid gender selected"),

  body("country")
    .notEmpty()
    .withMessage("Please select your country")
    .isIn(["India", "USA", "UK", "Canada"])
    .withMessage("Invalid country selected"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("hobbies")
    .isArray({ min: 1 })
    .withMessage("Please select at least one hobby"),

  body("hobbies.*")
    .isIn(["Reading", "Music", "Sports", "Gaming"])
    .withMessage("Invalid hobby selected"),
];

router.post("/register", registerValidationRules, async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const formattedErrors = {};

    validationErrors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });

    return res.status(400).json({
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  const {
    fullName,
    email,
    password,
    gender,
    country,
    dateOfBirth,
    hobbies,
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const createdAt = new Date().toISOString();

    const sql = `
      INSERT INTO users (
        fullName,
        email,
        passwordHash,
        gender,
        country,
        dateOfBirth,
        hobbies,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        fullName,
        email,
        passwordHash,
        gender,
        country,
        dateOfBirth,
        JSON.stringify(hobbies),
        createdAt,
      ],
      function (error) {
        if (error) {
          if (error.message.includes("UNIQUE constraint failed")) {
            return res.status(409).json({
              message: "Email already exists",
              errors: {
                email: "This email is already registered",
              },
            });
          }

          return res.status(500).json({
            message: "Failed to save user",
          });
        }

        return res.status(201).json({
          message: "User registered successfully",
          user: {
            id: this.lastID,
            fullName,
            email,
            gender,
            country,
            dateOfBirth,
            hobbies,
            createdAt,
          },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/users", (req, res) => {
  db.all(
    `
      SELECT 
        id,
        fullName,
        email,
        gender,
        country,
        dateOfBirth,
        hobbies,
        createdAt
      FROM users
      ORDER BY id DESC
    `,
    [],
    (error, rows) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to fetch users",
        });
      }

      const users = rows.map((user) => ({
        ...user,
        hobbies: JSON.parse(user.hobbies),
      }));

      return res.json(users);
    }
  );
});

module.exports = router;