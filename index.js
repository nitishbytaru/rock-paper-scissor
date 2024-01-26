const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/home", (req, res) => {
  res.render("game.ejs");
});

app.listen(8080, () => {
  console.log("server is listening");
});
