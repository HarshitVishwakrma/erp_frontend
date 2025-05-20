import React, { useEffect, useState ,useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";


import "./BillMaterial.css";
import VisibleStandard from "./VisibleStandard.jsx";
// Purchase Card
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  saveDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartmentCard,
} from "../../../Service/Api.jsx";


import VisibleBomitem from "./VisibleBomitem.jsx";
import { Link } from "react-router-dom";
import BOMoperation from "../BOMoperation/BOMoperation.jsx";
import {
  fetchScrapData,
searchItems, saveBomItem, deleteBomItem
} from "../../../Service/Api.jsx";



const BillMaterial = () => {
  
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("BOM");

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

  //   card
  const [cardVisibleProduction, setCardVisibleProduction] = useState(false);

  const toggleCardProduction = () => {
    setCardVisibleProduction(!cardVisibleProduction);
  };

  const [cardVisibleOperation, setCardVisibleOperation] = useState(false);

  const toggleCardOperation = () => {
    setCardVisibleOperation(!cardVisibleOperation);
  };

  const [cardVisibleStandard, setCardVisibleStandard] = useState(false);

  const toggleCardStandard = () => {
    setCardVisibleStandard(!cardVisibleStandard);
  };

  const [cardVisibleBomitem, setCardVisibleBomitem] = useState(false);

  const toggleCardBomitem = () => {
    setCardVisibleBomitem(!cardVisibleBomitem);
  };


  const [cardVisiblePlus, setCardVisiblePlus] = useState(false);

  const toggleCardPlus = () => {
    setCardVisiblePlus(!cardVisiblePlus);
  };


  // Purchase Card
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Department_Name: "",
    Short_Name: "",
    Std_Otp: "",
    Operation_Name: "",
    Prefix: "",
    Mhr_Rate: "",
    BomQc: "",
    ProductionDept: "",
    MachineType: "",
    Production_Cycle_Time: "",
    Stop_Mc_Booking: "",
    Per_Day_Prod_Qty: "",
    Bom_Item_Group: "",
    Item: "",
    Qty: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Department_Name) {
      newErrors.Department_Name = "This field is required.";
    }
    if (!formData.Short_Name) {
      newErrors.Short_Name = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (isEditing) {
        await updateDepartment(editId, formData);
        toast.success("Department updated successfully!");
      } else {
        await saveDepartment(formData);
        toast.success("Department saved successfully!");
      }
      fetchDepartments(); // Refresh data
      setFormData({ Department_Name: "", Short_Name: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      toast.error("Failed to save department.");
      console.error("Error saving department:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setData(response);
    } catch (error) {
      toast.error("Failed to fetch departments.");
      console.error("Error fetching departments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartmentCard(id);
      toast.success("Department deleted successfully!");
      fetchDepartments(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete department.");
      console.error("Error deleting department:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      Department_Name: item.Department_Name,
      Short_Name: item.Short_Name,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  //BOM
const [formData1, setFormData1] = useState({
    OPNo: "",
    PartCode: "",
    BOMPartType: [],
    BomPartCode: "",
    QtyKg: "",
    ScrapCode: "",
    ScracpQty: "",
    QC: "",
    AssProd: "",
  })

  const [tableData, setTableData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [scrapOptions, setScrapOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Load scrap data on component mount
    const loadScrapData = async () => {
      const data = await fetchScrapData()
      setScrapOptions(data)
    }

    loadScrapData()

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      // Handle checkbox for BOMPartType
      if (checked) {
        setFormData1({
          ...formData1,
          BOMPartType: [...formData1.BOMPartType, value],
        })
      } else {
        setFormData1({
          ...formData1,
          BOMPartType: formData1.BOMPartType.filter((type) => type !== value),
        })
      }
    } else {
      // Handle other inputs
      setFormData1({
        ...formData1,
        [name]: value,
      })
    }
  }

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearchTerm(value)

   if (value.length > 0) {
      try {
        const data = await searchItems(value)
        setSearchResults(data)
        setShowDropdown(true)
      } catch (error) {
        console.error("Error searching items:", error)
        setSearchResults([])
        setShowDropdown(false)
      }
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
  }

  const handleSearchSelect = (item) => {
    setSelectedItem(item)
    setSearchTerm(`${item.part_no} - ${item.Name_Description}`)
    setShowDropdown(false)

    // If the item has BOM items, populate the table
    if (item.bom_items && item.bom_items.length > 0) {
      setTableData(item.bom_items)
    } else {
      setTableData([])
    }
  }

  const handleSearch = async () => {
    if (searchTerm) {
      try {
         const data = await searchItems(searchTerm)
        if (data.length > 0) {
          const item = data[0]
          setSelectedItem(item)

          // If the item has BOM items, populate the table
          if (item.bom_items && item.bom_items.length > 0) {
            setTableData(item.bom_items)
          } else {
            setTableData([])
          }
        } else {
          setSelectedItem(null)
          setTableData([])
        }
      } catch (error) {
        console.error("Error searching items:", error)
        setSelectedItem(null)
        setTableData([])
      }
    }
  }

  const handleClear = () => {
    setSearchTerm("")
    setSelectedItem(null)
    setTableData([])
  }

  const handleSave1 = async () => {
    try {
      // Format BOMPartType as a string if needed by the API
      const formattedData = {
        ...formData1,
        BOMPartType: formData1.BOMPartType.join(","), // Convert array to comma-separated string
      }

      const itemId = selectedItem ? selectedItem.id : 1 // Default to 1 if no item selected

       await saveBomItem(itemId, formattedData, editingId)

      // Refresh the table data
      if (selectedItem) {
        const data = await searchItems(selectedItem.part_no)
        if (data.length > 0) {
          setTableData(data[0].bom_items || [])
        }
      }

      // Reset form
      setFormData1({
        OPNo: "",
        PartCode: "",
        BOMPartType: [],
        BomPartCode: "",
        QtyKg: "",
        ScrapCode: "",
        ScracpQty: "",
        QC: "",
        AssProd: "",
      })
      setEditingId(null)
    } catch (error) {
      console.error("Error saving BOM data:", error)
      alert("Error saving data. Please try again.")
    }
  }

  const handleEdit1 = (item) => {
    setEditingId(item.id)

    // Convert BOMPartType string back to array if needed
    const bomPartTypeArray = typeof item.BOMPartType === "string" ? item.BOMPartType.split(",") : item.BOMPartType

    setFormData1({
      OPNo: item.OPNo || "",
      PartCode: item.PartCode || "",
      BOMPartType: bomPartTypeArray || [],
      BomPartCode: item.BomPartCode || "",
      QtyKg: item.QtyKg || "",
      ScrapCode: item.ScrapCode || "",
      ScracpQty: item.ScracpQty || "",
      QC: item.QC || "",
      AssProd: item.AssProd || "",
    })
  }

  const handleDelete1 = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const itemId = selectedItem ? selectedItem.id : 1
        await deleteBomItem(itemId, id)
        // Refresh the table data
        setTableData(tableData.filter((item) => item.id !== id))
      } catch (error) {
        console.error("Error deleting BOM data:", error)
        alert("Error deleting data. Please try again.")
      }
    }
  }

  const toggleCardPlus1 = () => {
    // Implement your card toggle functionality here
    console.log("Toggle card plus clicked")
  }

  
  return (
    <div className="BillMaterial">
      <div className="container-fluid">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={toggleSideNav}
              />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="BillMaterial1">
                  <div className="BillMaterialMain mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <h5 className="header-title">
                          Routing & Bill of Material (BOM)
                        </h5>
                      </div>
                      <div className="col-md-7 text-end">
                        <button
                          className="Billmaterialbtn"
                          onClick={toggleCardProduction}
                        >
                          1. Production Dept
                        </button>
                        <button
                          className="Billmaterialbtn"
                          onClick={toggleCardOperation}
                        >
                          2. Operation Master
                        </button>
                        <button
                          className="Billmaterialbtn"
                          onClick={toggleCardStandard}
                        >
                          3. Std Routing
                        </button>
                        <button
                          className="Billmaterialbtn"
                          onClick={toggleCardBomitem}
                        >
                          BOM Item Group
                        </button>
                        <button className="Billmaterialbtn">BOM Print</button>
                        <Link to={"/bom-routing"} className="Billmaterialbtn">
                          BOM List
                        </Link>
                      </div>
                    </div>
                  </div>

                  {cardVisibleProduction && (
                    <div className="ProductionDeptCard">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 style={{ color: "blue" }}>
                            Production Department Master
                          </h5>
                          <button
                            className="Closebom"
                            onClick={toggleCardProduction}
                          >
                            X
                          </button>
                        </div>

                        <div className="card-body">
                          <form onSubmit={handleSave}>
                            <div className="row mb-3 text-start">
                              <div className="col-md-5">
                                <label
                                  htmlFor="Department_Name"
                                  className="form-label"
                                >
                                  Department Name:
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.Department_Name ? "is-invalid" : ""
                                  }`}
                                  id="Department_Name"
                                  name="Department_Name"
                                  value={formData.Department_Name}
                                  onChange={handleInputChange}
                                  placeholder="Enter department name"
                                />
                                {errors.Department_Name && (
                                  <div className="invalid-feedback">
                                    {errors.Department_Name}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-5">
                                <label
                                  htmlFor="Short_Name"
                                  className="form-label"
                                >
                                  Short Name:
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.Short_Name ? "is-invalid" : ""
                                  }`}
                                  id="Short_Name"
                                  name="Short_Name"
                                  value={formData.Short_Name}
                                  onChange={handleInputChange}
                                  placeholder="Enter short name"
                                />
                                {errors.Short_Name && (
                                  <div className="invalid-feedback">
                                    {errors.Short_Name}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-2">
                                <button
                                  type="submit"
                                  className="bomButton"
                                  style={{ marginTop: "31px" }}
                                >
                                  {isEditing ? "Update" : "Save"}
                                </button>
                              </div>
                            </div>
                          </form>
                          <div className="row">
                            <div className="col-12">
                              <table className="table table-bordered table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Department Name</th>
                                    <th scope="col">Short Name</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.length > 0 ? (
                                    data.map((item, index) => (
                                      <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.Department_Name}</td>
                                        <td>{item.Short_Name}</td>
                                        <td>
                                          <FaEdit
                                            className="text-primary mx-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleEdit(item)}
                                          />
                                        </td>
                                        <td>
                                          <FaTrash
                                            className="text-danger mx-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleDelete(item.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="5" className="text-center">
                                        No data found!
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {cardVisibleOperation && <BOMoperation />}
                  {cardVisibleStandard && (
                    <div className="Standard">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <span>Standard Routing Master</span>
                          <button
                            className="Closebom"
                            onClick={toggleCardStandard}
                          >
                            X
                          </button>
                        </div>
                        <VisibleStandard />
                      </div>
                    </div>
                  )}
                  {cardVisibleBomitem && (
                    <div className="Bomitem">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <span>BOM Item Group Details</span>
                          <button
                            className="Closebom"
                            onClick={toggleCardBomitem}
                          >
                            X
                          </button>
                        </div>
                        <VisibleBomitem />
                      </div>
                    </div>
                  )}
                  <div className="BillMaterialsection mt-4">
                    <div className="container-fluid">
                      <div className="row mt-3 text-start mt-4">
                        <div className="col-md-1 mt-2">
                          <lable>Select Item:</lable>
                        </div>
            <div className="col-md-2 mt-1 position-relative" ref={dropdownRef}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by part number"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {showDropdown && searchResults.length > 0 && (
                <div
                  className="position-absolute w-100 bg-white border rounded shadow-sm z-10"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 border-bottom cursor-pointer hover:bg-light"
                      onClick={() => handleSearchSelect(item)}
                    >
                      {item.part_no} - {item.Name_Description}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-2">
              <button className="materialbtn me-2" onClick={handleSearch}>
                Search
              </button>
              <button className="materialbtn" onClick={handleClear}>
                Clear
              </button>
            </div>


                        <div className="col-md-1" style={{ marginTop: "10px" }}>
                          <label className="form-label">Born Authorise</label>
                        </div>
                        <div className="col-md-1">
                          <select className="form-select">
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </div>
                        <div className="col-md-1">
                          <button className="materialbtn">Copy BOM</button>
                        </div>
                        <div className="col-md-2">
                          <p style={{ color: "blue", marginTop: "10px" }}>
                            Calculate RM Wt
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-start">
                          <div className="tabs">
                            <ul className="nav nav-tabs">
                              <li className="nav-item">
                                <button
                                  className={`nav-link ${
                                    activeTab === "BOM" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("BOM")}
                                >
                                  BOM
                                </button>
                              </li>
                              <li className="nav-item">
                                <button
                                  className={`nav-link ${
                                    activeTab === "BOM History" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("BOM History")}
                                >
                                  BOM History
                                </button>
                              </li>
                            </ul>
                            <div
                              className="tab-content"
                              style={{ border: "none" }}
                            >
                              {activeTab === "BOM" && (
                                <div className="tab-pane fade show active">
                                  <div className="row">
                                    <div className="col-md-1">
                                      <input
                                        type="checkbox"
                                        id="manualCheckbox"
                                      />
                                      <label
                                        htmlFor="manualCheckbox"
                                        className="ms-2"
                                      >
                                        Manual
                                      </label>
                                    </div>
                                    <div className="col-md-4">
                                      <input
                                        type="checkbox"
                                        id="routingCheckbox"
                                      />
                                      <label
                                        htmlFor="routingCheckbox"
                                        className="ms-2"
                                      >
                                        Standard Routing
                                      </label>
                                    </div>
                                  </div>
                                <div className="row mb-3 text-start mt-4">
        <div className="col-md-1">
          <label>Op No:</label>
          <input type="text" className="form-control" name="OPNo" value={formData1.OPNo} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <label>Part Code:</label>
          <div className="row align-items-center">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="PartCode"
                value={formData1.PartCode}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <button className="btn" onClick={toggleCardPlus1}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <label>BOM Part Type:</label>
          <div className="row mt-2">
            {["RM", "COM", "BOM"].map((type) => (
              <div key={type} className="col-md-2 d-flex ms-4">
                <input
                  type="checkbox"
                  id={type}
                  name="BOMPartType"
                  value={type}
                  checked={formData1.BOMPartType.includes(type)}
                  onChange={handleChange}
                />
                <label htmlFor={type} className="ms-2">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-1">
          <label>Bom Part Code:</label>
          <input
            type="text"
            className="form-control"
            name="BomPartCode"
            value={formData1.BomPartCode}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1">
          <label>Qty : Kg</label>
          <input type="text" className="form-control" name="QtyKg" value={formData1.QtyKg} onChange={handleChange} />
        </div>
        <div className="col-md-1">
          <label>Scrap Code</label>
          <select className="form-control" name="ScrapCode" value={formData1.ScrapCode} onChange={handleChange}>
            <option value="">Select</option>
            {scrapOptions.map((item, index) => (
              <option key={index} value={item.part_no}>
                {item.part_no} || {item.Name_Description}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-1">
          <label>Scrap Qty</label>
          <input
            type="text"
            className="form-control"
            name="ScracpQty"
            value={formData1.ScracpQty}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1">
          <label>QC</label>
          <input type="text" className="form-control" name="QC" value={formData1.QC} onChange={handleChange} />
        </div>
        <div className="col-md-1">
          <label>Ass Prod</label>
          <select className="form-control" name="AssProd" value={formData1.AssProd} onChange={handleChange}>
            <option value="">Select</option>
            <option value="NO">NO</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="col-md-1 d-flex align-items-end mb-1">
          <button className="btn me-2" onClick={handleSave1}>
            {editingId ? "Update" : "Save"}
          </button>
        </div>
      </div>
                                 
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>OP No</th>
                <th>Part Code</th>
                <th>BOM Part type</th>
                <th>BOM Part Code</th>
                <th>Qty</th>
                <th>Scrap Code</th>
                <th>Scrap Qty</th>
                <th>QC</th>
                <th>AssProd</th>
                <th>Item</th>
                <th>Edit</th>
                <th>Del</th>
              </tr>
            </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.OPNo}</td>
                      <td>{item.PartCode}</td>
                      <td>{item.BOMPartType}</td>
                      <td>{item.BomPartCode}</td>
                      <td>{item.QtyKg}</td>
                      <td>{item.ScrapCode}</td>
                      <td>{item.ScracpQty}</td>
                      <td>{item.QC}</td>
                      <td>{item.AssProd}</td>
                      <td>{item.item}</td>
                      <td>
                        <button className="btn btn-sm" onClick={() => handleEdit1(item)}>
                          <FaEdit />
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm" onClick={() => handleDelete1(item.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
          </table>
        </div>

                                </div>
                              )}
                              {activeTab === "BOM History" && (
                                <div className="tab-pane fade show active">
                                  <div className="row mb-3 text-start">
                                    <div className="col-md-2 ms-1">
                                      <label>Select BOM Revision:</label>
                                    </div>
                                    <div className="col-md-1">
                                      <select
                                        name=""
                                        className="form-control"
                                        style={{ marginTop: "-1px" }}
                                      >
                                        <option value="">Select</option>
                                        <option value="All">All</option>
                                        <option value="Director">
                                          Director
                                        </option>
                                        <option value="Admin">Admin</option>
                                        <option value="Ac">Ac</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Store">Store</option>
                                        <option value="Planning">
                                          Planning
                                        </option>
                                        <option value="Purchase">
                                          Purchase
                                        </option>
                                        <option value="CRM">CRM</option>
                                        <option value="Account">Account</option>
                                      </select>
                                    </div>
                                    <div className="col-md-2">
                                      <button className="btn">
                                        Export To Excel
                                      </button>
                                    </div>
                                  </div>
                                  <div className="table-responsive">
                                    <table className="table table-bordered mt-3">
                                      <thead>
                                        <tr>
                                          <th>NO Data Found</th>
                                        </tr>
                                      </thead>
                                      <tbody></tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                              {cardVisiblePlus && (
                    <div className="ProductionDeptCard mt-5">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 style={{ color: "blue" }}>
                            BOM : Item Part Master
                          </h5>
                          <button
                            className="Closebom"
                            onClick={toggleCardPlus}
                          >
                            X
                          </button>
                        </div>

                        <div className="card-body">
                          
                            <div className="row mb-3 text-start">
                              <div className="col-md-5">
                                <label
                                  htmlFor="Operator"
                                  className="form-label"
                                >
                                  Operation:
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.Operator ? "is-invalid" : ""
                                  }`}
                                  id="Operator"
                                  name="Operator"
                                  value={formData.Operator}
                                  onChange={handleInputChange}
                                  placeholder="Enter department name"
                                />
                                {errors.Operator && (
                                  <div className="invalid-feedback">
                                    {errors.Operator}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-5">
                                <label
                                  htmlFor="PartCode"
                                  className="form-label"
                                >
                                  Part Code:
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.PartCode ? "is-invalid" : ""
                                  }`}
                                  id="PartCode"
                                  name="PartCode"
                                  value={formData.PartCode}
                                  onChange={handleInputChange}
                                  placeholder="Enter short name"
                                />
                                {errors.PartCode && (
                                  <div className="invalid-feedback">
                                    {errors.PartCode}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-2">
                                <button
                                  type="submit"
                                  className="bomButton"
                                  style={{ marginTop: "31px" }}
                                >
                                  {isEditing ? "Update" : "Save"}
                                </button>
                              </div>
                            </div>
                       
                          <div className="row">
                            <div className="col-12">
                              <table className="table table-bordered table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Part Code</th>
                                    <th scope="col">Min Level</th>
                                    <th scope="col">Max Level</th>

                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                  </tr>
                                </thead>
                               
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

export default BillMaterial;
