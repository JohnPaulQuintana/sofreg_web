import React, { useState } from "react";
import EditJobModal from "./EditJobModal";
import Swal from "sweetalert2";
import axios from "axios"; // Ensure axios is imported

const JobTable = ({ jobData, onPageChange }) => {
  const jobs = jobData?.jobs?.data || [];
  const currentPage = jobData?.jobs?.current_page || 1;
  const lastPage = jobData?.jobs?.last_page || 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDelete = async (jobId) => {
    const jobApi = `${import.meta.env.VITE_API_URL}/admin/jobs/${jobId}`;
    const data = JSON.parse(localStorage.getItem("authentication")) || {};
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(jobApi, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The job has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => window.location.reload());
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Failed to delete job.",
          });
        }
      }
    });
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex justify-end mt-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-color-dark p-1 ps-3 rounded-sm"
        />
      </div>

      <div className="flex-grow overflow-x-scroll w-full bg-gray mt-2">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">ID</th>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">Code</th>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">Title</th>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">Description</th>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">Date Posted</th>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">Address</th>
              <th className="px-6 py-3 font-bold text-color-dark uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={job.id} className={`${index % 2 === 0 ? 'bg-gray-400' : ''}`}>
                  <td className="px-6 py-2">{job.id}</td>
                  <td className="px-6 py-2">{job.code}</td>
                  <td className="px-6 py-2">{job.title}</td>
                  <td className="px-6 py-2">{job.description}</td>
                  <td className="px-6 py-2">{new Date(job.date_posted).toLocaleDateString()}</td>
                  <td className="px-6 py-2">{job.address}</td>
                  <td className="px-6 py-2 flex gap-2">
                    <button onClick={() => handleEdit(job)} className="border p-1" type="button">edit</button>
                    <button onClick={() => handleDelete(job.id)} className="border p-1" type="button">delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-4">
                  No job records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {lastPage > 1 && (
        <div className="bg-color-gray w-full py-2">
          <div className="flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === 1 ? "text-gray-400" : "text-white hover:text-color-dark"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-300 text-sm">
              Page {currentPage} of {lastPage}
            </span>
            <button
              disabled={currentPage === lastPage}
              onClick={() => onPageChange(currentPage + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === lastPage ? "text-gray-400" : "text-white hover:text-color-dark"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ✅ Edit Modal */}
      {isModalOpen && selectedJob && (
        <EditJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
        />
      )}
    </div>
  );
};

export default JobTable;
