import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useAuthenticate = () => {
  const [showPassword, setShowPassword] = useState(false);
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
          html: `
            <p>You are using the default password. Please change it now.</p>
            <div style="position: relative; px-10">
              <input type="password" id="new-password" class="w-full p-2 border" placeholder="Enter new password" style="padding-right: 40px;">
              <button id="toggle-password" type="button" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 0.9rem; color: #333;">
                show
              </button>
            </div>
          `,
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "Update Password",
          confirmButtonColor: "rgb(31 41 55)", // 💚 emerald-500
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            const toggle = document.getElementById("toggle-password");
            const input = document.getElementById("new-password");
            toggle.addEventListener("click", () => {
              const isVisible = input.type === "text";
              input.type = isVisible ? "password" : "text";
              toggle.textContent = isVisible ? "show" : "hide";
            });
          },
          preConfirm: async () => {
            const newPassword = document.getElementById("new-password").value;
            if (!newPassword || newPassword.length < 6) {
              Swal.showValidationMessage("New password is required and must be at least 6 characters.");
              return false;
            }
        
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
        
              if (response.data.success) {
                token.changed_password = true;
                localStorage.setItem("authentication", JSON.stringify(token));
                return true;
              } else {
                Swal.showValidationMessage("❌ Password update failed. Try again.");
                return false;
              }
            } catch (error) {
              console.error("API Error:", error);
              Swal.showValidationMessage("Something went wrong. Please try again.");
              return false;
            }
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("✅ Success!", "Your password has been updated.", "success").then(() => {
              window.location.href = `/${token.role}`;
            });
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
