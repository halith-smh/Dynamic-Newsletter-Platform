import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:4000/api';

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Index from "./pages/home/Index";
import Editor from "./pages/editor/Editor";
import PostApprove from "./pages/admin/PostApprove";

import Newsletter from "./pages/public/Newsletter";
import Editors from "./pages/public/Editors";
import TopReaders from "./pages/public/TopReaders";
import Profile from "./pages/public/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign-up" element={<Register />} />
        <Route index path="/sign-in" element={<Login />} />

        {/* editor route  */}
        <Route path="/add-content" element={<Editor />} />

        {/* admin route */}
        <Route path="/admin/dashboard" element={<PostApprove />} />

        {/* public routes - common routes  */}
        <Route path="/newsletter/:date" element={<Newsletter />} />
        <Route path="/editors" element={<Editors />} />
        <Route path="/top-readers" element={<TopReaders />} />
        <Route path="/profile" element={<Profile />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
