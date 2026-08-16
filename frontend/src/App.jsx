import { Route, Routes } from "react-router-dom"
import Navbar from "./screen/Navbar"
import Home from "./screen/Home"
import Register from "./components/Register"
import Entries from "./components/Entries"
import Login from "./screen/Login"
import Signup from "./screen/Signup"


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App