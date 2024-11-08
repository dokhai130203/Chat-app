const UserModel = require("../models/UserModel")

async function verifyOtp (request, response) {
    const { email, otp } = request.body
    const user = await UserModel.findOne({ email })

    if(!user || user.otp !== otp || Date.now() > user.otpExpires) {
        return response.status(400).json({
            message : "Invalid or expired OTP",
            success : false
        });
    }

    //Delete OTP after successful authentication
    user.otp = null
    user.otpExpires = null
    await user.save()

    return response.status(200).json({
        message : "OTP verified successfully",
        success : true
    });
}

module.exports = verifyOtp