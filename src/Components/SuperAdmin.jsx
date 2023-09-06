import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuperAdmin() {
  const navigate = useNavigate();

  const logoutSuperAdmin = () => {
    sessionStorage.removeItem("superAdminToken");
    navigate("/");
  };

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
    </div>
  );
}
