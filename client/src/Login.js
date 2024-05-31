import React, { useContext } from 'react'
import img from "./assets/voting.png"
import google from "./assets/google.png"
import facebook from "./assets/facebook.png"
import { auth, provider, fbProvider } from './firebase'
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

const Login = () => {
    const { setCurrentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data);
            setCurrentUser(data.user);
            navigate("/");
        })
    }
    const handleFacebookSignin = () => {
        signInWithPopup(auth, fbProvider).then((data) => {
            console.log(data);
            setCurrentUser(data.user);
            navigate("/");
        })
    }
    return (
        <div>
            <div className=''>
                <div className="flex justify-center mt-[-100px] ">
                    <img src={img} alt="" />
                </div>
                <div className='mt-[-100px]'>
                    <p className='m-auto text-center w-[900px]'>An online voting system is a software platform that allows groups to securely conduct votes and elections. High-quality online voting  systems balance ballot security, accessibility, and the overall requirements of an organization's voting event.
                    </p>
                </div>
                <div className='flex justify-center mt-4 text-white gap-6'>
                    <div onClick={handleGoogleSignin} className='bg-[#4D82E5] w-[300px] flex items-center justify-evenly cursor-pointer rounded-md gap-3 p-2'>
                        {/* icon */}
                        <img className='w-[35px]' src={google} alt="" />
                        <p>Sign in with Google</p>
                    </div>
                    <div onClick={handleFacebookSignin} className='bg-[#375495] w-[300px] flex items-center justify-evenly cursor-pointer rounded-md gap-3 p-2'>
                        {/* icon */}
                        <img className='w-[35px]' src={facebook} alt="" />
                        <p>Sign in with Facebook</p>
                    </div>
                </div>

                <div>
                    <p className='text-xs text-gray-500 text-center mt-16'>Developed & Designed by <a href="https://linktr.ee/rajamrit">Amrit Raj</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login
