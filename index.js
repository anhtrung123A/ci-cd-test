const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express.js on port 80!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/info", (req, res) => {
  res.json({ name: "Express Demo", version: "1.0.0" });
});

app.post("/login", (req, res) => {
  const fakeUser = {
    username: "admin",
    password: "password123456"
  };
  
  const { username, password } = req.body;
  
  if (username === fakeUser.username && password === fakeUser.password) {
    res.status(200).json({ 
      message: "OK",
      success: true 
    });
  } else {
    res.status(401).json({ 
      message: "Unauthorized",
      success: false 
    });
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
