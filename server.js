const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
console.log(process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/games", require("./routes/gameRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/chores", require("./routes/choreRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));

app.get("/", (req, res) => {
  res.send("Little Polaris Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});