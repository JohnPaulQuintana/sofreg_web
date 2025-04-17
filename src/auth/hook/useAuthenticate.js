import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [apiUrl, setApiUrl] = useState(`${import.meta.env.VITE_API_URL}/login`);
  const [apiUpdatePassword] = useState(`${import.meta.env.VITE_API_URL}/update-password`)

  const fetchData = async (employee_id, password) => {
    if (!employee_id) {
      setError(new Error("Employee ID is required"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const authResponse = await axios.post(
        `${apiUrl}`,
        {
          employee_id: employee_id,
          password: password,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (authResponse.status !== 200) {
        setError(
          new Error(
            authResponse.data.message || "Employee not found in records."
          )
        );
        return;
      }

      const token = authResponse.data;
      console.log("✅ Authentication successful:", token);
      localStorage.setItem("authentication", JSON.stringify(token));
      setData(token);
      // window.location.href = `/${token.role}`;
      // Check if user is using the default password
      if (!token.user.password_changed) {
        Swal.fire({
          title: "Default Password Detected",
          text: "You are using the default password. Please change it now.",
          icon: "warning",
          input: "password",
          inputPlaceholder: "Enter new password",
          // inputAttributes: {
          //   minlength: 6,
          //   required: true,
          // },
          showCancelButton: false,
          confirmButtonText: "Update Password",
          allowOutsideClick: false,
          allowEscapeKey: false,
          preConfirm: async (newPassword) => {
            console.log("preConfirm Triggered, Input:", newPassword); // ✅ Check input
        
            try {
              const response = await axios.post(
                `${apiUpdatePassword}`,
                { user_id: token.user.id, new_password: newPassword },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`,
                  },
                }
              );
        
              console.log("✅ API Response:", response.data);
              if (response.data.success) {
                token.changed_password = true;
                localStorage.setItem("authentication", JSON.stringify(token));
                return Swal.fire("Success!", "Your password has been updated.", "success");
              } else {
                return Swal.showValidationMessage("❌ Password update failed. Try again.");
              }
            } catch (error) {
              console.error("API Error:", error);
              return Swal.showValidationMessage("New password is required. Try again.");
            }
          },
        }).then((result) => {
          console.log("Swal Result:", result);
          if (result.isConfirmed) {
            window.location.href = `/${token.role}`;
          }
        });
        
      } else {
        window.location.href = `/${token.role}`;
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      setError(
        new Error(
          err.response?.data?.message || "An unexpected error occurred."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchData };
};

export default useAuthenticate;
