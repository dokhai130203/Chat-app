const UserModel = require("../models/UserModel")

async function checkEmail(request, response) {
    try {
        const { email } = request.body

        // Check email format before querying
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if(!emailRegex.test(email)) {
            return response.status(400).json({
                message : "Invalid email format",
                error : true
            });
        }

        const user = await UserModel.findOne({ email }).select("-password -sensitiveField") 

        if (!user) {
            return response.status(400).json({
                message : "User does not exist",
                error : true
            });
        }
        return response.status(200).json({
            message : "Email verified",
            data : user,
            success : true
        });
        
    } catch (error) {
        console.log("Error verifying email: ", error)
        return response.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

module.exports = checkEmail