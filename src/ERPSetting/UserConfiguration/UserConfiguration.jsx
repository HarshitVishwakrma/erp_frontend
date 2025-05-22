import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./UserConfiguration.css";
import { registerUser } from "../../Service/Erpsetting.jsx"; // Importing the registerUser function
import { toast, ToastContainer } from "react-toastify";

const UserConfiguration = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    plant: "Produlink",
    department: "",
    fullName: "",
    username: "",
    password: "",
    emailId: "",
    mobileNo: "",
  
  });

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: formData.username,
      email: formData.emailId,
      password: formData.password,
      PlantName: formData.plant,
      Department: formData.department,
      FullName: formData.fullName,
      MobileNo: formData.mobileNo,
    };

    try {
      // Call the registerUser function from erpsetting service
      const response = await registerUser(newUser);

      // Display success message
      console.log(response);
      
      toast.success("User successfully created!");

      // Optionally reset the form data
      setFormData({
        plant: "",
        department: "",
        fullName: "",
        username: "",
        password: "",
        emailId: "",
        mobileNo: "",
        cr: "N",
      });
    } catch (error) {
      // Display error message
      toast.error("Error creating user, please try again.");
    }
  };

  return (
    <div className="User">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-container">
                  <h2 className="form-title">Add New User</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Plant Selection */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="plant" className="form-label">Plant:</label>
                      </div>
                      <div className="col-md-3">
                      <input
                          type="text"
                          id="plant"
                          name="plant"
                          value={formData.plant}
                          onChange={handleChange}
                          className="form-control"
                        />
                       
                      </div>
                    </div>

                    {/* Department Selection */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="department" className="form-label">Department:</label>
                      </div>
                      <div className="col-md-3">
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select</option>
                          <option value="Store">Store</option>
                          <option value="Purchase">Purchase</option>
                           <option value="ALL Master">ALL Master</option>
                          <option value="Production">Production</option>
                        </select>
                      </div>
                    </div>

                    {/* Full Name Input */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="fullName" className="form-label">Full Name:</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Username Input */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="username" className="form-label">Username:</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="password" className="form-label">Password:</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Email Id Input */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="emailId" className="form-label">Email Id:</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="email"
                          id="emailId"
                          name="emailId"
                          value={formData.emailId}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Mobile No Input */}
                    <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="mobileNo" className="form-label">Mobile No:</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="tel"
                          id="mobileNo"
                          name="mobileNo"
                          value={formData.mobileNo}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* CR Selection */}
                    {/* <div className="row mb-3">
                      <div className="col-md-1 text-start">
                        <label htmlFor="cr" className="form-label">CR:</label>
                      </div>
                      <div className="col-md-3">
                        <select
                          id="cr"
                          name="cr"
                          value={formData.cr}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="N">N</option>
                          <option value="Y">Y</option>
                        </select>
                      </div>
                    </div> */}

                    {/* Save Button */}
                    <div className="row mb-3">
                      <div className="col-md-7 text-end">
                        <button type="submit" className="btn btn-primary submit-button">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConfiguration;
