import { useNavigate } from "react-router-dom";
import { AdminFooter, Header, MainContent, SideBar } from "../index";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AdminDashboard() {
  return (
    <div className="w-full h-screen flex flex-col justify-between overflow-hidden">
      <Header />
      {/* Adjusted below: flex-col on mobile/tablet, lg:flex-row on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch justify-start overflow-hidden">
        <SideBar />
        <MainContent />
      </div>
      <AdminFooter />
    </div>
  );
}

export default AdminDashboard;
