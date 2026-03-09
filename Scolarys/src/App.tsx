import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Accueil"; 
import LicencePortal from "./pages/LicenceActivate"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/LicencePortal" element={<LicencePortal />} />


        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <p className="text-gray-600">Page non trouvée</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;