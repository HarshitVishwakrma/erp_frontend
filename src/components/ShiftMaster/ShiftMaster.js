import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./ShiftMaster.css";
import { saveShiftMaster, fetchShiftMasters } from "../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify"; // Ensure this is installed

const ShiftMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [showTable, setShowTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [formData, setFormData] = useState({
    Plant: "",
    Shift_Name: "",
    Shift_Prefix: "",
    Shift_From: "",
    Shift_Till: "",
    Break_Name: "",
    Break_Till: "",
    Break_Time: "",
    Total_Hours: "",
  });
  const [errors, setErrors] = useState({});
  const [shiftData, setShiftData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShiftMasters();
        setShiftData(data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Error fetching shift data:", error);
        toast.error("Failed to load shift data");
      }
    };
    fetchData();
  }, []);

  const handleChange1 = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));

    const selectedValue = e.target.value;

    setSelectedOption(selectedValue);
    if (selectedValue === "Produlink") {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "Plant" && key !== "Shift_Prefix") {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});

    try {
      await saveShiftMaster(formData);
      toast.success("Data saved successfully");
      console.log("Form data:", formData);
      // Optionally, you can refetch data here to update the table
      const data = await fetchShiftMasters();
      setShiftData(data);
    } catch (error) {
      toast.error("Failed to save data");
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="ShiftMaster">
      <ToastContainer />
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
                <div className="ShiftMaster1">
                
                  <div className="Shift-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Shift Master</h5>
                        </div>
                        <div className="col-md-6 text-end">
                          <p style={{ color: "violet" }}>
                            **Note : Use 24 Houre clock to enter shift time
                          </p>
                        </div>
                      </div>
                    </div>
               
                  <div className="ShiftMain mt-5">
                    <div className="container-fluid">
                      <div className="row text-start">
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label htmlFor="Plant" className="form-label">
                              Plant:
                            </label>
                            <select
                              id="Plant"
                              className="form-select"
                              style={{marginTop:"-1px"}}
                              aria-label="Default select example"
                              onChange={handleChange1}
                              value={selectedOption}
                            >
                              <option value="">Select...</option>
                              <option value="Produlink">Produlink</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                            {/* {errors.Plant && (
                              <small className="text-danger">
                                {errors.Plant}
                              </small>
                            )} */}
                          </div>
                        </div>
                        <div className="col-md-1">
                          <label htmlFor="Shift_Name" className="form-label">
                            Shift Name:<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="Shift_Name"
                            value={formData.Shift_Name}
                            onChange={handleChange1}
                          />
                          {errors.Shift_Name && (
                            <small className="text-danger">
                              {errors.Shift_Name}
                            </small>
                          )}
                        </div>
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label
                              htmlFor="Shift_Prefix"
                              className="form-label"
                            >
                              Shift Prefix:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Shift_Prefix"
                              value={formData.Shift_Prefix}
                              onChange={handleChange1}
                            />
                            {/* {errors.Shift_Prefix && (
                              <small className="text-danger">
                                {errors.Shift_Prefix}
                              </small>
                            )} */}
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label htmlFor="Shift_From" className="form-label">
                              Shift From:<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Shift_From"
                              value={formData.Shift_From}
                              onChange={handleChange1}
                            />
                            {errors.Shift_From && (
                              <small className="text-danger">
                                {errors.Shift_From}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label htmlFor="Shift_Till" className="form-label">
                              Shift Till:<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Shift_Till"
                              value={formData.Shift_Till}
                              onChange={handleChange1}
                            />
                            {errors.Shift_Till && (
                              <small className="text-danger">
                                {errors.Shift_Till}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="mb-3">
                            <label htmlFor="Break_Name" className="form-label">
                              Break Name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Break_Name"
                              value={formData.Break_Name}
                              onChange={handleChange1}
                            />
                          
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label htmlFor="Break_Till" className="form-label">
                              Break Till:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Break_Till"
                              value={formData.Break_Till}
                              onChange={handleChange1}
                            />
                           
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label htmlFor="Break_Time" className="form-label">
                              Break Time:<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Break_Time"
                              value={formData.Break_Time}
                              onChange={handleChange1}
                            />
                            {errors.Break_Time && (
                              <small className="text-danger">
                                {errors.Break_Time}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className="mb-3">
                            <label htmlFor="Total_Hours" className="form-label">
                              Total Hours:<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Total_Hours"
                              value={formData.Total_Hours}
                              onChange={handleChange1}
                            />
                            {errors.Total_Hours && (
                              <small className="text-danger">
                                {errors.Total_Hours}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="mb-3">
                            <button
                              className="btn"
                              type="button"
                              onClick={handleSubmit}
                              style={{marginTop:"31px"}}
                            >
                              Save
                            </button>
                            <button className="btn" type="button"
                             
                              style={{marginTop:"31px"}}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                
                  {!showTable && (
                    <div className="Shifttable1">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12 text-start">
                            <table className="table table-striped table-responsive">
                              <thead>
                                <tr>
                                  <th>No Found Data</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showTable && (
                    <div className="Shifttable mt-5">
                      <div className="container-fluid">
                        <div className="table-responsive">
                          <div className="col-md-12 text-start">
                            <table className="table table-striped ">
                              <thead>
                                <tr>
                                  <th>Sr.</th>
                                  <th>Plant</th>
                                  <th>Shift</th>
                                  <th>Prefix</th>
                                  <th>Shift Time</th>
                                  <th>Break time</th>
                                  <th>Break Hours</th>
                                  <th>Total Hours</th>
                                  <th>Edit</th>
                                  <th>Delete</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {shiftData.map((shift, index) => (
                                  <tr key={shift.id}>
                                    <td>{index + 1}</td>
                                    <td>{shift.Plant}</td>
                                    <td>{shift.Shift_Name}</td>
                                    <td>{shift.Shift_Prefix}</td>
                                    <td>{`${shift.Shift_From} - ${shift.Shift_Till}`}</td>
                                    <td>{`${shift.Break_Name} (${shift.Break_Till})`}</td>
                                    <td>{shift.Break_Time}</td>
                                    <td>{shift.Total_Hours}</td>
                                    <td>
                                      <button className="Shiftbtnicon">
                                        <i className="fas fa-edit"></i>
                                      </button>
                                    </td>
                                    <td>
                                      <button className="Shiftbtnicon">
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    </td>
                                    <td>
                                      <button className="Shiftbtnicon">
                                        Active
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                    </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftMaster;
