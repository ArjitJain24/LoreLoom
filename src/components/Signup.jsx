import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Input, Button, Logo} from './index'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {login as authLogin} from '../features/authSlice'




function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm();


    // method to call by handleSubmit when form submitted
    const signup = async (data)=>{
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const UserData = await authService.getCurrentUser()
                if(UserData) dispatch(authLogin(UserData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>

            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

            {/* if account already exists then navigate to login page */}
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>

            {/* if error exist then show error */}
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


            {/* create signup form */}
            <form onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>

                    {/* Input for name */}
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />

                    {/* input for email */}
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}

                    // input for password
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,})}
                    />

                    {/* create button for submit */}
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup
