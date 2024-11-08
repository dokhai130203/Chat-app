import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

function CheckOtpPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const email = location?.state?.email // get email from state

  const handleOnChange = (e) => {
    setOtp(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/verify-otp`
    
    try {
      //Send OTP and email to backend for authentication
      const response = await axios.post(URL, { email, otp })

      if(response?.data?.success) {
        toast.success('OTP verified successfully!')
        navigate('/reset-password', {
          state : { email }
        });
      } else {
        toast.error('Invalid OTP, please try again.')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error verifying OTP.')
    }
  }

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="otp">Enter your OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter the OTP sent to your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={otp}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckOtpPage