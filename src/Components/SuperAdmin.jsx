import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(
  "https://react-io-socket-notifications.onrender.com"
);

export default function SuperAdmin() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const logoutSuperAdmin = () => {
    sessionStorage.removeItem("superAdminToken");
    navigate("/");
  };

  useEffect(() => {
    socket.on("adminNotification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("superAdminToken");

    if (token) {
      navigate("/super-admin");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Hello from Super Admin Page</h1>
        <button onClick={logoutSuperAdmin}>Logout</button>
      </div>
      <div>
        <h2>Notifications:</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
