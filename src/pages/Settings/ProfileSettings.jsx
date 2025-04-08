import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <div className="profile-settings__header">
        <Link to="/settings" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2>Shaxsiy ma'lumotlar</h2>
      </div>

      <div className="profile-settings__content">
        <div className="profile-avatar">
          <img src="/default-avatar.png" alt="Profile" />
          <button className="change-photo-btn">Rasmni o'zgartirish</button>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>To'liq ismingiz</label>
            <input type="text" placeholder="Ismingizni kiriting" />
          </div>

          <div className="form-group">
            <label>Telefon raqam</label>
            <input type="tel" placeholder="+998 90 123 45 67" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
