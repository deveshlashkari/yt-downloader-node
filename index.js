const express = require("express");
const downloadRoute = require("./routes/downloadRoute");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the youtube downloader");
});

app.use("/api", downloadRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
