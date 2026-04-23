const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express.js");
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Harry" },
    { id: 2, name: "Louis" }
  ];
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `Fetching user with id ${userId}`
  });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.json({
    message: `User with id ${userId} updated successfully`,
    user: updatedUser
  });
});

app.patch("/users/:id", (req, res) => {
  const userId = req.params.id;
  const partialUpdate = req.body;
  res.json({
    message: `User with id ${userId} partially updated`,
    updatedFields: partialUpdate
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `User with id ${userId} deleted successfully`
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});