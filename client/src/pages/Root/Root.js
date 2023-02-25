import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Root() {
  return (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default Root
