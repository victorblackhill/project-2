//all functions render or send properties of the req, called the data keys
// Example : dataKey ["myFetch","body"] => res.Send({body: req.body, myFetch: req.myFetch})

const mySender = (dataKeys = ["myFetch"]) => {
  return async (req, res, next) => {
    try {
      
      let sentData = {}
      dataKeys.forEach((key)=>{ sentData[key] = req[key] })
      //console.log("//sender ------ // - ->", sentData);
      res.send(sentData);
      //next()
    } catch (err) {
      next(err);
    }
  };
};

const myRender = (viewRoute, dataKeys = ["myFetch"]) => {

  return async (req, res, next) => {

    try {

      let sentData = {}
      dataKeys.forEach((key)=>{ sentData[key] = req[key] })

      res.render(viewRoute, sentData);
    } catch (err) {
      next(err);
    }
  };
};

const myRedirect = (viewRoute) => {
  return async (req, res, next) => {
    try {
      res.redirect(viewRoute);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  mySender: mySender,
  myRender: myRender,
  myRedirect: myRedirect,
};
