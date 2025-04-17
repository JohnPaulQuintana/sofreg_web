import { useState } from "react";
import axios from "axios";

const useFetchSheetData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getStatus = (clockInTime) => {
    const cutoffHour = 9; // 12:00 AM (midnight)
    const cutoffMinute = 0;
  
    const date = new Date(clockInTime);
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    console.log("🕒 Current time:", `${hour}:${minute}, `);
    // If the employee clocks in at or before 12:00 AM, they are "On-Time"
    return hour < cutoffHour || (hour === cutoffHour && minute === cutoffMinute) ? "On-Time" : "Late";
  };
  

  // Function to format date-time as "YYYY-MM-DD HH:mm:ss AM/PM"
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0"); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${hours}:${minutes}:${seconds}`;
  };
  

  const fetchData = async (emp_id) => {
    if (!emp_id) {
      setError(new Error("Employee ID is required"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Authenticate user
      const authResponse = await axios.get("https://sheetdb.io/api/v1/6nbgqks7ldm2e/search", {
        params: { emp_id },
      });

      if (authResponse.data.length === 0) {
        setError(new Error("Employee not found in records."));
        return;
      }

      const employee = authResponse.data[0];
      console.log("✅ Authentication successful:", employee);

      // Step 2: Check if already clocked in today
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const checkResponse = await axios.get("https://sheetdb.io/api/v1/4bvme3dy0xb5k/search", {
        params: { emp_id, clock_in: `${today}*` },
        headers: {
          Authorization: `Bearer ${employee.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (checkResponse.data.length > 0) {
        // Get the latest clock-in time and format it
        const lastClockIn = checkResponse.data[0].clock_in;
        const formattedLastClockIn = formatDateTime(lastClockIn);
        
        console.warn("⚠️ Already clocked in today:", checkResponse.data);
        setError(new Error(`You have already clocked in today at ${formattedLastClockIn}.`));
        return;
      }

      // Step 3: Insert only if no entry exists for today
      const clockInTime = formatDateTime(new Date()); // "YYYY-MM-DD HH:mm:ss AM/PM"

      // Step 3: Insert only if no entry exists for today
      const clockInTimeCopy = new Date(); // Current time
      const status = getStatus(clockInTimeCopy); // Determine "On-Time" or "Late"

      const postResponse = await axios.post(
        "https://sheetdb.io/api/v1/4bvme3dy0xb5k",
        {
          data: [
            {
              emp_id: employee.emp_id,
              name: employee.name,
              clock_in: clockInTime, // Correct format with AM/PM
              clock_out: null,
              status: status,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${employee.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Clock-in successful:", postResponse.data);
      setData(postResponse.data);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchData };
};

export default useFetchSheetData;
