import React from "react";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/userContext";

function SideBar({ isActive, setIsActive }) {
  const { theme } = useTheme();
  const { deleteUser } = useAuth();

  // Check if the screen width is small
  let isMobile = window.innerWidth <= 768;

  window.addEventListener("resize", () => {
    isMobile = window.innerWidth <= 768;
  });

  return (
    <div
      style={{
        width: isMobile ? "100vw" : "30%", // Full width on mobile, 30% on larger screens
        height: isMobile ? "auto" : "100vh", // Auto height on mobile, full height on larger screens
        display: "flex",
        flexDirection: isMobile ? "row" : "column", // Row for mobile, column for desktop
        justifyContent: isMobile ? "center" : "flex-start", // Distribute evenly on mobile
        alignItems: "center",
        padding: isMobile ? "15% 0" : "0", // Add padding on mobile
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          gap: "20px",
          alignItems: "flex-start",
          justifyContent: "center",
          height: isMobile ? "auto" : "100%",
        }}
      >
        <button
          onClick={() => setIsActive("user")}
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0wUmJLCjEr_CDwUhQCi7DCDDOmwFwUlAPlTt-Gup2BSxrjp531_Y9CH8yjmiAZ_m53-E&usqp=CAU"
            alt="user"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              opacity: isActive !== "user" ? "0.5" : "1",
            }}
          />
          {!isMobile && (
            <p
              style={{
                color: theme.text,
                width: "80px",
                textAlign: "left",
                opacity: isActive !== "user" ? "0.5" : "1",
              }}
            >
              User
            </p>
          )}
        </button>

        <button
          onClick={() => setIsActive("address")}
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
            src="https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png"
            alt="address"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              opacity: isActive !== "address" ? "0.5" : "1",
            }}
          />
          {!isMobile && (
            <p
              style={{
                color: theme.text,
                width: "80px",
                textAlign: "left",
                opacity: isActive !== "user" ? "0.5" : "1",
              }}
            >
              Address
            </p>
          )}
        </button>

        <button
          onClick={() => deleteUser()}
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
            src="https://static.vecteezy.com/system/resources/previews/006/606/705/non_2x/sign-out-logout-icon-in-circle-line-vector.jpg"
            alt="logout"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
            }}
          />
          {!isMobile && (
            <p
              style={{
                color: theme.text,
                width: "80px",
                textAlign: "left",
                opacity: isActive !== "user" ? "0.5" : "1",
              }}
            >
              Logout
            </p>
          )}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
