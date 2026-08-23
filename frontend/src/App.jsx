import { Route, Routes } from "react-router-dom"
import Navbar from "./screen/Navbar"
import Home from "./screen/Home"
import Register from "./components/Register"
import Entries from "./components/Entries"
import { Toaster } from 'react-hot-toast'
import Dashboard from "./screen/Dashboard"
import CreateRegister from "./components/Createregister"
import ViewRegister from "./components/ViewRegister"



const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createregister" element={<CreateRegister />} />
        <Route path="/viewregister/:id" element={<ViewRegister />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App