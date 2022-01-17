
const mySender = (key) => {
  return async (req, res, next) => {
        try {
          console.log("//sender ------ // - ->",req[key])  
          res.send(req[key]);
          //next()
        } catch (err) {
          next(err);
        }
      };
  }

const myRender = (viewRoute, data ="",key = "" )=>{
  return async (req, res, next)=>{
        try{
          //const dataObj = {}
          //dataObj[key] = req[data]
          //console.log(req[data].toObject())
          res.render(viewRoute,req[data].toObject())

    }catch(err){
      next(err)
    }
  }
}

module.exports = {
  mySender:mySender,
  myRender:myRender
}
