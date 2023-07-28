import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../style/index.css";
import List from "./List";
import New from "./New";
import Edit from "./Edit";

export default function Index() {
  return (
    <div className="my_container">
      <Routes>
        <Route path="index" element={<List />} />
        <Route path="new" element={<New />} />
        <Route path={`edit/:id`} element={<Edit />} />
      </Routes>
    </div>
  );
}
