require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
const registerRoutes = require("./routes/registerRoutes");

const app = express();

connectDatabase();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api", registerRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});