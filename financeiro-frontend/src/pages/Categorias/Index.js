import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/index.css";
import Categoria from "./Categoria";
import New from "./New";
import Edit from "./Edit";
import Finantial from "./Finantial";

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
        <Route path="index" element={<Categoria />} />
        <Route path="new" element={<New />} />
        <Route path={`edit/:id`} element={<Edit />} />
        <Route path={`financeiro/:id`} element={<Finantial />} />
      </Routes>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
}
