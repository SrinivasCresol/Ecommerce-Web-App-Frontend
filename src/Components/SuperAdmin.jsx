import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../ContextProvider/SocketProvider";

export default function SuperAdmin() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const socket = useSocket();

  const logoutSuperAdmin = () => {
    sessionStorage.removeItem("superAdminToken");
    navigate("/");
  };

  const loadNotificationsFromStorage = () => {
    const storedNotifications = localStorage.getItem("superAdminNotifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  };

  useEffect(() => {
    socket.on("adminNotification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    loadNotificationsFromStorage();

    return () => {
      socket.off("adminNotification");
    };
  }, [socket]);

  useEffect(() => {
    const token = sessionStorage.getItem("superAdminToken");

    if (token) {
      navigate("/super-admin");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "superAdminNotifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

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
