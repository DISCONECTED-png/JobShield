import React from "react";

const UserModal = ({ user, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="avatar" className="modal-avatar" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        <div className="modal-body">
          <p>👤 User ID: {user._id}</p>
          <p>📅 Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserModal;
