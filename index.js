require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON requests
app.use(methodOverride("_method"));

const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSIONS", err);
});

const sessionOptions = {
  store:store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process on database connection error
  }
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
  res.render("home.ejs", { currUser: req.session.user, messages: req.flash() });
});

app.post("/home/register", async (req, res, next) => {
  try {
    let userdetail1 = new userdetail({
      username: `${req.body.username}`,
      password: `${req.body.password}`,
    });
    let gameUser = await userdetail.find({ username: `${req.body.username}` });
    if (gameUser.length) {
      req.flash("error", "User Exists");
      res.redirect("/home");
    } else {
      userdetail1
        .save()
        .then()
        .catch((err) => {
          console.log(err);
        });
      req.flash(
        "success",
        "Registeration successfull Login and play the game !!"
      );
      res.redirect("/home");
    }
  } catch (error) {
    console.error("Error in /home/register route:", error);
    next(error); // Pass the error to the error handling middleware
  }
});

app.get("/home/login", (req, res) => {
  res.render("login.ejs", {
    currUser: req.session.user,
    messages: req.flash(),
  });
});

//middleware to check if the user is logged in or not
app.use("/game", async (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "Login to play the game");
    res.render("login.ejs", {
      currUser: req.session.user,
      messages: req.flash(),
    });
  } else {
    next();
  }
});

app.post("/home/login", async (req, res) => {
  let gameLoginUser = await userdetail.find({
    username: `${req.body.username}`,
  });
  if (gameLoginUser.length && gameLoginUser[0].password === req.body.password) {
    req.session.user = gameLoginUser;
    req.flash("success", "login successfull");
    res.redirect("/home");
  } else {
    req.flash(
      "error",
      "login Failed Try again! \n If New user Register first!!!"
    );
    res.redirect("/home");
  }
});

app.get("/game", (req, res) => {
  res.render("game.ejs", { currUser: req.session.user });
});

app.post("/game", async (req, res, next) => {
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
    console.error("Error in /game route:", error);
    next(error);
  }
});

app.get("/home/register", (req, res) => {
  res.render("register.ejs", { currUser: req.session.user });
});

app.get("/home/highscore", async (req, res) => {
  const sortedArray = (await userdetail.find()).sort(
    (a, b) => b.highscore - a.highscore
  );
  res.render("highscore.ejs", {
    sortedArray,
    count: 1,
    currUser: req.session.user,
  });
});

app.get("/home/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/home");
});

app.post("/home", (req, res) => {
  res.redirect("/home");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(8080, () => {
  console.log("server is listening");
});