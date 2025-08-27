import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BecomeGuide from "./pages/BecomeGuide";
import FindGuide from "./pages/FindGuide";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-guide" element={<BecomeGuide />} />
        <Route path="/find-guide" element={<FindGuide />} />
      </Routes>
    </Router>
  );
}
