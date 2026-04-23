const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "Harry" },
  { id: 2, name: "Louis" }
];

//Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get single user by id
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// Post
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: users
  });
});

// Put
app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = {
    id: userId,
    name: req.body.name
  };

  res.json({
    message: `User with id ${userId} updated successfully`,
    user: users[userIndex]
  });
});

// Patch
app.patch("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name !== undefined) {
    user.name = req.body.name;
  }

  res.json({
    message: `User with id ${userId} partially updated`,
    user
  });
});

// Delete
app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.json({
    message: `User with id ${userId} deleted successfully`,
    user: deletedUser[0]
  });
});

// Custom headers
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-App-Name", "Demo Express App");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Options
app.options("/users", (req, res) => {
  res.status(200).json({
    message: "OPTIONS request successful",
    allowedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});