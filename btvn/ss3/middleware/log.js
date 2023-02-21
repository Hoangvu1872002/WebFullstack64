const logURL = function (req, res, next){
    console.log('url:',req.url);
    console.log('method:', req.method);
    next();
  }
  module.exports = logURL;