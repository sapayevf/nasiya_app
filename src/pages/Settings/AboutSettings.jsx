import React from "react";
import { Link } from "react-router-dom";
import "./AboutSettings.scss";

const AboutSettings = () => {
  return (
    <div className="about-settings">
      <div className="settings-header">
        <Link to="/settings" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2>Dastur haqida</h2>
      </div>

      <div className="settings-content">
        <div className="app-info">
          <div className="app-version">
            <span className="label">Versiya</span>
            <span className="value">1.0.0</span>
          </div>
          <div className="app-details">
            <p>
              Nasiya App - bu savdo va xizmat ko'rsatish sohasida faoliyat
              yurituvchi tadbirkorlar uchun mo'ljallangan mobil ilova.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;
