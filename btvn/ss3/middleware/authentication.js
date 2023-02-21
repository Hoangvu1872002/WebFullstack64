const authentication = function (req, res, next){
    const userName = req.body.userName;
    const password = req.body.password;
  
  if(userName === "admin" && password === "admin"){
    next();
  }else{
    res.status(401).send("error!")
  }
}
  module.exports = authentication;