// This file contains helper middlewares that fetch in the recipe DB from a request
// always recieve res,req,next as input
// always "pass the ball with next"

const myFetch =  (myModule, key = "myFetch") => {
  return {
    findOne: async function (req, res, next) {
      try {
        const anyOne = await myModule.findOne();
        req[key] = anyOne

        //creates the mongoDB request corresponding to the search
        req.request = {}
        req.request[key] = anyOne._id
        next();
      } catch (err) {
        next(err);
      }
    },

    create: async function (req,res,next){
      try{
        const created = await myModule.create(req.body)
        req[key] = created.toObject()
        next()
      }catch(err){
        next(err)
      }
    },

    //other methods are going to be added here
    find: async function(req,res,next){
      try{
        request = req.request ? req.request : req.body
        const searched = await myModule.find(request)
        req[key] = searched
        next()
      }catch(err){
        next(err)
      }
    },

    delete: async function(req,res,next){
      try{
        request = req.request ? req.request : req.body
        const deleted = await myModule.findOneAndDelete(request)
        req[key] = {...deleted.toObject()}
        console.log("deleted in fetch",key,req[key])
        next()
      }catch(err){
        next(err)
      }
    },

  };
};


module.exports = myFetch;
