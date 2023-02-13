const jwt = require('jsonwebtoken');

exports.CheckAuth =async(req,res,next) => {
    try{
    let token = req.headers.token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded;
    next();
    }
    catch(error) {
        return res.status(401).json({status:"failed",message:"Authorization failed"});
    }
}

exports.check_admin =async(req,res,next) => {
    try{
        let token = req.headers.token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decoded;
        if(decoded.category == 'admin') 
        {
            req.userMessage="passed";
            next();
        }
        else {
            return res.status(422).json({status:"failed",message:"Normal user can't create another user"});
        }
    }
    catch(error) {
       req.userMessage="failed";
       next();
    }
}