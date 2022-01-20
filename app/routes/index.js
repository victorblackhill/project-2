var express = require("express");
var router = express.Router();
const RecipeModel = require("./../models/Recipe.model");
const CommentModel = require("./../models/Comment.model")
const myFetch = require("../middlewares/fetch");
const mySender = require("../middlewares/renderHelp").mySender;
const myRender = require("../middlewares/renderHelp").myRender;
const myRedirect = require("../middlewares/renderHelp").myRedirect;
const { Router } = require("express");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/recipes/:id([a-f0-9]{24})", 
 async (req,res,next) => {try {
    req.body = {_id:req.params.id}
    console.log(req.body)
    next()
  }catch(err){
    next(err)}
},
myFetch(RecipeModel,"recipes").find,
async (req,res,next)=>{
  try{
    console.log(req.recipes[0]._id.valueOf())
    req.body = {recipe:req.recipes[0]._id.valueOf()}
    console.log(req.body)
    next()
  }catch(err){
    next(err)
  }
},
myFetch(CommentModel,"comments").find,
myRender("recipes/recipe.hbs",["recipes","comments"])

)

router.get("/recipes/details",
  myFetch(RecipeModel,"recipes").findOne,
  myFetch(CommentModel,"comments").find,//mySender(["recipes","comments"]),
  myRender("recipes/recipe.hbs",["recipes","comments"])
)

router.get(
  "/recipes/any",
  myFetch(RecipeModel,"recipes").findOne,
  myFetch(CommentModel,"comments").find,
  //mySender(["recipes","comments"]),
  myRender("recipes/recipe.hbs",["recipes","comments"])
);



router.get("/recipes/index",
myFetch(RecipeModel,"recipes").find, //mySender(["recipes","body"]),
myRender("recipes/allRecipes.hbs",["recipes","body"])
  
)



router.post("/comment/:id([a-f0-9]{24})",
myFetch(CommentModel).create, // être 
mySender())


// A compléter
router.post("/comment/delete",myFetch(CommentModel).delete,mySender())


router.post("/comment/update",myFetch(CommentModel).update,mySender())
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