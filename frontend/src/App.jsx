import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
