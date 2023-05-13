import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/index.css";
import Dashboard from "./Dashboard";
import { Navigate, Route, Routes } from "react-router";

export default function Index(props) {
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
      <Dashboard />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
}
