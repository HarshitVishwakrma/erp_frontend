"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./MaterialIssueChallan.css";
import {
  getNextChallanNo,
  postNewMaterialIssue,
  searchEmployeeDept,
} from "../../Service/StoreApi.jsx";
import { fetchUnitMachines } from "../../Service/Production.jsx";

import { toast, ToastContainer } from "react-toastify";

const MaterialIssueChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemsList, setShowItemList] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  function filterItems(items, searchString) {
    // split the input on whitespace, drop empty strings, lowercase
    const keywords = searchString
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    // if no keywords, hide list and return full list (or empty if you prefer)
    if (keywords.length === 0) {
      setShowItemList(false);
      return items;
    }

    // filter
    const filtered = items.filter((item) => {
      const partNo = item.part_no.toLowerCase();
      const desc = item.Name_Description.toLowerCase();
      // include this item if ANY keyword matches part_no OR description
      return keywords.some((kw) => partNo.includes(kw) || desc.includes(kw));
    });

    // hide when there’s nothing to show
    setShowItemList(filtered.length > 0);

    return filtered;
  }

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "http://127.0.0.1:8000/All_Masters/api/item/summary/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      setItems(resData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [series, setSeries] = useState("");
  const [challanNo, setChallanNo] = useState("");

  const shortYear = localStorage.getItem("Shortyear");

  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;
    setSeries(selectedSeries);
    setFormData({ ...formData, Series: selectedSeries });

    if (selectedSeries === "Material Issue" && shortYear) {
      try {
        const challan = await getNextChallanNo(shortYear);
        setChallanNo(challan);
        setFormData((prev) => ({ ...prev, ChallanNo: challan }));
      } catch (error) {
        console.error("Error fetching challan number:", error);
      }
    } else {
      setChallanNo("");
      setFormData((prev) => ({ ...prev, ChallanNo: "" }));
    }
  };

  const [plant, setPlant] = useState("");
  const [type, setType] = useState("");

  const [formData, setFormData] = useState({
    MaterialChallanTable: [],
    Plant: "",
    ChallanNo: "",
    Series: "",
    Type: "",
    Item: "",
    ItemDescription: "",
    Available: "",
    Stock: "",
    Machine: "",
    StoreName: "",
    Qty: "",
    Unit: "",
    Remark: "",
    MrnNo: "",
    Employee: "",
    Dept: "",
    MaterialIssueDate: "", // format: "YYYY-MM-DD"
    MaterialIssueTime: "", // format: "HH:mm AM/PM"
    Contractor: "",
  });

  const [materialChallanTable, setMaterialChallanTable] = useState([]);

  const handleItemSelect = (item) => {
    setShowItemList(false);
    setFormData((prev) => {
      return {
        ...prev,
        Item: item.part_no,
        ItemDescription: item.Name_Description,
        Unit: item.Unit_Code,
      };
    });
  };

  const handleAddEntry = () => {
    const newEntry = {
      ItemDescription: formData.ItemDescription || "",
      Stock: formData.AvailableStock || "",
      Qty: formData.Qty || "",
      Machine: searchTerm || "", // This will display 'M01 - Lathe Machine', for example
      Remark: formData.Remark || "",
      MrnNo: formData.MrnNo || "",
      CoilNo: formData.CoilNo || "",
      Employee: formData.Employee || "",
      Dept: formData.Dept || "",
    };

    console.log("Adding entry:", newEntry); // Add this to debug

    setMaterialChallanTable([...materialChallanTable, newEntry]);

    // Reset form fields after adding
    setFormData({
      ...formData,
      ItemDescription: "",
      AvailableStock: "",
      Qty: "",
      MrnNo: "",
      Employee: "",
      Dept: "",
      NatureOfWork: "",
      CoilNo: "",
    });

    setSearchTerm(""); // Reset machine search
  };

  const handleDelete = (index) => {
    const updatedTable = [...materialChallanTable];
    updatedTable.splice(index, 1);
    setMaterialChallanTable(updatedTable);
  };

  const handleEdit = (index) => {
    const entry = materialChallanTable[index];
    setFormData({
      ...formData,
      ItemDescription: entry.ItemDescription,
      AvailableStock: entry.Stock,
      Qty: entry.Qty,
      Machine: entry.Machine,
      NatureOfWork: entry.Remark,
      MrnNo: entry.MrnNo,
      CoilNo: entry.CoilNo,
      Employee: entry.Employee,
      Dept: entry.Dept,
    });

    // Remove from table for re-adding after edit
    const updatedTable = [...materialChallanTable];
    updatedTable.splice(index, 1);
    setMaterialChallanTable(updatedTable);
  };

  // Add a new state to track form submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update the handleSave function to set isSubmitted to true after successful save
  const handleSave = async () => {
    const payload = {
      ...formData,
      MaterialChallanTable: materialChallanTable,
      ChallanNo: challanNo,
      Series: series,
      Type: type,
      Plant: plant,
      MaterialIssueDate:
        formData.MaterialIssueDate || new Date().toISOString().split("T")[0],
      MaterialIssueTime:
        formData.MaterialIssueTime ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    };

    console.log("Saving payload:", payload); // Add this to debug

    try {
      await postNewMaterialIssue(payload);
      toast.success("Saved successfully!");
      setIsSubmitted(true); // Set submitted to true after successful save
      // Don't clear the form immediately so the user can see what was submitted
      handleClear(); // Clear the form after save
    } catch (error) {
      console.error("Error saving!", error);
      toast.error("Error saving!");
    }
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleEmployeeChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, Employee: value });

    if (value.length >= 2) {
      const results = await searchEmployeeDept(value);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectEmployee = (employee) => {
    setFormData({
      ...formData,
      Employee: `${employee.Code} - ${employee.Name}`,
      Dept: employee.Department || "", // Default to empty if null
    });
    setShowDropdown(false);
  };

  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadMachines = async () => {
      const data = await fetchUnitMachines();
      setMachines(data);
    };
    loadMachines();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const filtered = machines.filter((m) =>
        `${m.WorkCenterCode} ${m.WorkCenterName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredMachines(filtered);
      setShowDropdown(true);
    } else {
      setFilteredMachines([]);
      setShowDropdown(false);
    }
  }, [searchTerm, machines]);

  const handleMachineSelect = (machine) => {
    setFormData({
      ...formData,
      Machine: `${machine.WorkCenterCode} - ${machine.WorkCenterName}`,
    });
    setSearchTerm(`${machine.WorkCenterCode} - ${machine.WorkCenterName}`);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setFormData({
      MaterialChallanTable: [],
      Plant: "",
      ChallanNo: "",
      Series: "",
      Type: "",
      Item: "",
      ItemDescription: "",
      Available: "",
      Stock: "",
      Machine: "",
      StoreName: "",
      Qty: "",
      Unit: "",
      Remark: "",
      MrnNo: "",
      Employee: "",
      Dept: "",
      MaterialIssueDate: "", // or optionally use new Date().toISOString().slice(0, 10)
      MaterialIssueTime: "", // or optionally use new Date().toLocaleTimeString()
      Contractor: "",
    });

    setMaterialChallanTable([]);
    setSearchTerm("");
    setSearchResults([]);
    setShowDropdown(false);
    setIsSubmitted(false);
  };

  return (
    <div className="NewStoreNewMaterialIssue">
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
                <div className="NewMaterialIssue-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">
                        New Material Issue
                      </h5>
                    </div>
                    <div className="col-md-5 mt-4">
                      <div className="row mb-3">
                        <div className="col-2">
                          <select
                            id="sharpSelect"
                            className="form-select"
                            value={plant}
                            onChange={(e) => {
                              setPlant(e.target.value);
                              setFormData({
                                ...formData,
                                Plant: e.target.value,
                              });
                            }}
                          >
                            <option value="Produlink">Produlink</option>
                          </select>
                        </div>

                        <div className="col-md-1 col-sm-2 mt-3">
                          <label htmlFor="seriesSelect" className="form-label">
                            Series:
                          </label>
                        </div>
                        <div className="col-md-2">
                          <select
                            id="seriesSelect"
                            className="form-select"
                            onChange={handleSeriesChange}
                            value={series}
                          >
                            <option value="">Select</option>
                            <option value="Material Issue">
                              Material Issue
                            </option>
                          </select>
                        </div>
                        <div className="col-4">
                          <input
                            type="text"
                            id="inputField"
                            className="form-control mt-1"
                            placeholder="Enter value"
                            value={challanNo}
                            readOnly
                          />
                        </div>
                        {series === "Material Issue" &&
                          challanNo &&
                          isSubmitted && (
                            <div className="col-12 mt-3">
                              <div className="alert alert-success">
                                <h5>
                                  Material Issue Challan Created Successfully
                                </h5>
                                <p>Challan Number: {challanNo}</p>
                                <div className="mt-3">
                                  <Link
                                    to={`/material-issue-details/${challanNo}`}
                                    className="btn btn-primary me-2"
                                  >
                                    View Details
                                  </Link>
                                  <button
                                    className="btn btn-secondary me-2"
                                    onClick={() => window.print()}
                                  >
                                    Print Challan
                                  </button>
                                  <button
                                    className="btn btn-info"
                                    onClick={handleClear}
                                  >
                                    Create New
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        <div className="col-md-1 mt-2">
                          <label htmlFor="typeSelect" className="form-label">
                            Type:
                          </label>
                        </div>
                        <div className="col-md-2">
                          <select
                            id="typeSelect"
                            className="form-select"
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                              setFormData({
                                ...formData,
                                Type: e.target.value,
                              });
                            }}
                          >
                            <option value="">Select</option>
                            <option value="General">General</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 text-end">
                      <Link className="btn" to="/Work-Order-Material">
                        WorkOrder Material Issue Report
                      </Link>

                      <Link className="btn" to="/Material-Issue">
                        Material Issue WorkOrder Only
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="NewMaterialIssue-main">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Item Description</th>
                                <th>Available Stock</th>
                                <th>Machine</th>
                                <th>Store Name</th>
                                <th>Qty / Unit</th>
                                <th>Remark</th>
                                <th>MRN No.</th>
                                <th>Employee</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    name="Item"
                                    value={formData.Item || ""}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        Item: e.target.value,
                                      });
                                      const filtered = filterItems(
                                        items,
                                        e.target.value
                                      );
                                      console.log(filtered);
                                      setFilteredItems(filtered);
                                    }}
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                  {/* <button className="pobtn ms-2">Search</button> */}
                                  {showItemsList && (
                                    <ul
                                      className="dropdown-menu show"
                                      style={{
                                        width: "30%",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        border: "1px solid #ccc",
                                        zIndex: 1000,
                                      }}
                                    >
                                      {filteredItems.map((item) => (
                                        <li
                                          key={item.part_no}
                                          className="dropdown-item"
                                          onClick={() => handleItemSelect(item)}
                                          style={{
                                            padding: "5px",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {item.part_no} - {item.Part_Code} -{" "}
                                          {item.Name_Description}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </td>
                                <td>
                                  <textarea
                                    name="ItemDescription"
                                    value={formData.ItemDescription || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        ItemDescription: e.target.value,
                                      })
                                    }
                                    rows="1"
                                    className="form-control"
                                  ></textarea>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="AvailableStock"
                                    value={formData.AvailableStock || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        AvailableStock: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                </td>
                                <td style={{ position: "relative" }}>
                                  <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search Machine"
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                  {showDropdown &&
                                    filteredMachines.length > 0 && (
                                      <div
                                        className="dropdown-menu show"
                                        style={dropdownStyles}
                                      >
                                        {filteredMachines.map(
                                          (machine, index) => (
                                            <div
                                              key={index}
                                              className="dropdown-item"
                                              onClick={() =>
                                                handleMachineSelect(machine)
                                              }
                                            >
                                              {machine.WorkCenterCode} -{" "}
                                              {machine.WorkCenterName}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    name="StoreName"
                                    value={formData.StoreName || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        StoreName: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="Qty"
                                    value={formData.Qty || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Qty: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                  <select
                                    name="Unit"
                                    value={formData.Unit || "Pcs"}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Unit: e.target.value,
                                      })
                                    }
                                    className="form-select mt-2"
                                  >
                                    <option value="Pcs">Pcs</option>
                                    <option value="Kg">Kg</option>
                                  </select>
                                </td>
                                <td>
                                  <textarea
                                    name="Remark"
                                    value={formData.Remark || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Remark: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  ></textarea>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="MrnNo"
                                    value={formData.MrnNo || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        MrnNo: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                </td>
                                <td style={{ position: "relative" }}>
                                  <input
                                    type="text"
                                    name="Employee"
                                    placeholder="code ,employee"
                                    value={formData.Employee}
                                    onChange={handleEmployeeChange}
                                    className="form-control"
                                    autoComplete="off"
                                  />
                                  {showDropdown && searchResults.length > 0 && (
                                    <div
                                      className="dropdown-menu show"
                                      style={dropdownStyles}
                                    >
                                      {searchResults.map((emp, index) => (
                                        <div
                                          key={index}
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleSelectEmployee(emp)
                                          }
                                        >
                                          {emp.Code} - {emp.Name} (
                                          {emp.Department})
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <input
                                    type="text"
                                    name="Dept"
                                    value={formData.Dept}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        Dept: e.target.value,
                                      })
                                    }
                                    className="form-control"
                                  />
                                </td>

                                <td>
                                  <button
                                    type="button"
                                    className="pobtn"
                                    onClick={handleAddEntry}
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="NewMaterialIssuetable">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item Desc</th>
                              <th>BOM | WO | Req. Qty</th>
                              <th>Issued | Bal Qty</th>
                              <th>Stock</th>

                              <th>Qty </th>
                              <th>Machine </th>
                              <th>Nature of Work</th>
                              <th>MRN No: Cail No:</th>
                              <th>Employee: </th>

                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialChallanTable.map((entry, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td>{entry.ItemDescription}</td>
                                <td>
                                  BOM Qty: <br></br> WO Qty : <br></br>Tot Req.
                                  Qty:
                                </td>
                                <td>
                                  Issued Qty:
                                  <br></br>Bal Qty:
                                </td>
                                <td>{entry.Stock}</td>
                                <td>{entry.Qty}</td>
                                <td>{entry.Machine}</td>
                                <td>{entry.Remark}</td>
                                <td>
                                  {entry.MrnNo}
                                  {entry.CoilNo}
                                </td>

                                <td>
                                  {entry.Employee}
                                  {entry.Dept}
                                </td>

                                <td>
                                  <FaEdit
                                    className="text-primary me-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleEdit(index)}
                                  />
                                </td>

                                <td>
                                  <FaTrash
                                    className="text-danger"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleDelete(index)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="NewgrnFooter">
                    <div className="container-fluid">
                      {/* Input Fields */}
                      <div className="row g-3">
                        {/* M Issue No */}
                        <div className="col-md-3">
                          <div className="row align-items-center">
                            <div className="col-4 text-end">
                              <label>M Issue No:</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                id="inputField"
                                className="form-control mt-1"
                                placeholder="Enter value"
                                value={challanNo}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        {/* M Issue Date */}
                        <div className="col-md-2">
                          <div className="row align-items-center">
                            <div className="col-4 text-end">
                              <label>M Issue Date:</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="date"
                                className="form-control"
                                value={formData.MaterialIssueDate}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    MaterialIssueDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* M Issue Time */}
                        <div className="col-md-2">
                          <div className="row align-items-center">
                            <div className="col-4 text-end">
                              <label>M Issue Time:</label>
                            </div>
                            <div className="col-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Time"
                                value={formData.MaterialIssueTime}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    MaterialIssueTime: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* Contractor */}
                        <div className="col-md-2">
                          <div className="row align-items-center">
                            <div className="col-4 text-end">
                              <label>Contractor:</label>
                            </div>
                            <div className="col-8">
                              <select
                                className="form-select"
                                value={formData.Contractor}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    Contractor: e.target.value,
                                  })
                                }
                              >
                                <option value="">Select</option>
                                <option value="Savi">Savi</option>
                                <option value="Maxwell">Maxwell</option>
                                <option value="Prime Works">Prime Works</option>
                                {/* Add more options as needed */}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Save & Clear Buttons */}
                        {/* Save & Clear Buttons */}
                        <div className="col-md-2 d-flex justify-content-end align-items-center">
                          <button
                            className="btn w-100 btn-success"
                            onClick={handleSave}
                          >
                            Save Challan
                          </button>
                        </div>
                        <div className="col-md-1 d-flex justify-content-end align-items-center">
                          <button
                            className="btn w-100 btn-secondary"
                            onClick={handleClear}
                          >
                            Cancel
                          </button>
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

export default MaterialIssueChallan;
const dropdownStyles = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  maxHeight: "200px",
  overflowY: "auto",
  zIndex: 1000,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
};
