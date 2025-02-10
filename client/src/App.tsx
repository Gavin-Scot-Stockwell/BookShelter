import { Outlet } from "react-router-dom"

import Navbar2 from "./components/Navbar2"

function App() {
  return (
    <>
      <Navbar2 />
        <main>
          <Outlet />
        </main>
    </>
  )
}

export default App
