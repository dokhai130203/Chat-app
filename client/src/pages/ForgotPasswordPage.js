import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`

    try {
      const response = await axios.post(URL, { email })

      if(response?.data?.success) {
        toast.success('OTP send to your email!')
        navigate('/check-otp', {
          state : { email }
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error sending OTP')
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h2 className='font-semibold text-lg mb-4 text-center'>Forgot Password</h2>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email :</label>
            <input 
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={email}
              onChange={handleOnChange}
              required
            />
          </div>
          <button type='submit' className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Send OTP
          </button>
        </form>

        <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>

      </div>
    </div>
  )
}

export default ForgotPasswordPage