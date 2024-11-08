import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import CheckOtpPage from "../pages/CheckOtpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const router = createBrowserRouter([
{
    path : "/",
    element : <App/>,
    children : [
        {
            path : "register",
            element : <AuthLayouts><RegisterPage/></AuthLayouts>
        },
        {
            path : "email",
            element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path : "password",
            element : <AuthLayouts><CheckPasswordPage/></AuthLayouts>
        },
        {
            path : "forgot-password",
            element : <AuthLayouts><ForgotPasswordPage/></AuthLayouts>
        },
        {
            path : "check-otp",
            element : <AuthLayouts><CheckOtpPage/></AuthLayouts>
        },
        {
            path : "reset-password",
            element : <AuthLayouts><ResetPasswordPage/></AuthLayouts>
        },
        {
            path : "",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router