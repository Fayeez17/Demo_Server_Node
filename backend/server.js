const express = require("express");
const cors = require("cors");
const registerRoutes = require("./routes/registerRoutes");

const app = express();

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