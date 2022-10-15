const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
module.exports = function(req, res, next)  {
    // GET thE TOKEN FROM HESADER
    const token = req.header('x-auth-token')
    // Check if not token
    if(!token){
        return res.status(401).json({ msg: 'no Token, access denied' })
    }
    try {
        const decoded  = jwt.verify(token, JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Token is not valid' })
    }
}