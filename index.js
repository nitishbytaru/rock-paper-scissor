const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON requests
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretcode", // Change this to a strong, random string
    resave: false,
    saveUninitialized: true,
  })
);
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

app.use(flash());

//node.js application
app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.post("/home/register", async (req, res) => {
  let userdetail1 = new userdetail({
    username: `${req.body.username}`,
    password: `${req.body.password}`,
  });
  let gameUser = await userdetail.find({ username: `${req.body.username}` });
  if (gameUser.length) {
    //this logic say that there are no such users
    console.log("erroe user exist");
    //here a flash message will come
  } else {
    userdetail1
      .save()
      .then()
      .catch((err) => {
        console.log(err);
      });
    console.log("new user saved");
    //here a flash message will come
    res.redirect("/home");
  }
});

app.get("/home/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/home/login", async (req, res) => {
  let gameLoginUser = await userdetail.find({
    username: `${req.body.username}`,
  });
  if (gameLoginUser.length && gameLoginUser[0].password === req.body.password) {
    req.session.user = gameLoginUser;
    console.log("user verified");
    res.redirect("/game");
    //here a flash message will come
  } else {
    //this logic say that there are no such users
    console.log("user does not exist! Plese register");
    res.redirect("/home/register");
    //here a flash message will come
  }
});

app.get("/game", (req, res) => {
  res.render("game.ejs");
});

app.post("/game", async (req, res) => {
  try {
    let finalHighscore = req.body.highscore;
    let updated = await userdetail.updateOne(
      {
        username: `${req.session.user[0].username}`,
        highscore: { $lt: finalHighscore },
      },
      { $set: { highscore: finalHighscore } }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/home/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/home/highscore", async (req, res) => {
  const sortedArray = (await userdetail.find()).sort(
    (a, b) => b.highscore - a.highscore
  );
  res.render("highscore.ejs", { sortedArray, count: 1 });
});

app.post("/home", (req, res) => {
  res.redirect("/home");
});

app.listen(8080, () => {
  console.log("server is listening");
});
