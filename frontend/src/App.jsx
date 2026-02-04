import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import './App.css';
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/AdminJobs";
function App() {
  return (
    <Router>
      <Routes>

        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminJobs/>} />

      </Routes>
    </Router>
  );
}

export default App;
