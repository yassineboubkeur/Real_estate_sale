import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/header/header";
// import RegisterPage from "./components/Authentication/register";
// import Home from "./components/Home/home";
import Layout from "./componentss/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactUsPage from "./pages/ContactPage";
import PropertiesPage from "./pages/PropertiesPage";
import PrivacyPolicyPage from "./pages/PrivacyPage";

const App = () => {
  return (
    <div>
       <Router>
        <Routes>
          {/* Route principale qui utilise Layout */}
          <Route path="/" element={<Layout />}>
            <Route index path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Route>
        </Routes>
    </Router>
    </div>
  );
};

export default App;
