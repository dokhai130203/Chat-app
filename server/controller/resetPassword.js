const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs')

async function resetPassword (request, response) {
    try {
        const { email, password } = request.body
        const user = await UserModel.findOne({ email })

        if(!user) {
            return response.status(400).json({
                message : "User not found!",
                success : false
            })
        }

        //Encrypt new password
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword

        user.otp = null
        user.otpExpires = null

        await user.save();

        return response.status(200).json({
            message : "Password reset successfully",
            success : true
        });

    } catch (error) {
        return response.status(500).json({
            message : error.message || "Something went wrong",
            success : false
        });
    } 
}

module.exports = resetPassword