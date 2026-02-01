import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>

        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
