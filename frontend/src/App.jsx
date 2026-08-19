import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./screen/Navbar"
import Home from "./screen/Home"
import Register from "./components/Register"
import Entries from "./components/Entries"
import Login from "./screen/Login"
import Signup from "./screen/Signup"
import { Toaster } from 'react-hot-toast'
import Dashboard from "./screen/Dashboard"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader"
import Getregister from "./components/Getregister"


const App = () => {

  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) {
    return <PageLoader />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={!authUser ? <Home /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={authUser ? <Register /> : <Navigate to="/login" replace />} />
        <Route path="/entries" element={authUser ? <Entries /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/dashboard" replace />} />
        <Route path="/getregister" element={authUser ? <Getregister /> : <Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App