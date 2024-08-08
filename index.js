const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectionDb } = require("./db/server");
const router = require("./Router/Router");
const adminrouter = require("./Router/admin");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("server");
});
connectionDb();
app.use("/images", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", router);
app.use("/admin", adminrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
