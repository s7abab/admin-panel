const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      console.log(req.body)
      let user
      if(req?.body?.token){
        user =  jwt.verify(req.body.token,process.env.JWT_SECRET)
        
      }else{
        user =  jwt.verify(req.query.token,process.env.JWT_SECRET)
      }
        // console.log(user)
        req.auth=user
        next()
    } catch (error) {
      res.status(403).send({
        success: false,
        error,
      });
    }
  },
};
