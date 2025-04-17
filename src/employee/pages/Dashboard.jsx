import React, { useState } from "react";
import Loader from "../../app/components/Loader";
import ProgressScrollButton from "../../app/components/ProgressScrollButton";
import EmployeeNavbar from "../components/EmployeeNavbar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeHeader from "../components/Header";
import RecordTable from "../components/RecordTable";

const EmployeeDashboard = () => {
  // State to track selected section
  const [selectedSection, setSelectedSection] = useState("dashboard"); // Default is EmployeeHeader

  // Function to update the selected section
  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };

  // Render the appropriate component based on selection
  const renderContent = () => {
    switch (selectedSection) {
      case "record":
        return <RecordTable />;
      default:
        return <EmployeeHeader />;
    }
  };

  return (
    <div className="startup-one overflow-hidden">
      <Loader />
      {/* Cursor */}
      <div className="cursor"></div>

      {/* Progress Scroll Button */}
      <ProgressScrollButton />
      {/* Pass handleMenuClick to EmployeeNavbar */}
      <EmployeeNavbar onMenuClick={handleMenuClick}/>
      <EmployeeSidebar onMenuClick={handleMenuClick}/>

      <div id="smooth-content" className="overflow-hidden">
        {/* <EmployeeHeader /> */}
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
