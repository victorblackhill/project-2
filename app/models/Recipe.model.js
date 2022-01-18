const {Schema,model}= require("mongoose")


const pourSchema = new Schema({
    volume:Number,
    time:Number
})

const recipeSchema = new Schema({
    name:{
        type:String,
        unique:true,
    },
    temperature:Number,
    grind:Number,
    weight:Number,
    water:String,
    extraction:String,
    description:String,
    infusion:[pourSchema],
})


//si besoin d'ajouter comments dans recipeModel
// - array de object id qui fait référence à la collection comments
// dans le modèle des comments 
// pour ajouter un comment dans le modèle avec un "push ou (un "pull" de l'array pour le retirer")
// - tradeoff à trouver entre modifier les deux bdd pour faire un update de comment
const RecipeModel = model("recipes",recipeSchema)

module.exports = RecipeModel