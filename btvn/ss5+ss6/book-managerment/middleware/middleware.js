const jwt = require('jsonwebtoken');

const joint  = function (req, res, next){
    const token = req.header('authToken');

    try {
        const checkToken = jwt.verify(token,'mabimat');
        req.user = checkToken;
        next();
    }catch(e){
        res.status(400).send('erroraaaaa');
    }
}

const  emismatchedr = function (req, res, next){
    const token = req.header('authToken');

    try {
        const checkToken = jwt.verify(token,'mabimat');
        req.user = checkToken;
        next();
    }catch(e){       
        next();
    }
}

module.exports.joint = joint
module.exports.emismatchedr = emismatchedr