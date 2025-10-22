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

// 404 handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
