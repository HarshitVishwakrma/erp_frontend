import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ErpFinancialYear.css";
import { FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createFinancialYear, getFinancialYears } from "../../../Service/Erpsetting.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ErpFinancialYear = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

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

  const [financialYears, setFinancialYears] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    FyName: "",
    From_Date: "",
    To_Date: "",
    ShortName: "",
  });

  const [errors, setErrors] = useState({});


   // Fetch financial years on component mount
   useEffect(() => {
    const fetchFinancialYears = async () => {
      try {
        const data = await getFinancialYears();
        setFinancialYears(data);
      } catch (error) {
        toast.error("Failed to fetch financial years!");
      }
    };

    fetchFinancialYears();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validation for ShortName
  if (name === "ShortName") {
    const shortNameRegex = /^\d{4}-\d{4}$/;
    if (!shortNameRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        ShortName: "Format must be YYYY-YYYY"
      }));
    } else {
      // Optional: Validate difference
      const [start, end] = value.split("-").map(Number);
      if (end !== start + 1) {
        setErrors((prev) => ({
          ...prev,
          ShortName: "End year must be one more than start year"
        }));
      } else {
        setErrors((prev) => ({ ...prev, ShortName: "" }));
      }
    }
  }
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const newFinancialYear = await createFinancialYear(formData);
      setFinancialYears([...financialYears, newFinancialYear]); // Update table
      toast.success("Financial Year added successfully!");
      setShowModal(false);
      setFormData({
        FyName: "",
        From_Date: "",
        To_Date: "",
        ShortName: "",
      });
    } catch (error) {
      toast.error("Failed to add Financial Year!");
    }
  };


  return (
    <div className="ErpFinancialyear">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="financial mt-5">
                  <div className="financial-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Financial Year</h5>
                      </div>
                    </div>
                  </div>

                  <div className="financial-table mt-3">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>FyId</th>
                            <th>Fy Name</th>
                            <th>From_Date</th>
                            <th>To_Date</th>
                            <th>Short_Name</th>
                            <th>Doc Start No.</th>
                            <th>Fy Month</th>
                          </tr>
                        </thead>
                        <tbody>
                          {financialYears.map((year) => (
                            <tr key={year.id}>
                              <td>{year.id}</td>
                              <td>{year.FyName}</td>
                              <td>{year.From_Date}</td>
                              <td>{year.To_Date}</td>
                              <td>{year.ShortName}</td>
                              <td>
                                <Link to="/Document-start">
                                  <FaFile />
                                </Link>
                              </td>
                              <td>
                                <FaFile />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row text-start mt-5">
                    <div className="col-md-2">
                      <button type="button" className="yearbtn"  onClick={() => setShowModal(true)}>
                        Create New Year
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>Create New Financial Year</h5>
            <div className="form-group">
              <label>Fy Name</label>
              <input
                type="text"
                name="FyName"
                value={formData.FyName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                name="From_Date"
                value={formData.From_Date}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                name="To_Date"
                value={formData.To_Date}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
  <label>Short Name</label>
  <input
    type="text"
    name="ShortName"
    value={formData.ShortName}
    onChange={handleInputChange}
    className={`form-control ${errors.ShortName ? "is-invalid" : ""}`}
    placeholder="e.g. 2024-2025"
  />
  {errors.ShortName && (
    <div className="invalid-feedback">{errors.ShortName}</div>
  )}
</div>

            <div className="modal-actions mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormSubmit}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ErpFinancialYear;
