import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/index.css";

export default function Index() {

  return (
    <div className="my_container">
      {/* <Routes>
        <Route path="index" element={<Cliente />} />
        <Route path="new" element={<New />} />
        <Route path={`edit/:id`} element={<Edit />} />
        <Route path={`financeiro/:id`} element={<Finantial />} />
      </Routes> */}
    </div>
  );
}
