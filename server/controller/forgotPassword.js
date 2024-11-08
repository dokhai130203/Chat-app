const UserModel = require("../models/UserModel")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

async function forgotPassword(request, response) {
    try {
        const { email } = request.body // lấy email từ yêu cầu của user
        const user = await UserModel.findOne({ email }) // tìm user trong db bằng email đã nhập

        if(!user) {
            return response.status(400).json({
                message : "User with this email does not exit",
                error : true
            })
        };

        const otp = crypto.randomInt(10000, 99999).toString()
        user.otp = otp
        user.otpExpires = Date.now() + 10 * 60 * 1000 // otp expires in 10 mins
        await user.save()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // địa chỉ email của bạn
                pass: process.env.EMAIL_PASS  // mật khẩu hoặc mật khẩu ứng dụng
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password reset OTP",
            text: `Your OTP password reset is ${otp}`
        });

        return response.status(200).json({
            message : "OTP send to your email",
            success : true
        });
    } catch (error) {
        return response.status(500).json({
            message : error.message || "Something went wrong",
            error : true
        });
    }
}

module.exports = forgotPassword