import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Error from "./components/Error";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Register from "./components/Register";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "RichardBoyz";
  }, []);
  return (
    // <div className="App">
    //   <Login></Login>
    // </div>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        {/* Error page */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
