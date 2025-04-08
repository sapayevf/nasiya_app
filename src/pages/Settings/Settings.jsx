import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import "./Settings.scss";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const settingsGroups = [
    {
      id: "account",
      items: [
        { id: 1, title: "Shaxsiy ma'lumotlar", path: "/settings/profile" },
        { id: 2, title: "Xavfsizlik", path: "/settings/security" },
      ],
    },
    {
      id: "notifications",
      items: [
        { id: 3, title: "Bildirishnomalar", path: "/settings/notifications" },
      ],
    },
    {
      id: "info",
      items: [
        { id: 4, title: "Dastur haqida", path: "/settings/about" },
        { id: 5, title: "Ommaviy oferta", path: "/settings/terms" },
      ],
    },
  ];

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="settings-container">
      <h1>Sozlamalar</h1>
      {settingsGroups.map((group) => (
        <div key={group.id} className="settings-group">
          <div className="settings-list">
            {group.items.map((option) => (
              <Link key={option.id} to={option.path} className="settings-item">
                <span>{option.title}</span>
                <i className="fas fa-chevron-right"></i>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="settings-group">
        <div className="settings-list">
          <button
            onClick={handleLogout}
            className="settings-item logout-button"
          >
            <span className="logout-text">Chiqish</span>
          </button>
        </div>
      </div>

      <Modal
        title="Chiqish"
        open={isModalOpen}
        onOk={handleLogoutConfirm}
        onCancel={handleCancel}
        okText="Ha chiqish"
        cancelText="Bekor qilish"
        centered
      >
        <p>Haqiqatan ham chiqmoqchimisiz?</p>
      </Modal>
    </div>
  );
};

export default Settings;
