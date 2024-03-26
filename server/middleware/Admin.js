const jwt = require('jsonwebtoken');


const verifyAdmin = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"];
        if (!token){
            return res.status(401).send("Unauthorized: Token not provided");
        }

        const d_token = jwt.verify(token, process.env.JWT_TOKEN);
        
        if(d_token.role === "admin"){
            next();
        }else{
            return res.status(401).send("Permission Denied");
        }
        
    }catch(error){
        res.status(401).send({error});
    }
}

module.exports = {verifyAdmin};