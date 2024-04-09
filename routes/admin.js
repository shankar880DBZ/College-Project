const express = require("express");
const router = express.Router();

const passport = require("passport");
const localStrategy = require("passport-local");
const adminModel = require("../routes/adminSchema");
const upload = require("./multer");

// schemas
const animeModel = require("./animeSchema");
const movieModel = require("./movieSchema");
const seriesModel = require("./seriesSchema");

// schemas

passport.use(new localStrategy(adminModel.authenticate()));

router.get("/", (req, res) => {
  res.render("./Admin/AdminLogin", { error: req.flash("error") });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("./Admin/Admin");
});
router.get("/upload", (req, res) => {
  res.render("./Admin/upload");
});

router.post("/register", (req, res) => {
  var adminData = new adminModel({
    username: req.body.username,
  });
  adminModel.register(adminData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/admin/");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/profile",
    failureRedirect: "/admin", // Added "/" before "login"
    failureFlash: true,
  }),
  function (req, res) { }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/admin");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // Corrected typo
    return next();
  }
  res.redirect("/admin");
}

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(404).send("no file choosen");
  }
  var {
    type: choice,
    thumbnail_v,
    thumbnail_h,
    movieTitle,
    rating,
    duration,
    description,
    slide,
    special,
    latest,
    top,
    popular,
    movieTrue,
  } = req.body;

  if (slide) {
    slide = true;
  } else {
    slide = false;
  }
  if (special) {
    special = true;
  } else {
    special = false;
  }
  if (latest) {
    latest = true;
  } else {
    latest = false;
  }
  if (top) {
    top = true;
  } else {
    top = false;
  }
  if (popular) {
    popular = true;
  } else {
    popular = false;
  }
  if (movieTrue) {
    movieTrue = true;
  } else {
    movieTrue = false;
  }
  switch (choice) {
    case "movie":
      await movieModel
        .create({
          thumbnail_v: thumbnail_v,
          thumbnail_h: thumbnail_h,
          title: movieTitle,
          rating: rating,
          duration: duration,
          description: description,
          movie: req.file.filename,
          slide: slide,
          special: special,
          latest: latest,
          top: top,
          popular: popular,
          movieTrue: movieTrue,
        })
        .then(res.redirect("/admin/profile"));
      break;
    case "anime":
      await animeModel
        .create({
          thumbnail_v: thumbnail_v,
          thumbnail_h: thumbnail_h,
          title: movieTitle,
          rating: rating,
          duration: duration,
          description: description,
          movie: req.file.filename,
          slide: slide,
          special: special,
          latest: latest,
          top: top,
          popular: popular,
          movieTrue: movieTrue,
        })
        .then(res.redirect("/admin/profile"));
      break;
    case "series":
      await seriesModel
        .create({
          thumbnail_v: thumbnail_v,
          thumbnail_h: thumbnail_h,
          title: movieTitle,
          rating: rating,
          duration: duration,
          description: description,
          movie: req.file.filename,
          slide: slide,
          special: special,
          latest: latest,
          top: top,
          popular: popular,
          movieTrue: movieTrue,
        })
        .then(res.redirect("/admin/profile"));
      break;
    default:
      res.send("hello");
  }
});
router.post("/upload/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(404).send("no file choosen");
  }
  let regex = new RegExp(req.body.name, "i");
  const newMovie = req.file.filename;

  console.log(req.file.filename);

  const data = await animeModel.findOne({ title: regex });

  if (!data) {
    return res.status(404).send("Data not found");
  }

  data.movie = newMovie;

  await data.save();

  res.redirect("/admin/upload/")
});

module.exports = router;
