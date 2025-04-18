import React, { useState } from "react";
// import useFetchSheetData from "../hook/useFetchSheetData";
import useAuthenticate from "../hook/useAuthenticate";
import Loader from "../../app/components/Loader";
import ProgressScrollButton from "../../app/components/ProgressScrollButton";
import Footer from "../../app/components/Footer";
import FooterDetailed from "../../app/components/FooterDetailed";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { data, loading, error, fetchData } = useAuthenticate();
  const [emp_id, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    fetchData(emp_id, password);
  };

  return (
    <div className="">
      {/* Loader */}
      <Loader />

      {/* Cursor */}
      <div className="cursor"></div>

      {/* progess scroll */}
      <ProgressScrollButton />

      <div className="smooth-wrapper overflow-hidden">
        <div id="smooth-content">
          <header className="page-header-error section-padding valign">
            <div className="container">
              <div className="text-center">
                <div className="row justify-content-center p-2">
                  <div className="col-lg-4 border p-5 rounded-sm">
                    <div className="img flex justify-center">
                      <img
                        className="w-48"
                        src="/assets/PNG/LOGO 2.2_1.png"
                        alt="404"
                      />
                    </div>
                    <div className="text mt-4">
                      {/* <h2 className="mb-10 text-5xl font-bold">Page not found</h2> */}
                      {/* <p className="text-xl">Sorry, but the page you are looking for does not exist.</p> */}
                      <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                          <label htmlFor="emp_id" className="block text-start">
                            Employee ID
                          </label>
                          <input
                            type="text"
                            id="emp_id"
                            className="w-full p-2 border text-color-dark"
                            value={emp_id}
                            onChange={(e) => setEmpId(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="password"
                            className="block text-start"
                          >
                            Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full p-2 border text-color-dark pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-9 text-sm text-color-primary-blue"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white p-2"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Login"}
                        </button>

                        {error && (
                          <p style={{ color: "red" }}>{error.message}</p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-marq">
              <div className="slide-har st1">
                <div className="box">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className="item" key={`box1-${index}`}>
                      <h4 className="d-flex align-items-center fw-800l">
                        <span className="text-8xl">CLOCK-IN</span>
                      </h4>
                    </div>
                  ))}
                </div>
                <div className="box">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className="item" key={`box2-${index}`}>
                      <h4 className="d-flex align-items-center fw-800">
                        <span className="text-8xl">CLOCK-OUT</span>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* <FooterDetailed /> */}
        </div>
      </div>
    </div>

    // <div className="flex items-center justify-center h-screen">
    //   <div className="p-10 bg-color-gray">
    //     <div className="mb-3 flex items-center justify-center">
    //       <img src="/assets/PNG/LOGO 2.2_1.png" className="w-32" alt="" srcset="" />
    //     </div>
    //     <form className="space-y-5" onSubmit={handleLogin}>
    //       <div>
    //         <label htmlFor="emp_id" className="block">Employee ID</label>
    //         <input
    //           type="text"
    //           id="emp_id"
    //           className="w-full p-2 border text-color-dark"
    //           value={emp_id}
    //           onChange={(e) => setEmpId(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password" className="block">Password</label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="w-full p-2 border text-color-dark"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>

    //       <button type="submit" className="w-full bg-blue-500 text-white p-2" disabled={loading}>
    //         {loading ? "Loading..." : "Clock In"}
    //       </button>

    //       {error && <p style={{ color: "red" }}>{error.message}</p>}
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
