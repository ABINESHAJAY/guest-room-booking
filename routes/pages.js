const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/users");
router.get(["/", "/login"], (req, res) => {

  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});


router.get("/home", userContoller.isLoggedIn, (req, res) => {
  
  if (req.user) {
    res.render("home", { user: req.user });
  } else {
    res.redirect("/login");
  }
});
router.get("/booking", userContoller.isLoggedIn, (req, res) => {
  
  if (req.user) {
    res.render("booking", { user: req.user });
  } else {
    res.redirect("/booking");
  }
});


module.exports = router;