import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    // call useEffect anytime authstatus, we navigate to some other page or authentication changes
    useEffect(()=>{
        // user wants to login but authstatus is false means u are not logged in so go to login
        if(authentication && authStatus!==authentication) navigate('/login')

        // user dont want to access but authStatus is true so navigate to home as u are logged in
        else if(!authentication && authStatus!==authentication) navigate('/')
        setLoader(false)
    }, [authStatus, navigate, authentication])


  return (
    // is loader is true then show loading
    loader ? <h1>Loading...</h1> : {children}
  )
}

