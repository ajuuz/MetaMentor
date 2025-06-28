import Header from "@/components/admin/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="pt-20">
      <Header/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
