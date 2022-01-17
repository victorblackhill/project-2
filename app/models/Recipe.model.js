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

const RecipeModel = model("recipes",recipeSchema)

module.exports = RecipeModel