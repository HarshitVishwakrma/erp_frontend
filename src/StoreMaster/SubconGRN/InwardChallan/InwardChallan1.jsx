import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardChallan1.css";
import CachedIcon from "@mui/icons-material/Cached";
import { Link } from "react-router-dom";
import { saveInwardChallan } from "../../../Service/StoreApi.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InwardChallan1 = () => {
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

  // inward challan
  const [formData, setFormData] = useState({
    InwardF4No: "",
    InwardDate: "",
    InwardTime: "",
    ChallanNo: "",
    ChallanDate: "",
    GateEnrtyNo: "",
    InvoiceNo: "",
    InvoiceDate: "",
    EWayBillQty: "",
    EWayBillNo: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    PreparedBy: "",
    CheckedBy: "",
    TcNo: "",
    TcDate: "",
    Remark: "",
    DeliveryInTime: "",
    TotalItem: "",
    TotalQtyNo: "",
    TotalQtyKg: "",
    Store: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DeliveryInTime: value, // Set either "yes" or "no"
    }));
  };

  // Form validation logic
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await saveInwardChallan(formData);
      console.log("Form Data:", formData); // Check if formData is correct
      console.log("API Response:", result); // Check the response from API
      if (result) {
        toast.success("Data saved successfully!");
        console.log("Data saved successfully:", formData);

        // Reset form after successful submission
        setFormData({
          InwardF4No: "",
          InwardDate: "",
          InwardTime: "",
          ChallanNo: "",
          ChallanDate: "",
          GateEnrtyNo: "",
          InvoiceNo: "",
          InvoiceDate: "",
          EWayBillQty: "",
          EWayBillNo: "",
          VehicleNo: "",
          LrNo: "",
          Transporter: "",
          PreparedBy: "",
          CheckedBy: "",
          TcNo: "",
          TcDate: "",
          Remark: "",
          DeliveryInTime: "",

          TotalItem: "",
          TotalQtyNo: "",
          TotalQtyKg: "",
          Store: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = JSON.parse(error.message);
      for (const key in errorMessage) {
        toast.error(`${key}: ${errorMessage[key][0]}`);
        console.log(`${key}: ${errorMessage[key][0]}`);
      }
    }
  };

  return (
    <div className="NewStoreStoreSubcon">
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
                <div className="StoreSubcon-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">
                        57-F4(InWard Challan)
                      </h5>
                    </div>
                    <div className="col-md-6 mt-4">
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <select id="routingSelect" className="form-select">
                            <option selected>Routing</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                          </select>
                        </div>

                        {/* Sharp Select Option */}
                        <div className="col-md-2">
                          <select id="sharpSelect" className="form-select">
                            <option selected>Produlink</option>
                          </select>
                        </div>

                        {/* Label: Series and Series Select Option */}
                        <div className="col-md-2 mt-2">
                          <label htmlFor="seriesSelect" className="form-label">
                            Series:
                          </label>
                        </div>
                        <div className="col-md-2">
                          <select id="seriesSelect" className="form-select">
                            <option selected>Select</option>
                            <option value="57F4">57F4</option>
                            <option value="57F4 Return">57F4 Return</option>
                            <option value="Process Loss/Scrap">
                              Process Loss/Scrap
                            </option>
                          </select>
                        </div>

                        {/* Input Field */}
                        <div className="col-md-2 mt-1">
                          <input
                            type="text"
                            id="inputField"
                            className="form-control"
                            placeholder="Enter value"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 text-end">
                      <Link className="btn" to={"/Inward-challan-list"}>
                        Inward Challan List
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="StoreSubcon-main mt-5">
                  <div className="storesubcon-background">
                    <div className="container-fluid text-start">
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Gate Entry No:</div>
                            <div className="col-md-6">
                              <select
                                id="routingSelect"
                                className="form-select"
                              >
                                <option selected>Select</option>
                                <option value="">
                                  GE242503626|Supplier/Vendor : SANKET
                                  ENGINEERING
                                </option>
                                <option value="">
                                  GE242504231|Supplier/Vendor : SHRIPAD STEELS
                                </option>
                                <option value="">
                                  GE242503626|Supplier/Vendor : SHREE CHITAMANI
                                  HEAT TREATERS
                                </option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <CachedIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">Supplier Name:</div>
                            <div className="col-md-6">
                              <input />
                            </div>
                            <div className="col-md-2">
                              <button type="button" className="btn">
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row text-start">
                            <div className="col-md-4">Outward Challan:</div>
                            <div className="col-md-4">
                              <select
                                id="routingSelect"
                                className="form-select"
                              >
                                <option selected>Select</option>
                                <option value="">
                                  242503626| SANKET ENGINEERING
                                </option>
                                <option value="">
                                  242504231| SHRIPAD STEELS
                                </option>
                                <option value="">
                                  242503626| SHREE CHITAMANI HEAT TREATERS
                                </option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <button type="button" className="btn">
                                Search
                              </button>
                            </div>
                            <div className="col-md-1">
                              <button type="button" className="btn">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 ">
                        <div className="col-md-6">
                          <div className="row ">
                            <div className="col-md-4">Item Name:</div>
                            <div className="col-md-6">
                              <input />
                            </div>
                            <div className="col-md-2">
                              <button type="button" className="btn">
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="StoreSubconstatus mt-5">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Out_Date</th>
                              <th>Item Description</th>
                              <th>Out_In</th>
                              <th>Unit</th>
                              <th>Out_Qty</th>
                              <th>Balance.Qty</th>
                              <th>Challan.Qty</th>
                              <th>In Qty(nos)</th>
                              <th>In Qty(Kg)</th>
                              <th>JWT Rate</th>
                              <th>HC</th>
                              <th>Delete</th>
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
                <div className="StoreSubconFooter">
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
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="pills-GST-Details-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-GST-Details"
                        type="button"
                        role="tab"
                        aria-controls="pills-GST-Details"
                        aria-selected="false"
                      >
                        GST Details
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
                      <div className="StoreSubconstatus text-start">
                        <div className="container-fluid">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-4 text-start">
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        {/* First Column Group */}
                                        <tr>
                                          <th className="col-md-4">
                                            Inward F4 No:
                                          </th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InwardF4No"
                                              value={formData.InwardF4No}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InwardF4No && (
                                              <small className="text-danger">
                                                {errors.InwardF4No}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Inward Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="InwardDate"
                                              value={formData.InwardDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InwardDate && (
                                              <small className="text-danger">
                                                {errors.InwardDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Inward Time:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InwardTime"
                                              value={formData.InwardTime}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InwardTime && (
                                              <small className="text-danger">
                                                {errors.InwardTime}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="ChallanNo"
                                              value={formData.ChallanNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.ChallanNo && (
                                              <small className="text-danger">
                                                {errors.ChallanNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="ChallanDate"
                                              value={formData.ChallanDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.ChallanDate && (
                                              <small className="text-danger">
                                                {errors.ChallanDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Gate Entry No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="GateEnrtyNo"
                                              value={formData.GateEnrtyNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.GateEnrtyNo && (
                                              <small className="text-danger">
                                                {errors.GateEnrtyNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Prepared By:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="PreparedBy"
                                              value={formData.PreparedBy}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.PreparedBy && (
                                              <small className="text-danger">
                                                {errors.PreparedBy}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Gate Entry No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="CheckedBy"
                                              value={formData.CheckedBy}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.CheckedBy && (
                                              <small className="text-danger">
                                                {errors.CheckedBy}
                                              </small>
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
                                          <th>Invoice No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="InvoiceNo"
                                              value={formData.InvoiceNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InvoiceNo && (
                                              <small className="text-danger">
                                                {errors.InvoiceNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            Invoice Date:
                                          </th>
                                          <td>
                                            <input
                                              type="date"
                                              name="InvoiceDate"
                                              value={formData.InvoiceDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.InvoiceDate && (
                                              <small className="text-danger">
                                                {errors.InvoiceDate}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>E Way Bill Qty:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="EWayBillQty"
                                              value={formData.EWayBillQty}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.EWayBillQty && (
                                              <small className="text-danger">
                                                {errors.EWayBillQty}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>E Way Bill No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="EWayBillNo"
                                              value={formData.EWayBillNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.EWayBillNo && (
                                              <small className="text-danger">
                                                {errors.EWayBillNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="VehicleNo"
                                              value={formData.VehicleNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.VehicleNo && (
                                              <small className="text-danger">
                                                {errors.VehicleNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Lr No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="LrNo"
                                              value={formData.LrNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.LrNo && (
                                              <small className="text-danger">
                                                {errors.LrNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>TC No:</th>
                                          <td>
                                            <input
                                              type="text"
                                              name="TcNo"
                                              value={formData.TcNo}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.TcNo && (
                                              <small className="text-danger">
                                                {errors.TcNo}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>TC Date:</th>
                                          <td>
                                            <input
                                              type="date"
                                              name="TcDate"
                                              value={formData.TcDate}
                                              onChange={handleChange}
                                              className="form-control"
                                            />
                                            {errors.TcDate && (
                                              <small className="text-danger">
                                                {errors.TcDate}
                                              </small>
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
                                          <th>Transporter:</th>
                                          <td>
                                            <textarea
                                              type="text"
                                              name="Transporter"
                                              value={formData.Transporter}
                                              onChange={handleChange}
                                              className="form-control"
                                              rows="2"
                                            ></textarea>

                                            {errors.Transporter && (
                                              <small className="text-danger">
                                                {errors.Transporter}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Remark:</th>
                                          <td>
                                            <textarea
                                              type="text"
                                              name="Remark"
                                              value={formData.Remark}
                                              onChange={handleChange}
                                              className="form-control"
                                              rows="2"
                                            ></textarea>

                                            {errors.Remark && (
                                              <small className="text-danger">
                                                {errors.Remark}
                                              </small>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            Delivery in Time:
                                          </th>
                                          <td>
                                            <div className="col-md-4">
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
                                          <th>Total Item:</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TotalItem"
                                              value={formData.TotalItem}
                                              onChange={handleChange}
                                            />
                                            {errors.TotalItem && (
                                              <span className="text-danger">
                                                {errors.TotalItem}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Total Qty (No):</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TotalQtyNo"
                                              value={formData.TotalQtyNo}
                                              onChange={handleChange}
                                            />
                                            {errors.TotalQtyNo && (
                                              <span className="text-danger">
                                                {errors.TotalQtyNo}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Total Qty (Kg):</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="TotalQtyKg"
                                              value={formData.TotalQtyKg}
                                              onChange={handleChange}
                                            />
                                            {errors.TotalQtyKg && (
                                              <span className="text-danger">
                                                {errors.TotalQtyKg}
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Store:</th>
                                          <td>
                                            <select
                                              name="Store"
                                              value={formData.Store}
                                              onChange={handleChange} // Use the correct input handler
                                              className="form-select"
                                            >
                                              <option value="Main Store">
                                                Main Store
                                              </option>
                                              <option value="Secondary Store">
                                                Secondary Store
                                              </option>
                                              <option value="Warehouse 1">
                                                Warehouse 1
                                              </option>
                                              <option value="Warehouse 2">
                                                Warehouse 2
                                              </option>
                                              {/* Add more options as needed */}
                                            </select>
                                            {errors.Store && (
                                              <span className="text-danger">
                                                {errors.Store}
                                              </span>
                                            )}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td
                                            colspan="2"
                                            className="text-center"
                                          >
                                            <div className="col-md-12 text-center mt-4">
                                              <button
                                                type="submit"
                                                className="btn"
                                              >
                                                DocTCUpload
                                              </button>
                                            </div>
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
                    <div
                      className="tab-pane fade"
                      id="pills-GST-Details"
                      role="tabpanel"
                      aria-labelledby="pills-GST-Details-tab"
                      tabindex="0"
                    >
                      <div className="StoreSubconstatus1">
                        <div className="row ">
                          <div className="col-md-8 mt-4">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr</th>
                                    <th>Item Code</th>
                                    <th>SAC Code</th>
                                    <th>PO Rate</th>
                                    <th>Rate Type</th>
                                    <th>Qty</th>
                                    <th>Discount</th>
                                    <th>Pack Amt</th>
                                    <th>TransAmt</th>
                                    <th>Ass Value</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>IGST</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>{/* Data rows will go here */}</tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="Purchaseordertable">
                              <div className="row">
                                <div className="col-md-6 text-start">
                                  {/* Second Column Group */}
                                  <div className="container mt-4">
                                    <div className="table-responsive text-start">
                                      <table className="table table-bordered">
                                        <tbody>
                                          <tr>
                                            <th>TDC Assessable Value:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">
                                              (TDC) Pack & Fwrd Charge:
                                            </th>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>TransPort Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Insurance:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Instailation Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Other Charges:</th>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 text-start">
                                  {/* Third Column Group */}
                                  <div className="container mt-4">
                                    <div className="table-responsive">
                                      <table className="table table-bordered">
                                        <tbody>
                                          <tr>
                                            <th>CGST:00.00%</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">
                                              SGST:00.00%
                                            </th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>IGST:00.00%:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>TCS:00.00%:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>GR. Total:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Store:</th>
                                            <td>
                                              <select className="form-select">
                                                <option value="Main Store">
                                                  Main Store
                                                </option>
                                                {/* Add more options as needed */}
                                              </select>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colspan="2"
                                              className="text-start"
                                            >
                                              <button className="btn">
                                                DocTCUpload
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
                          </div>
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

export default InwardChallan1;
