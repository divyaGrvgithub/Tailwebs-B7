const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const authentication = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']

        if (!token) return res.status(400).send({ status: false, message: "Token must be required" })

        jwt.verify(token, "Tailwebs secret key", function (err, decodedToken) {

            if (decodedToken) {
                req.userId = decodedToken.userId
                next()
            } else {
                return res.status(401).send({ status: false, message: err.message })

            }
        });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const authorisation = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key']
        const userIdInToken = jwt.decode(token).userId

        const studentId = req.params.studentId

        if (!mongoose.isValidObjectId(studentId)) {
            return res.status(400).send({status: false,message: "Please enter Valid Object Id"})
        }
        next()
    }
    catch (err) {
        return res.status(500).send({status: false,message: err.message})
    }
}

module.exports = { authentication, authorisation}
