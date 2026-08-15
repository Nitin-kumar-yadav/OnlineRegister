import { Route, Routes } from "react-router-dom"
import Navbar from "./screen/Navbar"
import Home from "./screen/Home"
import Register from "./components/Register"
import Entries from "./components/Entries"


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entries" element={<Entries />} />
      </Routes>
    </>
  )
}

export default App