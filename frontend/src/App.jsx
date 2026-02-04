import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import RSVP from "./pages/rsvp";
import AdminLogin from "./pages/adminlogin";
import AdminDashboard from "./pages/admindashboard";
import ThankYou from "./pages/thankyou";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/thank-you" element={<ThankYou />} />

    </Routes>
  );
}
