import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Index from "./pages/home/Index";
import Editor from "./pages/editor/Editor";
import PostApprove from "./pages/admin/PostApprove";
import Newsletter from "./pages/public/Newsletter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Index />} />
        <Route path="/sign-up" element={<Register />} />
        <Route index path="/sign-in" element={<Login />} />

        {/* editor route  */}
        <Route path="/add-content" element={<Editor/>} />

        {/* admin route */}
        <Route path="/admin/dashboard" element={<PostApprove/>} />

        {/* public routes - common routes  */}
        <Route path="/newsletter/:date" element={<Newsletter/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
