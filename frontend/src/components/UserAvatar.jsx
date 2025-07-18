import React, { useState, useEffect } from 'react';

const UserAvatar = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error('User fetch failed', err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="avatar-wrapper">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
        alt="Avatar"
        className="avatar-icon"
        onClick={toggleModal}
      />

      {showModal && (
        <div className="user-modal">
          <h3>👤 User Details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
