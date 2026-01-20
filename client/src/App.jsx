import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/user/Home";
// import Dashboard from "./pages/admin/Dashboard";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
