import { useDispatch } from "react-redux"
import authService from './appwrite/auth'
import {useState, useEffect } from "react"
import { login, logout } from "./features/authSlice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"

function App() {
  // initialize loading to true as currentUser is called everytime website loads so we show a loading icon for that duration
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData) {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
