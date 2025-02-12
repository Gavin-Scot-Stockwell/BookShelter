import { Outlet } from "react-router-dom"

import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <Navbar/>
        <main className="min-h-full bg-[#e3d4b9]">
          <Outlet />
        </main>
    </>
  )
}

export default App
