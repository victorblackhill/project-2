// This file contains helper middlewares that fetch in the recipe DB from a request
// always recieve res,req,next as input
// always "pass the ball with next"

const myFetch =  (myModule,newOne) => {
  return {
    any: async function (req, res, next) {
      try {
        const anyOne = await myModule.findOne();
        req.myFetch = anyOne
        next();
      } catch (err) {
        next(err);
      }
    },

    create: async function (req,res,next){
      try{

        const created = await myModule.create(newOne)
        req.myFetch = created
        next()
      }catch(err){
        next(err)
      }
    }
    //other methods are going to be added here


  };
};

module.exports = myFetch;
