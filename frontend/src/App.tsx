import type { CSSProperties } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Gallery } from "./pages/Gallery";
import { Settings } from "./pages/Settings";

const shell: CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  paddingBottom: 4
};

const main: CSSProperties = {
  flex: 1,
  padding: "12px 12px 88px"
};

const navWrap: CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  maxWidth: 760,
  margin: "0 auto",
  padding: "10px 12px calc(10px + env(safe-area-inset-bottom, 0px))",
  zIndex: 50,
  pointerEvents: "none"
};

const navBar: CSSProperties = {
  pointerEvents: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  gap: 6,
  padding: "8px 8px",
  borderRadius: 18,
  background: "rgba(15, 23, 42, 0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 -12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
};

const navItemBase: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  padding: "8px 4px",
  borderRadius: 14,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.02em",
  color: "rgba(248, 250, 252, 0.55)",
  transition: "background 0.18s ease, color 0.18s ease, transform 0.12s ease",
  WebkitTapHighlightColor: "transparent"
};

const navItemActive: CSSProperties = {
  color: "#fff",
  background: "linear-gradient(145deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.88))",
  boxShadow: "0 4px 18px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
};

const navIcon: CSSProperties = {
  fontSize: 20,
  lineHeight: 1
};

type NavItemProps = { to: string; icon: string; label: string };

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink to={to} style={({ isActive }) => ({ ...navItemBase, ...(isActive ? navItemActive : {}) })}>
    <span style={navIcon} aria-hidden>
      {icon}
    </span>
    <span>{label}</span>
  </NavLink>
);

function App() {
  return (
    <div style={shell}>
      <main style={main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <div style={navWrap}>
        <nav style={navBar} aria-label="Main navigation">
          <NavItem to="/" icon="🏠" label="Home" />
          <NavItem to="/create" icon="✨" label="Create" />
          <NavItem to="/gallery" icon="🖼" label="Gallery" />
          <NavItem to="/settings" icon="⚙️" label="Settings" />
        </nav>
      </div>
    </div>
  );
}

export default App;
