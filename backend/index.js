const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // allow all origins
app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
