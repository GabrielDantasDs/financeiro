import { Routes, Route } from "react-router-dom";
import "../../style/index.css";
import New from "./New";
import Edit from "./Edit";
import List from "./List";

export default function Index() {

  return (
    <div className="my_container">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="new" element={<New />} />
        <Route path={`edit/:id`} element={<Edit />} />
      </Routes>
    </div>
  );
}
