if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
