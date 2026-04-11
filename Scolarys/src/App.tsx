import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Accueil";
import LicencePortal from "./pages/LicenceActivate";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/"              element={<AuthPage />} />
        <Route path="/accueil"       element={<Homepage />} />
        <Route path="/LicencePortal" element={<LicencePortal />} />

        <Route
          path="*"
          element={
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#0d1018" }}>
              <p style={{ color:"rgba(255,255,255,0.3)", fontFamily:"'IBM Plex Mono', monospace", fontSize:13 }}>
                Page non trouvée
              </p>
            </div>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;