import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
const SERVER = import.meta.env.VITE_SERVER;
import urlcat from "urlcat";
import Login from "./pages/Login";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import CreateHolidayForm from "./pages/CreateHolidayForm";
import { IToken } from "./Interface";
import HolidaysTable from "./pages/HolidaysTable";

const App = () => {
  const [token, setToken] = useState("");
  console.log(token);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HolidaysTable />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/secret" element={<CreateHolidayForm token={token} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
