var express = require("express");
var router = express.Router();
const RecipeModel = require("./../models/Recipe.model");
const myFetch = require("../middlewares/fetch");
const mySender = require("../middlewares/renderHelp").mySender;
const myRender = require("../middlewares/renderHelp").myRender;
const req = require("express/lib/request");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get(
  "/recipes/any",
  myFetch(RecipeModel).any,
  myRender("recipes/recipe.hbs", "myFetch")
);


router.post(
  "/recipes/comment/:id",
  mySender("body")
);

module.exports = router;
