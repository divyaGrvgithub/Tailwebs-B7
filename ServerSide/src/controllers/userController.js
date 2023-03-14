const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {
    try {
        let userData = req.body

        const checkUnique = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
        if (checkUnique) {
            if (checkUnique.email == userData.email){ 
                return res.status(400).send({ status: false, message: "email already exist" })}
            if (checkUnique.phone == userData.phone){
                return res.status(400).send({ status: false, message: "phone already exist" })}
        }

        const createdUser = await userModel.create(userData);
        res.status(201).send({ status: true, message: "successfully created", data: createdUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const login = async function (req, res) {
    try {
        let { email, password } = req.body

        let isUserExist = await userModel.findOne({ email: email, password: password })
        if (!isUserExist)
            return res.status(401).send({ status: false, message: "email and password doesn't exist" })

        const userToken = jwt.sign({ 
            userId: isUserExist._id }, 
            "Tailwebs secret key", { expiresIn: 1800000 })

        const userTokenData = jwt.decode(userToken)
        res.setHeader['x-api-key'] = userTokenData

        return res.status(200).send({status: true,message: 'Success',
        data: {
                token: userToken,
                ...userTokenData
            }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};

const logout = async (req, res) => {
    res.removeHeader('x-api-key')
    return res.status(500).send({ status: true, message: "Logout Successfully" })

}

module.exports = { createUser, login, logout }