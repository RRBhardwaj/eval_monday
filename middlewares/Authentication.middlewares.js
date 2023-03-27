const jwt = require("jsonwebtoken");

const Authetication = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"rishi",(err,decoded) => {
            if(decoded){
                const userID = decoded.user_ID;
                req.body.userID = userID;
                next();
            }else{
                res.status(400).send("Plz Login First");
            }
        })
    }else{
        res.status(400).send("Plz Login First");
    }
}

module.exports = {Authetication};