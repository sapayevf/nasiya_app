import React from "react";
import { Link } from "react-router-dom";
import "./TermsSettings.scss";

const TermsSettings = () => {
  return (
    <div className="terms-settings">
      <div className="settings-header">
        <Link to="/settings" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2>Ommaviy oferta</h2>
      </div>

      <div className="settings-content">
        <div className="terms-content">
          <h3>Foydalanish shartlari</h3>
          <div className="terms-text">
            <p>
              Ushbu ommaviy oferta orqali siz ilovadan foydalanish shartlari
              bilan tanishib chiqishingiz mumkin.
            </p>
            {/* Add more terms content as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsSettings;
