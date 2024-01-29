const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON requests
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/rockpaperscissor");
}

//database schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highscore: {
    type: Number,
    default: 0,
  },
});

const userdetail = mongoose.model("userdetail", userSchema);

app.get("/check", async (req, res) => {
  let gameUser = await userdetail.find();
  console.log(gameUser);
  res.send("hurry");
});

//node.js application
app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.post("/home", (req, res) => {
  let userdetail1 = new userdetail({
    username: `${req.body.username}`,
    password: `${req.body.password}`,
  });
  userdetail1
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("home.ejs");
});

app.get("/game", (req, res) => {
  res.render("game.ejs");
});

app.post("/game", (req, res) => {
  let { highscore } = req.body;
  console.log(highscore);
});

app.get("/home/register", (req, res) => {
  res.render("register.ejs");
});

app.listen(8080, () => {
  console.log("server is listening");
});
