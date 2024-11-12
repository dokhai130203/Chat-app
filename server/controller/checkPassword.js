const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword (request, response) {
    try {
        const { password, userId } = request.body

        const user = await UserModel.findById(userId)
        if (!user) {
            return response.status(400).json({
                message : "User not found",
                error : true
            });
        }
        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            return response.status(400).json({
                message : "Please check password",
                error : true
            });
        }

        const tokenData = {
            id : user._id,
            email : user.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn : '1d'})

        const cookieOptions = {
            httpOnly : true,
            secure : true
        }

        if(password.length < 8) {
            return response.status(400).json({
                message : "Password must have at least 8 characters",
                error : true
            });
        }

        return response.cookie('token', token, cookieOptions).status(200).json({
            message : "Login successfully",
            token : token,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkPassword