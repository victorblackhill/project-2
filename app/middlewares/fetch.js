// This file contains helper middlewares that fetch in the recipe DB from a request
// always recieve res,req,next as input
// always "pass the ball with next"


function isEmpty(obj) {
  
  for(var prop in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
    //info here https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

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
        const request =  !req.request || isEmpty(req.request) ? !req.body || isEmpty(req.body) ? {} : req.body : req.request 
        
        //check if the request is empty
        const searched = isEmpty(request)? await myModule.find() : await myModule.find(request)
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

    update: async function(req,res,next){
      try{
        request = req.request ? req.request : req.body
        const updated = await myModule.findByIdAndUpdate(request._id,request,{new:true})
        console.log(updated)
        req[key] = {...updated.toObject()}
        console.log("updated in fetch",key,req[key])
        next()
      }catch(err){
        next(err)
      }
    },

  };
};


module.exports = myFetch;
