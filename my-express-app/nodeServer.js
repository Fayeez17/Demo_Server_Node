const http = require("http");
const { URL } = require("url");

const port = 3000;

const users = [
  { id: 1, name: "Harry" },
  { id: 2, name: "Louis" }
];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Common response headers
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-App-Name", "Demo Node App");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // OPTIONS /users
  if (method === "OPTIONS" && path === "/users") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "OPTIONS request successful",
        allowedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
      })
    );
    return;
  }

  // GET /users
  if (method === "GET" && path === "/users") {
    res.writeHead(200);
    res.end(JSON.stringify(users));
    return;
  }

  // GET /users/:id
  if (method === "GET" && path.startsWith("/users/")) {
    const userId = Number(path.split("/")[2]);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(user));
    return;
  }

  // POST /users
  if (method === "POST" && path === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      const newUser = {
        id: users.length + 1,
        name: parsedBody.name
      };

      users.push(newUser);

      res.writeHead(201);
      res.end(
        JSON.stringify({
          message: "User created successfully",
          user: users
        })
      );
    });

    return;
  }

  // PUT /users/:id
  if (method === "PUT" && path.startsWith("/users/")) {
    const userId = Number(path.split("/")[2]);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      users[userIndex] = {
        id: userId,
        name: parsedBody.name
      };

      res.writeHead(200);
      res.end(
        JSON.stringify({
          message: `User with id ${userId} updated successfully`,
          user: users[userIndex]
        })
      );
    });

    return;
  }

  // PATCH /users/:id
  if (method === "PATCH" && path.startsWith("/users/")) {
    const userId = Number(path.split("/")[2]);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      if (parsedBody.name !== undefined) {
        user.name = parsedBody.name;
      }

      res.writeHead(200);
      res.end(
        JSON.stringify({
          message: `User with id ${userId} partially updated`,
          user
        })
      );
    });

    return;
  }

  // DELETE /users/:id
  if (method === "DELETE" && path.startsWith("/users/")) {
    const userId = Number(path.split("/")[2]);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    const deletedUser = users.splice(userIndex, 1);

    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: `User with id ${userId} deleted successfully`,
        user: deletedUser[0]
      })
    );
    return;
  }

  // Route not found
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});