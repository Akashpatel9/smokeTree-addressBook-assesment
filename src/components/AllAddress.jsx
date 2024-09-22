import React, { useState } from "react";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/userContext";
import { deleteAddress, updateAddress } from "../apiCalls/apiCalls";
import { useForm } from "react-hook-form";

export default function AllAddress({ addresses, onEdit, onDelete }) {
  const { theme } = useTheme();
  const {user, saveUser} = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const handleEditClick = (address) => {
    setCurrentAddress(address);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  };

  const handleModalSubmit = async(data) => {
    try {
      data.id = currentAddress._id
      const resp = await updateAddress(data, user.data.email).then((data) => {
        saveUser(data)
        setCurrentAddress(null)
        setIsEditModalOpen(false)
        reset({
          addressName: "",
          address: "",
          addressCity: "",
          addressState: "",
          addressZipCode: "",
          id: "",
        })
      })
    } catch (error) {
      alert(error)
    }
  };

  const handleDeleteConfirm = async(id) => {
    try {
      const resp = await deleteAddress(addressToDelete._id, user.data.email).then((data) => {
        saveUser(data)
        setAddressToDelete(null)
        setIsDeleteModalOpen(false)
      })
    } catch (error) {
      alert(error)
    }
  };

  const handleInputChange = (e) => {
    setCurrentAddress({
      ...currentAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        paddingInline: "5%",
        paddingBottom: "5%",
      }}
    >
      <div>
        <h1 style={{ color: theme.text }}>Your Addresses</h1>
      </div>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {addresses.map((address, index) => (
          <div key={index} style={styles.card}>
            <h2 style={{ color: '#424056' }}>{address.addressName}</h2>
            <p style={{ color: '#424056' }}>
              <strong>Street:</strong> {address.address}
            </p>
            <p style={{ color: '#424056' }}>
              <strong>City:</strong> {address.addressCity}
            </p>
            <p style={{ color: '#424056' }}>
              <strong>State:</strong> {address.addressState}
            </p>
            <p style={{ color: '#424056' }}>
              <strong>Zip Code:</strong> {address.addressZipCode}
            </p>
            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={() => handleEditClick(address)}
              >
                Edit
              </button>
              <button
                style={styles.button}
                onClick={() => handleDeleteClick(address)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Address</h2>
            <form onSubmit={handleSubmit(handleModalSubmit)}>
              <label>
                Name:
                <input
                  {...register("addressName")}
                  style={styles.input}
                />
              </label>
              <label>
                Street:
                <input
                  {...register("address")}
                  style={styles.input}
                />
              </label>
              <label>
                City:
                <input
                  {...register("addressCity")}
                  style={styles.input}
                />
              </label>
              <label>
                State:
                <input
                  {...register("addressState")}
                  style={styles.input}
                />
              </label>
              <label>
                Zip Code:
                <input
                  {...register("addressZipCode")}
                  style={styles.input}
                />
              </label>
              <div style={styles.modalButtonContainer}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={styles.modalButton}>
                  Cancel
                </button>
                <button type="submit" style={styles.modalButton}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this address?</p>
            <div style={styles.modalButtonContainer}>
              <button type="button" onClick={() => setIsDeleteModalOpen(false)} style={styles.modalButton}>
                Cancel
              </button>
              <button type="button" onClick={() => handleDeleteConfirm()} style={styles.modalButton}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    transition: "transform 0.2s",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    backgroundColor: '#424056',
    color: '#fff',
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "500px",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  modalButton: {
    backgroundColor: '#424056',
    color: '#fff',
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
