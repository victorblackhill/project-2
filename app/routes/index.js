var express = require("express");
var router = express.Router();
const RecipeModel = require("./../models/Recipe.model");
const CommentModel = require("./../models/Comment.model")
const myFetch = require("../middlewares/fetch");
const mySender = require("../middlewares/renderHelp").mySender;
const myRender = require("../middlewares/renderHelp").myRender;
const myRedirect = require("../middlewares/renderHelp").myRedirect

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get(
  "/recipes/any",
  myFetch(RecipeModel,"recipes").findOne,
  myFetch(CommentModel,"comments").find,
  //mySender(["recipes","comments"]),
  myRender("recipes/recipe.hbs",["recipes","comments"])
);

/*
router.post(
  "/recipes/comment/:id",
  myFetch(CommentModel).create,
  myRedirect("/recipes/any")
);
*/

router.post("/comment/:id([a-f0-9]{24})",
myFetch(CommentModel).create, // être 
mySender())


// A compléter
// puis créer la méthode .delete dans fetch
router.post("/comment/delete",myFetch(CommentModel).delete,mySender())

module.exports = router;


/*

(req, res, next) => {
  if (req.body.content === '') {
    req.body.content = 'No empty comments !'
    next()
  } else {
    next('You did write something')
  }
}

*/