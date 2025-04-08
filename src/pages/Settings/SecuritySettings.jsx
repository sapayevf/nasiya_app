import React from "react";
import { Link } from "react-router-dom";
import "./SecuritySettings.scss";

const SecuritySettings = () => {
  return (
    <div className="security-settings">
      <div className="settings-header">
        <Link to="/settings" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2>Xavfsizlik</h2>
      </div>

      <div className="settings-content">
        <div className="form-group">
          <label>Joriy parol</label>
          <input type="password" placeholder="Joriy parolni kiriting" />
        </div>

        <div className="form-group">
          <label>Yangi parol</label>
          <input type="password" placeholder="Yangi parolni kiriting" />
        </div>

        <div className="form-group">
          <label>Yangi parolni tasdiqlang</label>
          <input type="password" placeholder="Yangi parolni qayta kiriting" />
        </div>

        <button className="save-button">Saqlash</button>
      </div>
    </div>
  );
};

export default SecuritySettings;
