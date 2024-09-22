import React from "react";
import { useTheme } from "../context/themeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        position: "fixed",
        top: "0px",
        left: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "2%",
        backgroundColor: theme.background,
        zIndex: "99"
      }}
    >
      <h3 style={{ color: theme.text }}>Address Store</h3>
      <button
        onClick={() => toggleTheme()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          background: theme.background,
          outline: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src="https://play-lh.googleusercontent.com/T7iJ8gb1bHJzDsOJeRzMqg7ZKcRuVOr6XE5-Uzj0inIcKq4v6l4kKyQTArgxXyha9Ag"
          alt="user"
          style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%",
          }}
        />
      </button>
    </div>
  );
}

export default Navbar;
