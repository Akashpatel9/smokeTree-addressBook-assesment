import React from "react";
import { useTheme } from "../context/themeContext";
import { useForm } from "react-hook-form";
import { addAddress } from "../apiCalls/apiCalls";
import { useAuth } from "../context/userContext";

export default function AddAddress() {
  const { theme } = useTheme();
  const { register, handleSubmit, reset } = useForm();
  const { user, saveUser } = useAuth();

  const onSubmit =async (data) => {
    try {
      const resp = await addAddress(data, user.data.email).then((data) => {
        saveUser(data);
        reset({
            addressName: "",
            address: "",
            addressCity: "",
            addressState: "",
            addressZipCode: "",
          })
        alert("Address added successfully");
      })
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h1 style={{ color: theme.text }}>Location</h1>
        <p style={{ color: theme.text, opacity: "0.6" }}>Add your location</p>
      </div>
      <div style={{ height: "50%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div>
            <label style={{ color: theme.text, opacity: "0.8" }}>
              Name of Location
            </label>
            <br />
            <input
              {...register("addressName")}
              style={styles.input(theme)}
            />
          </div>
          <div>
            <label style={{ color: theme.text, opacity: "0.8" }}>
              Address
            </label>
            <br />
            <input
              {...register("address")}
              style={styles.input(theme)}
            />
          </div>
          <div>
            <label style={{ color: theme.text, opacity: "0.8" }}>
              State
            </label>
            <br />
            <input
              {...register("addressState")}
              style={styles.input(theme)}
            />
          </div>
          <div style={styles.flexRow}>
            <div>
              <label style={{ color: theme.text, opacity: "0.8" }}>City</label>
              <br />
              <input
                {...register("addressCity")}
                style={styles.smallInput(theme)}
              />
            </div>
            <div>
              <label style={{ color: theme.text, opacity: "0.8" }}>
                Zip Code
              </label>
              <br />
              <input
                {...register("addressZipCode")}
                style={styles.smallInput(theme)}
              />
            </div>
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              style={styles.submitButton(theme)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    paddingInline: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: (theme) => ({
    color: '#424056',
    outline: "none",
    border: "none",
    height: "40px",
    width: "100%", // Full width for responsiveness
    background: "#e9e9e9",
    borderRadius: "8px",
    paddingInline: "10px",
  }),
  smallInput: (theme) => ({
    color: '#424056',
    outline: "none",
    border: "none",
    height: "40px",
    width: "100%", // Full width inside flex container
    background: "#e9e9e9",
    borderRadius: "8px",
    paddingInline: "10px",
  }),
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flexWrap: "wrap", // Allows elements to wrap on smaller screens
  },
  submitButton: (theme) => ({
    backgroundColor: theme.buttonColor,
    color: theme.buttonText,
    outline: "none",
    border: "none",
    height: "40px",
    width: "100%", // Full width for the button
    background: "#e9e9e9",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  }),
};
