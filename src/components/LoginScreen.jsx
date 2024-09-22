import React, { useState } from "react";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/userContext";
import { signin, signup } from "../apiCalls/apiCalls";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const { saveUser } = useAuth();
  const { theme } = useTheme();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignIn = async() => {
    try {
      const resp = await signin(username).then((data) => {
        saveUser(data);
      })
    } catch (error) {
      alert(error);
    }
  };

  const handleSignUp = async() => {
    try {
      const resp = await signup(username).then((data) => {
        saveUser(data);
      })
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: theme.text, marginBottom: "20px" }}>
        Signup Page
      </h2>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
          style={styles.input}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={handleSignIn}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: theme.buttonColor,
            color: theme.buttonText,
            fontSize: "16px",
            cursor: "pointer",
            width: "145px",
            fontWeight: '700'
          }}
        >
          Sign In
        </button>

        <button
          onClick={handleSignUp}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: theme.buttonColor,
            color: theme.buttonText,
            fontSize: "16px",
            cursor: "pointer",
            width: "145px",
            fontWeight: '700'
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "300px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    width: "145px",
  },
};

export default LoginScreen;
