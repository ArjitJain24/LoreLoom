import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()
    // call logout method of authService to logout from the backend and when that promise is resolved we update it in the store also using dispatch
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>(
            dispatch(logout())
        ))   
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn
