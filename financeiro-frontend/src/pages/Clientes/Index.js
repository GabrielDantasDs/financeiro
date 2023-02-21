import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/index.css";
import Cliente from "./Cliente";
import New from "./New";

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="my_container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Routes>
        <Route path="index" element={<Cliente />} />
        <Route path="new" element={<New />} />
      </Routes>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
}
