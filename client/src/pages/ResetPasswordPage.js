import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

function ResetPasswordPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const email = location?.state?.email

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/reset-password`

    if(password !== confirmPassword) {
      toast.error('Password do not match')
      return;
    }

    try {
      const response = await axios.post(URL, { email, password })

      if(response.data.success) {
        toast.success('Password reset successfully')
        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error resetting password')
    }
  }

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage