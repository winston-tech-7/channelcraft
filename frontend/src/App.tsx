import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Gallery } from "./pages/Gallery";
import { Settings } from "./pages/Settings";

const navStyle: React.CSSProperties = {
  position: "sticky",
  bottom: 0,
  padding: 12,
  display: "flex",
  justifyContent: "space-around",
  borderTop: "1px solid #ddd",
  background: "#fff"
};

function App() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", minHeight: "100vh", background: "#f5f5f5" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <nav style={navStyle}>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
}

export default App;
