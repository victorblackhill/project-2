const { Schema } = require("mongoose")
const seedStuff = require("./../middlewares/seedStuff")
const RecipeModel = require("./../models/Recipe.model")

console.log(RecipeModel)

const recipesSeed = [
    {
        name : "Simple Chemex",
        temperature :91,
        grind:19,
        weight:18,
        water:"Brita filtrée",
        extraction:"Chemex",
        description:"Recette simple, à préparer avec votre chemex 3 tasses",
        infusion:[
            {volume:100,
                time:40
            },
            {volume:100,
                time:40
            },
            {volume:100,
                time:40
            }
        ]
    },
]

//seed the DB with the recipes seed
seedStuff(recipesSeed,RecipeModel)