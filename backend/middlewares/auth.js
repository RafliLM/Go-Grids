const Users = require('../models/user')
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        if(!req.headers.authorization)
            return res.status(401).json({message : "Unauthorized"})
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err)
                return res.status(401).json({message : "Unauthorized"})
            const user = await Users.findById(decoded.id)
            if(user){
                req.user = user
                next()
            }
            else{
                res.status(401).json({message : "Unauthorized"})
            }
        })
    } catch (error) {
        res.status(401).json({message : error.message})
    }
}

module.exports = verifyToken