var jwt = require('jsonwebtoken');

function checkToken(req, res, next){
    const userToken = req.get('authorization');

    if(userToken){
        let token = userToken.slice(7);

        jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
            if(err){
                return res.status(501).json({
                    msg: 'Invalid token',
                    error: 'Invalid token'
                })
            }
            next(decoded);

        })
        
    }else{
        return res.status(501).json({
            msg: 'Unauthorized user',
            error: 'Unauthorized user'
        })
    }
}

module.exports = checkToken