import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadFile from '../helpers/uploadFile';
import { IoClose } from "react-icons/io5";

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name : "",
    email : "",
    profile_pic : "",
    online : false,
    _id: ""
  })
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)

  const [message, setMessage] = useState({
    text : "",
    imageUrl : "",
    videoUrl : ""
  })

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(prev => !prev)
  }

  const handleUploadImage = async(e) => {
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file) 

    setMessage(prev => {
      return {
        ...prev,
        imageUrl : uploadPhoto.url
      }
    })
  }

  const handleClearUploadImage = () => {
    setMessage(prev => {
      return {
        ...prev,
        imageUrl : ""
      }
    })
  }

  const handleUploadVideo = async(e) => {
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setMessage(prev => {
      return {
        ...prev,
        videoUrl : uploadPhoto.url
      }
    })
  }

  const handleClearUploadVideo = () => {
    setMessage(prev => {
      return {
        ...prev,
        videoUrl : ""
      }
    }) 
  }
 
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.on('message-user', (data) => {
        setDataUser(data)
      })
    }
  }, [socketConnection,params?.userId, user])



  return (
    <div>
        <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
            <div className='flex items-center gap-4'>
                <Link to={"/"} className='lg:hidden'>
                    <FaAngleLeft size={25}/>
                </Link>
                <div>
                  <Avatar
                    width={45}
                    height={50}
                    imageUrl={dataUser?.profile_pic}
                    name={dataUser?.name}
                    userId={dataUser?._id}
                  />
                </div>
                <div>
                  <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
                  <p className='-mt-2 text-sm'>
                    {
                      dataUser.online ? <span className='text-primary'>online</span>: <span className='text-slate-400'>offline</span>
                    }
                  </p>
                </div>
            </div>

            <div>
              <button className='cursor-pointer hover:text-primary'>
                <HiDotsVertical/>
              </button>
            </div>
        </header>

        {/**show all message */}
        <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative'>

            {/**upload image display */}
            {
              message.imageUrl && (
                <div className='h-full w-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
                  <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage}>
                    <IoClose size={30}/>
                  </div>
                  <div className='bg-white p-3'>
                    <img 
                      src={message.imageUrl}
                      alt='uploadImage'
                      className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                    />
                  </div>
                </div>
              )
            }

            {/**upload video display */}
            {
              message.videoUrl && (
                <div className='h-full w-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
                  <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
                    <IoClose size={30}/>
                  </div>
                  <div className='bg-white p-3'>
                    <video 
                      src={message.videoUrl}
                      className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                      controls
                      muted
                      autoPlay
                    />
                  </div>
                </div>
              )
            }

          Show all message
        </section>

        {/**send message */}
        <section className='h-16 bg-white flex items-center px-4'>
          <div className='relative'>
              <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center h-11 w-11 rounded-full hover:bg-primary hover:text-white'>
                <FaPlus size={20}/>
              </button>

              {/**video & image */}
              {
                openImageVideoUpload && (
                  <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                  <form>
                    <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                      <div className='text-primary'>
                        <FaImage size={18}/>
                      </div>
                      <p>Image</p>
                    </label>
                    <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                      <div className='text-purple-500'>
                        <FaVideo size={18}/>
                      </div>
                      <p>Video</p>
                    </label>

                    <input
                      type='file'
                      id='uploadImage'
                      onChange={handleUploadImage}
                    />
                    
                    <input
                      type='file'
                      id='uploadVideo'
                      onChange={handleUploadVideo}
                    />
                  </form>
                  </div>
                )
              }
          </div>
        </section>
    </div>
  )
}

export default MessagePage