import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./telas/Login.tsx";
import Formulario from "./telas/Formulario.tsx";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Formulario /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
