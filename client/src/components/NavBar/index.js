import React, { useState } from "react";
import API from "../../utils/API";
import "./style.css";
import ProfileCard from "../ProfileCard";
import logo from "../../assets/img/logo.png";

export default function NavBar({ displayName, avatarUrl, style }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogout = () => {
    API.logout().then(() => {
      window.location = "/welcome";
    });
  };

  const handleMouseHover = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="nav-bar" style={style}>
      <div className="nav-item" onClick={() => (window.location = "/")}>
        <img alt="prota" src={logo} style={{ width: "60px" }} />
        <span>Prota</span>
      </div>
      <ProfileCard
        showDropdown={showDropdown}
        handleMouseHover={handleMouseHover}
        avatarUrl={avatarUrl}
        displayName={displayName}
        handleLogout={handleLogout}
      />
    </div>
  );
}
