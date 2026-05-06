const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },

    country: {
      type: String,
      required: true,
      enum: ["India", "USA", "UK", "Canada"],
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    hobbies: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Please select at least one hobby",
      },
      enum: ["Reading", "Music", "Sports", "Gaming"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;