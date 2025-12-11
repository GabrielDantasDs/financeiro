import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../style/index.css";
import New from "./New";
import Edit from "./Edit";
import Finantial from "./Finantial";
import List from "./List";

export default function Index() {

  return (
    <div className="my_container">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="new" element={<New />} />
        <Route path={`edit/:id`} element={<Edit />} />
        <Route path={`financeiro/:id`} element={<Finantial />} />
      </Routes>
    </div>
  );
}
