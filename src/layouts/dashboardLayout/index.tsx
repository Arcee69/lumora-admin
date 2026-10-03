import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

const DashboardLayout = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Sidebar />
            </div>
            <div>
                <Outlet />
            </div>
           
        </div>
    )
}

export default DashboardLayout