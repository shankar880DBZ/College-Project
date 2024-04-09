var express = require("express");
const router = express.Router(); // Changed from express() to express.Router()

const passport = require("passport");
const localStrategy = require("passport-local");
const userModel = require("../routes/users");

// schemas
const animeModel = require("./animeSchema");
const movieModel = require("./movieSchema");
const seriesModel = require("./seriesSchema");
const movieSchema = require("./movieSchema");
// schemas

passport.use(new localStrategy(userModel.authenticate()));




// Home Section Start

router.get("/", function (req, res) {
  res.render("login", { error: req.flash("error") });
});

router.get("/home", isLoggedIn, async function (req, res) {
  const slideMovie = await movieModel.find({ slide: true });
  const movie = await movieModel.find();
  const topMovie = await movieModel.find({ top: true });
  const latestMovie = await movieModel.find({ latest: true });
  const latestSeries = await seriesModel.find({ latest: true });
  const series = await seriesModel.find();
  const specialAnime = await animeModel.find({ special: true, title: "Your Name" });
  const latestAnime = await animeModel.find({ latest: true });

  res.render("index", { slideMovie: slideMovie, specialAnime: specialAnime, topMovie: topMovie, latestMovie: latestMovie, latestSeries: latestSeries, latestAnime: latestAnime, movie: movie, series: series });
});

// more section start
router.get("/home/more/latestMovies", isLoggedIn, (req, res) => {
  res.render("./more/home/latestMovies");
});
router.get("/home/more/latestSeries", isLoggedIn, (req, res) => {
  res.render("./more/home/latestseries");
});
router.get("/home/more/latestAnime", isLoggedIn, (req, res) => {
  res.render("./more/home/latestAnime");
});
router.get("/home/more/Movies", isLoggedIn, (req, res) => {
  res.render("./more/home/homeMovie");
});
router.get("/home/morenull/Series", isLoggedIn, (req, res) => {
  res.render("./more/home/homeseries");
});
// more section end

router.get("/home/Video-Player/:slug", async (req, res) => {
  var video;
  const movies = await movieModel.findOne({ title: req.params.slug });
  const series = await seriesModel.findOne({ title: req.params.slug });
  const anime = await animeModel.findOne({ title: req.params.slug });
  if (movies) {
    video = movies;
  }
  else if (series) {
    video = series;
  }
  else if (anime) {
    video = anime;
  }
  else {
    console.log("No video found");
  }
  res.render("./player/video-player", { video: video });
});

router.post("/register", (req, res) => {
  var userData = new userModel({
    username: req.body.username,
    email: req.body.email,
  });
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true,
  }),
  function (req, res) { }
);

router.get("/logout", async (req, res, next) => {
  await req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // Corrected typo
    return next();
  }
  res.redirect("/");
}

// Home Section End

// movie section start
router.get("/Movies", isLoggedIn, async function (req, res) {
  const slideMovie = await movieModel.find({ slide: true });
  const topMovie = await movieModel.find({ top: true });
  const latestMovie = await movieModel.find({ latest: true });
  const movie = await movieModel.find();

  res.render("Movies", { slideMovie: slideMovie, topMovie: topMovie, latestMovie: latestMovie, movie: movie });
});
router.get("/Movies/more", isLoggedIn, function (req, res) {
  res.render("./more/movies/moviesMore");
});
router.get("/Movies/more/latestMovies", isLoggedIn, function (req, res) {
  res.render("./more/movies/latestMovies");
});
router.get("/Movies/more/topMovies", isLoggedIn, function (req, res) {
  res.render("./more/movies/topMovies");
});
// movie section end

// series section start
router.get("/Series", isLoggedIn, async function (req, res) {
  const slideSeries = await seriesModel.find({ slide: true });
  const topSeries = await seriesModel.find({ top: true });
  const popularSeries = await seriesModel.find({ popular: true });
  const topPicSeries = await seriesModel.find({ top: true, popular: true, latest: true });
  const latestSeries = await seriesModel.find({ latest: true });

  res.render("Series", { slideSeries: slideSeries, topSeries: topSeries, popularSeries: popularSeries, topPicSeries: topPicSeries, latestSeries: latestSeries });
});
router.get("/Series/more/latestSeries", isLoggedIn, function (req, res) {
  res.render("./more/series/latestSeries");
});
router.get("/Series/more/popular", isLoggedIn, function (req, res) {
  res.render("./more/series/popular");
});
router.get("/Series/more/topseries", isLoggedIn, function (req, res) {
  res.render("./more/series/toppicseries");
});
// series section start

// anime section start
router.get("/Anime", isLoggedIn, async function (req, res) {
  const slideAnime = await animeModel.find({ slide: true });
  const topAnime = await animeModel.find({ top: true });
  const popularAnime = await animeModel.find({ popular: true, movieTrue: true });
  const latestAnime = await animeModel.find({ latest: true, movieTrue: false });
  const animeMovie = await animeModel.find({ movieTrue: true });
  const specialAnime = await animeModel.find({ special: true, top: true, popular: true, title: "grave of the fireflies" });

  res.render("anime", { slideAnime: slideAnime, topAnime: topAnime, popularAnime: popularAnime, latestAnime: latestAnime, animeMovie: animeMovie, specialAnime: specialAnime });
});
router.get("/Anime/more/Movie", isLoggedIn, function (req, res) {
  res.render("./more/anime/animeMovie");
});
router.get("/Anime/more/popular", isLoggedIn, function (req, res) {
  res.render("./more/anime/animePopular");
});
router.get("/Anime/more/latestMovies", isLoggedIn, function (req, res) {
  res.render("./more/anime/latestAnimeMovies");
});
// anime section end

router.get("/Contact", function (req, res) {
  res.render("contact");
});

router.get("/About", function (req, res) {
  res.render("about");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get("/Subscription", isLoggedIn, function (req, res) {
  res.render("subscription");
});

module.exports = router;
