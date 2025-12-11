import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../style/index.css";
import Dashboard from "./Dashboard";
import { Navigate, Route, Routes } from "react-router";

export default function Index(props) {
  return (
    <div className="w-100">
      <Dashboard />
    </div>
  );
}
