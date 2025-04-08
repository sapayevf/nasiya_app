import React from "react";
import { Link } from "react-router-dom";
import "./NotificationSettings.scss";

const NotificationSettings = () => {
  return (
    <div className="notification-settings">
      <div className="settings-header">
        <Link to="/settings" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2>Bildirishnomalar</h2>
      </div>

      <div className="settings-content">
        <div className="notification-group">
          <div className="notification-item">
            <div className="notification-info">
              <h3>Instagram</h3>
              <p>Ijtimoiy tarmoqlar orqali ulashing</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>Telegram</h3>
              <p>Ijtimoiy tarmoqlar orqali ulashing</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <h3>WhatsApp</h3>
              <p>Ijtimoiy tarmoqlar orqali ulashing</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
