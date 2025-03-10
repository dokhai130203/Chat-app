import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { BiUserCircle } from "react-icons/bi";

const CheckEmailPage = () => {
  const [data, setData] = useState({ email : "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const isValidateEmail = (email) => {
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    if(!data.email) {
      toast.error("Email can not be blank");
      return;
    }

    if(!isValidateEmail(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    setLoading(true)

    try {
      const response = await axios.post(URL, data)

      toast.success(response.data.message)

      if(response.data.success) {
        setData({ email : "" })
        navigate('/password', {
          state : response?.data?.data
        })
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again."
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setData({ email : "" })
    }
  };

  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
          <div className='w-fit mx-auto mb-2'>
            <BiUserCircle size={80} />
          </div>
          <h3 className='text-center font-semibold text-lg'>WELCOME TO CHAT APP!</h3>
          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>Email :</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                className='bg-slate-100 px-2 py-1 focus:outline-primary'
                value={data.email}
                onChange={handleOnChange}
                disabled={loading}
                required
              />
            </div>
            <button
              className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              disabled={loading || !data.email}
            >
              {loading ? "Loading..." : "Let's Go"}
            </button>
          </form>
          <p className='my-3 text-center'>
            New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link>
          </p>
        </div>
    </div>
  )
}

export default CheckEmailPage