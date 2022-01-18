//(setofseeds, MongoDB model)
// Empty the collection corresponding to the model
// => seeded set of seeds in the mongoDB model and closes connection

require("dotenv").config()
require("./../config/mongo")
const mongoose = require("mongoose")



const seedStuff = async (seeds,myModel)=>{
    // console.log(myModel)
    try{
        const deleted = await myModel.deleteMany()
        const status = await myModel.find()
        console.log("Status after deleted, contained elements ",status.length)
        const seeded = await myModel.create(seeds)
        console.log("created elements",seeded.length)
        console.log("details >>>>>",seeded)

        
        mongoose.connection.close(()=>{console.log("connection ended successefully")})

    }catch(err){
        console.error(err)
    }

}


module.exports = seedStuff