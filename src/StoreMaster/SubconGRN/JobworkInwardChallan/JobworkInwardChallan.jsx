import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkInwardChallan.css";
import { saveJob_WorkChallan } from "../../../Service/StoreApi.jsx";

import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const JobworkInwardChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [gateEntryData, setGateEntryData] = useState([]);
  const [selectedGateEntry, setSelectedGateEntry] = useState();
  const [challanNumbers, setChallanNumbers] = useState([]);
  const [PO, setPO] = useState([]);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchGateEntryData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Store/general-details/");
      const resData = await res.json();
      console.log(resData);
      setGateEntryData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  useEffect(() => {
    fetchGateEntryData();
  }, []);

  const [formData, setFormData] = useState({
    InwardF4No: "",
    InwardDate: "",
    InwardTime: "",
    ChallanNo: "",
    ChallanDate: "",
    SubVendor: "",
    DcNo: "",
    DcDate: "",
    EWayBillQty: "",
    EWayBillNo: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    PreparedBy: "",
    CheckedBy: "",
    VehicleTime: "",
    TcNo: "",
    TcDate: "",
    Remark: "",
    DeliveryInTime: "",
    ClearingStatus: "",
    VehicleOutTime: "",
  });

  const [errors, setErrors] = useState({}); // For validation errors

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DeliveryInTime: value, // Set either "yes" or "no"
    }));
  };

  // Validate required fields
  const validate = () => {
    const newErrors = {};

    if (!formData.DeliveryInTime) {
      newErrors.DeliveryInTime =
        "Please select Yes or No for Delivery In Time.";
    }

    // Other validation rules...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeGateEntry = async (e) => {
    const selectedGE_No = e.target.value; // this is a string
    const entryObj = gateEntryData.find(
      (ent) => String(ent.GE_No) === selectedGE_No // match string → string
    );
    setSelectedGateEntry(entryObj);
    // if you also need it in your main formData:
    setFormData((prev) => ({ ...prev, GateEntryNo: selectedGE_No }));

    const supplier = entryObj?.Supp_Cust?.replace(/^\d+\s*-\s*/, "");

    const res = await fetch(
      "http://127.0.0.1:8000/Sales/supplierview/?supplier=" + supplier
    );
    const resData = await res.json();
    console.log(resData);
    setChallanNumbers(resData.challans);

    const res2 = await fetch(
      "http://127.0.0.1:8000/Store/newjobworkpodetails/?supplier=" + supplier
    );
    const resData2 = await res2.json();

    setPO(resData2.purchase_orders);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields");
      return; // Stop submission if validation fails
    }

    try {
      const response = await saveJob_WorkChallan(formData); // Call the API function
      console.log("Data submitted successfully", response);
      toast.success("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data", error);
      toast.error("Error submitting data");
    }
  };

  return (
    <div className="NewStoreInwardJobwork">
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
                <div className="InwardJobwork-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">
                        Jobwork InWard
                      </h5>
                    </div>
                    <div className="col-md-10 mt-4">
                      <div className="row mb-3">
                        <div className="col-md-1">
                          <select id="sharpSelect" className="form-select">
                            <option selected>Produlink</option>
                          </select>
                        </div>
                        <div className="col-md-1 mt-2">
                          <label htmlFor="seriesSelect" className="form-label">
                            Series:
                          </label>
                        </div>
                        <div className="col-md-1">
                          <select id="seriesSelect" className="form-select">
                            <option selected>Select</option>
                            <option value="57F4">Jobwork 57F4 Inward</option>
                            <option value="57F4 Return">
                              Non Return Inward
                            </option>
                            <option value="Process Loss/Scrap">
                              Cust Rework
                            </option>
                          </select>
                        </div>
                        {/* Input Field */}
                        <div className="col-md-1 mt-1">
                          <input
                            type="text"
                            id="inputField"
                            className="form-control"
                            placeholder="Enter value"
                          />
                        </div>
                        <div className="col-md-2 mt-2">Gate Entry No:</div>
                        <div className="col-md-1">
                          <select onChange={handleChangeGateEntry} id="routingSelect" className="form-select">
                            <option selected>Select</option>
                            {gateEntryData?.map((item) => {
                              return (
                                <option value={item?.GE_No}>
                                  {item?.GE_No}|Supplier/Vendor :{" "}
                                  {item?.Supp_Cust}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-1 mt-2">Customer:</div>
                        <div className="col-md-2 mt-1">
                          <input
                            type="text"
                            id="inputField"
                            className="form-control"
                            placeholder="Enter value"
                            value={selectedGateEntry?.Supp_Cust?.replace(/^\d+\s*-\s*/, "")}
                          />
                        </div>
                        <div className="col-md-1 mt-1">
                          <button type="button" className="btn">
                            Search
                          </button>
                        </div>
                        <div className="col-md-1 mt-1">
                          <button type="button" className="btn">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="InwardJobwork-main mt-5">
                  <div className="container-fluid text-start">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>
                                    Select Item:{" "}
                                    <div className="d-flex">
                                      <label className="me-2">
                                        <input
                                          type="checkbox"
                                          name="selectAll"
                                        />
                                        All
                                      </label>
                                      <label className="me-2">
                                        <input
                                          type="checkbox"
                                          name="selectRM"
                                        />
                                        RM
                                      </label>
                                      <label>
                                        <input
                                          type="checkbox"
                                          name="selectFG"
                                        />
                                        FG
                                      </label>
                                    </div>
                                  </th>
                                  <th>Inward Qty</th>
                                  <th>Material Rate</th>
                                  <th>Heat No</th>
                                  <th>Cust Heat No</th>
                                  <th>RM Specification</th>
                                  <th>Particular/Nature Of Process</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex">
                                      <input
                                        type="text"
                                        name="ItemCode"
                                        className="form-control"
                                        value={formData.ItemCode}
                                      />
                                      <button className="pobtn">Search</button>
                                    </div>
                                    <div className="d-flex">
                                      <label>FG Part Code:</label>
                                      <select
                                        name="Type"
                                        className="form-select"
                                        value={formData.Type}
                                      >
                                        <option>Select</option>
                                        <option value="Critical">A</option>
                                        <option value="Regular">B</option>
                                      </select>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex">
                                      <label>Challan Qty:</label>
                                      <input className="form-control" />
                                    </div>
                                    <div className="d-flex">
                                      <label>GRN Qty:</label>
                                      <input className="form-control" />
                                      <select className="form-select">
                                        <option></option>
                                      </select>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex">
                                      <label>Challan Qty:</label>
                                      <input className="form-control" />
                                    </div>
                                    <div className="d-flex">
                                      <label>GRN Qty:</label>
                                      <input className="form-control" />
                                      <span>KG</span>
                                    </div>
                                  </td>
                                  <td>
                                    <input className="form-control" />
                                  </td>
                                  <td>
                                    <input className="form-control" />
                                  </td>
                                  <td>
                                    <textarea className="form-control"></textarea>
                                  </td>
                                  <td>
                                    <textarea className="form-control"></textarea>
                                  </td>
                                  <td>
                                    <button type="submit" className="pobtn">
                                      ADD
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="InwardJobworkstatus">
                    <div className="container-fluid  text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item Code</th>
                              <th>Operation</th>
                              <th>Challan Qty</th>
                              <th>GRN Qty</th>
                              <th>Material Rate</th>
                              <th>Heat No</th>
                              <th>Cust. Heat No</th>
                              <th>Particular/Nature Of Process</th>
                              <th>HC</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Enter Item Code"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Enter Operation"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Enter Challan Qty"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Enter GRN Qty"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Material Rate"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Heat No"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="Cust. Heat No"
                                />
                              </td>
                              <td>
                                <textarea
                                  className="form-control p-2"
                                  rows="2"
                                  placeholder="Nature Of Process"
                                ></textarea>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder="HC"
                                />
                              </td>
                              <td>
                                <FaEdit />
                              </td>
                              <td>
                                <FaTrash />
                              </td>
                            </tr>
                            {/* Add more rows dynamically as needed */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="StoreInwardJobworkFooter">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-Gernal-Detail-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-Gernal-Detail"
                        type="button"
                        role="tab"
                        aria-controls="pills-Gernal-Detail"
                        aria-selected="true"
                      >
                        General Detail
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-Gernal-Detail"
                      role="tabpanel"
                      aria-labelledby="pills-Gernal-Detail-tab"
                      tabindex="0"
                    >
                      <div className="StoreInwardJobworks text-start">
                        <div className="container-fluid">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-4 text-start">
                                <div className="container-fluid">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th className="col-md-4">
                                            Inward F4 No:
                                          </th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="InwardF4No"
                                              value={formData.InwardF4No}
                                              onChange={handleInputChange}
                                            />
                                            {errors.InwardF4No && (
                                              <span className="text-danger">
                                                {errors.InwardF4No}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Inward Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="InwardDate"
                                              value={formData.InwardDate}
                                              onChange={handleInputChange}
                                            />
                                            {errors.InwardDate && (
                                              <span className="text-danger">
                                                {errors.InwardDate}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Inward Time:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="InwardTime"
                                              value={formData.InwardTime}
                                              onChange={handleInputChange}
                                            />
                                            {errors.InwardTime && (
                                              <span className="text-danger">
                                                {errors.InwardTime}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="ChallanNo"
                                              value={formData.ChallanNo}
                                              onChange={handleInputChange}
                                            />
                                            {errors.ChallanNo && (
                                              <span className="text-danger">
                                                {errors.ChallanNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="ChallanDate"
                                              value={formData.ChallanDate}
                                              onChange={handleInputChange}
                                            />
                                            {errors.ChallanDate && (
                                              <span className="text-danger">
                                                {errors.ChallanDate}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Sub Vendor:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="SubVendor"
                                              value={formData.SubVendor}
                                              onChange={handleInputChange}
                                            />
                                            {errors.SubVendor && (
                                              <span className="text-danger">
                                                {errors.SubVendor}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>D. C. No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="DcNo"
                                              value={formData.DcNo}
                                              onChange={handleInputChange}
                                            />
                                            {errors.DcNo && (
                                              <span className="text-danger">
                                                {errors.DcNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-start">
                                {/* Second Column Group */}
                                <div className="container mt-4">
                                  <div className="table-responsive text-start">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th className="col-md-4">
                                            D.C. Date:
                                          </th>
                                          <td>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="DcDate"
                                              value={formData.DcDate}
                                              onChange={handleInputChange}
                                            />
                                            {errors.DcDate && (
                                              <span className="text-danger">
                                                {errors.DcDate}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Way Bill Qty:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="EWayBillQty"
                                              value={formData.EWayBillQty}
                                              onChange={handleInputChange}
                                            />
                                            {errors.EWayBillQty && (
                                              <span className="text-danger">
                                                {errors.EWayBillQty}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Way Bill No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="EWayBillNo"
                                              value={formData.EWayBillNo}
                                              onChange={handleInputChange}
                                            />
                                            {errors.EWayBillNo && (
                                              <span className="text-danger">
                                                {errors.EWayBillNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="VehicleNo"
                                              value={formData.VehicleNo}
                                              onChange={handleInputChange}
                                            />
                                            {errors.VehicleNo && (
                                              <span className="text-danger">
                                                {errors.VehicleNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Lr No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="LrNo"
                                              value={formData.LrNo}
                                              onChange={handleInputChange}
                                            />
                                            {errors.LrNo && (
                                              <span className="text-danger">
                                                {errors.LrNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Transporter:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Transporter"
                                              value={formData.Transporter}
                                              onChange={handleInputChange}
                                            />
                                            {errors.Transporter && (
                                              <span className="text-danger">
                                                {errors.Transporter}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Prepared By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="PreparedBy"
                                              value={formData.PreparedBy}
                                              onChange={handleInputChange}
                                            />
                                            {errors.PreparedBy && (
                                              <span className="text-danger">
                                                {errors.PreparedBy}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Checked By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="CheckedBy"
                                              value={formData.CheckedBy}
                                              onChange={handleInputChange}
                                            />
                                            {errors.CheckedBy && (
                                              <span className="text-danger">
                                                {errors.CheckedBy}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-start">
                                {/* Third Column Group */}
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Vehicle in Time:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="VehicleTime"
                                              value={formData.VehicleTime}
                                              onChange={handleInputChange}
                                            />
                                            {errors.VehicleTime && (
                                              <span className="text-danger">
                                                {errors.VehicleTime}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Tc No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TcNo"
                                              value={formData.TcNo}
                                              onChange={handleInputChange}
                                            />
                                            {errors.TcNo && (
                                              <span className="text-danger">
                                                {errors.TcNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Tc Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="TcDate"
                                              value={formData.TcDate}
                                              onChange={handleInputChange}
                                            />
                                            {errors.TcDate && (
                                              <span className="text-danger">
                                                {errors.TcDate}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Remark:</th>
                                          <td>
                                            <textarea
                                              type="text"
                                              className="form-control"
                                              name="Remark"
                                              value={formData.Remark}
                                              onChange={handleInputChange}
                                              rows="2"
                                            ></textarea>
                                            {errors.Remark && (
                                              <span className="text-danger">
                                                {errors.Remark}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            Delivery in Time:
                                          </th>

                                          <td>
                                            <div className="col-md-2">
                                              <input
                                                type="checkbox"
                                                name="DeliveryInTime"
                                                checked={
                                                  formData.DeliveryInTime ===
                                                  "yes"
                                                }
                                                onChange={() =>
                                                  handleCheckboxChange("yes")
                                                }
                                              />
                                              Yes
                                              <input
                                                type="checkbox"
                                                name="DeliveryInTime"
                                                checked={
                                                  formData.DeliveryInTime ===
                                                  "no"
                                                }
                                                onChange={() =>
                                                  handleCheckboxChange("no")
                                                }
                                              />
                                              No
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <th>Clearing Status:</th>
                                          <td>
                                            <select
                                              className="form-select"
                                              type="text"
                                              name="ClearingStatus"
                                              value={formData.ClearingStatus}
                                              onChange={handleInputChange}
                                            >
                                              <option value="Main Store">
                                                select
                                              </option>
                                              <option value="yes">yes</option>{" "}
                                              <option value="No">No</option>
                                            </select>
                                            {errors.ClearingStatus && (
                                              <span className="text-danger">
                                                {errors.ClearingStatus}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Out Time:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="VehicleOutTime"
                                              value={formData.VehicleOutTime}
                                              onChange={handleInputChange}
                                            />
                                            {errors.VehicleOutTime && (
                                              <span className="text-danger">
                                                {errors.VehicleOutTime}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            colspan="2"
                                            className="text-center"
                                          >
                                            <button
                                              type="submit"
                                              className="btn"
                                            >
                                              Save Challan
                                            </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
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

export default JobworkInwardChallan;
