"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaTrash, FaEye } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./NewGateInward.css"
import {
  getNewGateInward,
  SaveNewGateInward,
  searchMRNItem,
  searchCustomerByNumber,
  getgateInwardById,
} from "../../../Service/StoreApi.jsx"

const NewGateInward = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditMode, setIsEditMode] = useState(false)
  const [sideNavOpen, setSideNavOpen] = useState(false)

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState)
  }

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open")
    } else {
      document.body.classList.remove("side-nav-open")
    }
  }, [sideNavOpen])

  const shortYear = localStorage.getItem("Shortyear") // Get year from localStorage

  const [formData, setFormData] = useState({
    Plant: "",
    Series: "",
    Type: "",
    Supp_Cust: "",
    GE_No: "",
    GE_Date: "",
    GE_Time: "",
    ChallanNo: "",
    ChallanDate: "",
    Select: "",
    InVoiceNo: "",
    Invoicedate: "",
    EWayBillNo: "",
    EWayBillDate: "",
    ContactPerson: "",
    VehicleNo: "",
    LrNo: "",
    Transporter: "",
    Remark: "",
    ItemDetails: [],
  })

  const [newItem, setNewItem] = useState({
    ItemNo: "",
    Description: "",
    Qty_NOS: "",
    QTY_KG: "",
    Unit_Code: "",
    Remark: "",
  })

  // Customer search states
  const [, setCustomerSearchQuery] = useState("")
  const [customerSearchResults, setCustomerSearchResults] = useState([])
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [, setSelectedCustomer] = useState(null)

  // PO list states
  const [poList, setPoList] = useState([])

  // Load data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true)
      fetchGateInwardDetails(id)
    } else {
      // If not in edit mode, initialize with default values
      if (formData.Series === "GateInward") {
        getNewGateInward(shortYear).then((nextGE_No) => {
          setFormData((prev) => ({ ...prev, GE_No: nextGE_No || "" }))
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, shortYear])

  const fetchGateInwardDetails = async (id) => {
    try {
      const data = await getgateInwardById(id)
      if (data) {
        // Format dates for form inputs
        const formattedData = {
          ...data,
          GE_Date: data.GE_Date ? formatDateForInput(data.GE_Date) : "",
          ChallanDate: data.ChallanDate ? formatDateForInput(data.ChallanDate) : "",
          Invoicedate: data.Invoicedate ? formatDateForInput(data.Invoicedate) : "",
          EWayBillDate: data.EWayBillDate ? formatDateForInput(data.EWayBillDate) : "",
          ItemDetails: data.ItemDetails || [],
        }
        setFormData(formattedData)

        // If there's a customer, trigger search to populate PO list
        if (data.Supp_Cust) {
          handleCustomerSearch(data.Supp_Cust)
        }

        // Set selected PO if available
        if (data.Select) {
          setSelectedPoNo(data.Select)
        }
      }
    } catch (error) {
      console.error("Error fetching gate inward details:", error)
      toast.error("Failed to load gate inward details")
    }
  }

  // Helper function to format date for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  // Function to handle dropdown change
  const handleSeriesChange = async (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (value === "GateInward" && !isEditMode) {
      const nextGE_No = await getNewGateInward(shortYear)
      setFormData((prev) => ({ ...prev, GE_No: nextGE_No || "" }))
    } else if (!isEditMode) {
      setFormData((prev) => ({ ...prev, GE_No: "" }))
    }
  }

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If changing the Supp_Cust field, trigger customer search
    if (name === "Supp_Cust") {
      handleCustomerSearch(value)
    }

    // If selecting a PO from the dropdown, open the PDF
    if (name === "Select" && value) {
      const selectedPo = poList.find((po) => po.PoNo === value)
      if (selectedPo && selectedPo.pdf_link) {
        window.open(selectedPo.pdf_link, "_blank")
      }
    }
  }

  // Function to handle customer search
  const handleCustomerSearch = async (query) => {
    setCustomerSearchQuery(query)

    if (query.length > 0) {
      try {
        const results = await searchCustomerByNumber(query)
        setCustomerSearchResults(results)
        setShowCustomerDropdown(true)
      } catch (error) {
        console.error("Error searching for customer:", error)
        setCustomerSearchResults([])
      }
    } else {
      setCustomerSearchResults([])
      setShowCustomerDropdown(false)
    }
  }

  // Function to handle customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer)
    setFormData((prev) => ({
      ...prev,
      Supp_Cust: customer.number + " - " + customer.Name,
    }))
    setShowCustomerDropdown(false)

    // Get unique PO numbers for this customer
    const uniquePoNumbers = []
    const uniquePoMap = {}

    customerSearchResults.forEach((item) => {
      if (item.number === customer.number && !uniquePoMap[item.PoNo]) {
        uniquePoMap[item.PoNo] = true
        uniquePoNumbers.push({
          PoNo: item.PoNo,
          pdf_link: item.pdf_link,
        })
      }
    })

    setPoList(uniquePoNumbers)
  }

  const [selectedPoNo, setSelectedPoNo] = useState("")
  const handlePoSelectChange = (e) => {
    const selected = e.target.value
    setSelectedPoNo(selected)
    setFormData((prev) => ({ ...prev, Select: selected }))
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("Submitting Data:", formData) // Log formData before submission

      // Add id to formData if in edit mode
      const dataToSubmit = isEditMode ? { ...formData, id } : formData

      const response = await SaveNewGateInward(dataToSubmit)
      console.log("API Response:", response) // Log API response

      if (response) {
        toast.success(isEditMode ? "Entry updated successfully!" : "Entry saved successfully!")

        if (!isEditMode) {
          // Only reset form if creating a new entry
          const nextGE_No = await getNewGateInward(shortYear)
          console.log("Next GE_No:", nextGE_No) // Log new GE_No

          setFormData((prev) => ({
            ...prev,
            GE_No: nextGE_No || "",
            ItemDetails: [],
          }))
        } else {
          // Navigate back to list after successful edit
          setTimeout(() => {
            navigate("/Gate-Inward-Entry")
          }, 2000)
        }
      }
    } catch (error) {
      console.error("API Error:", error) // Log API errors
      toast.error("Error saving entry. Please try again.")
    }
  }

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 0) {
      const results = await searchMRNItem(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // Select item from dropdown
  const handleSelectItem = (item) => {
    setNewItem({
      ...newItem,
      ItemNo: item.part_no,
      Description: item.Name_Description,
      Unit_Code: item.Unit_Code,
    })
    setSearchQuery("") // Clear search input
    setSearchResults([]) // Hide dropdown
  }

  // Add item to table
  const addItem = () => {
    if (!newItem.ItemNo || !newItem.Description || !newItem.Unit_Code) {
      toast.error("Please select an item with Description and Unit Code.")
      return
    }

    setFormData((prev) => ({
      ...prev,
      ItemDetails: [...prev.ItemDetails, newItem],
    }))

    setNewItem({
      ItemNo: "",
      Description: "",
      Qty_NOS: "",
      QTY_KG: "",
      Unit_Code: "",
      Remark: "",
    })
  }

  // Delete item from table
  const deleteItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      ItemDetails: prev.ItemDetails.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="NewStoreNewGateInward">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="NewGateInward-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        {isEditMode ? "Edit Gate Entry - Inward" : "New Gate Entry - Inward"}
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <Link className="btn" to={"/Gate-Inward-Entry"}>
                        Gate Entry Inward List
                      </Link>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="NewGateInward-main">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
                          Item Details
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-Gernal-Detail"
                        role="tabpanel"
                        aria-labelledby="pills-Gernal-Detail-tab"
                        tabIndex="0"
                      >
                        <div className="NewGateInward1">
                          <div className="container-fluid">
                            <div className="row mt-4 text-start">
                              <div className="col-md-1">
                                <label htmlFor="Plant">Plant:</label>
                              </div>
                              <div className="col-md-2">
                                <select
                                  id="Plant"
                                  name="Plant"
                                  className="form-control"
                                  value={formData.Plant}
                                  onChange={handleChange}
                                  required
                                  style={{ marginTop: "-4px" }}
                                >
                                  <option value="">Select Plant</option>
                                  <option value="Produlink">Produlink</option>
                                </select>
                              </div>

                              <div className="col-md-1">
                                <label htmlFor="Series">Series:</label>
                              </div>
                              <div className="col-md-2">
                                <select
                                  id="Series"
                                  name="Series"
                                  className="form-control"
                                  value={formData.Series}
                                  onChange={handleSeriesChange}
                                  required
                                  style={{ marginTop: "-4px" }}
                                  disabled={isEditMode}
                                >
                                  <option value="">Select Series</option>
                                  <option value="GateInward">Gate Inward</option>
                                </select>
                              </div>

                              <div className="col-md-1">
                                <label htmlFor="Type">Type:</label>
                              </div>
                              <div className="col-md-2">
                                <select
                                  id="Type"
                                  name="Type"
                                  className="form-control"
                                  value={formData.Type}
                                  onChange={handleChange}
                                  style={{ marginTop: "-4px" }}
                                >
                                  <option value="">Select Type</option>
                                  <option value="PurchaseGRN">Purchase GRN</option>
                                  <option value="ScheduleGRN">Schedule GRN</option>
                                  <option value="ImportGRN">Import GRN</option>
                                  <option value="57F4GRN">57F4 GRN</option>
                                  <option value="jobworkGRN">jobwork GRN</option>
                                  <option value="DC GRN">DC GRN</option>
                                  <option value="InterStoreInvoice">Inter Store Invoice</option>
                                  <option value="InterStoreChallan">Inter Store Challan</option>
                                  <option value="Sales Return">Sales Return</option>
                                  <option value="DirectGRN">Direct GRN</option>
                                  <option value="General/Document/Courier">General/Document/Courier</option>
                                </select>
                              </div>
                            </div>

                            <div className="row text-start mt-4">
                              <div className="col-md-4">
                                <div className="container-fluid mt-4">
                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="Supp_Cust">Supp./Cust:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <div className="position-relative">
                                        <input
                                          type="text"
                                          id="Supp_Cust"
                                          name="Supp_Cust"
                                          className="form-control"
                                          value={formData.Supp_Cust}
                                          onChange={handleChange}
                                          autoComplete="off"
                                        />
                                        {showCustomerDropdown && customerSearchResults.length > 0 && (
                                          <div
                                            className="dropdown-menu show w-100"
                                            style={{ maxHeight: "200px", overflowY: "auto" }}
                                          >
                                            {customerSearchResults.map((customer, index) => {
                                              // Create a unique key based on customer number and name
                                              const key = `${customer.number}-${customer.Name}-${index}`
                                              // Check if this customer has already been rendered
                                              const isDuplicate =
                                                customerSearchResults.findIndex(
                                                  (c, i) =>
                                                    i < index &&
                                                    c.number === customer.number &&
                                                    c.Name === customer.Name,
                                                ) !== -1

                                              // Only render unique customers
                                              if (!isDuplicate) {
                                                return (
                                                  <div
                                                    key={key}
                                                    className="dropdown-item"
                                                    onClick={() => handleSelectCustomer(customer)}
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                    <div>
                                                      {customer.number} - {customer.Name}
                                                    </div>
                                                    <small className="text-muted">{customer.Type}</small>
                                                  </div>
                                                )
                                              }
                                              return null
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="GE_No">GE No:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="GE_No"
                                        name="GE_No"
                                        className="form-control"
                                        value={formData.GE_No}
                                        onChange={handleChange}
                                        readOnly
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="GE_Date">GE Date:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="date"
                                        id="GE_Date"
                                        name="GE_Date"
                                        className="form-control"
                                        value={formData.GE_Date}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="GE_Time">GE Time:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="time"
                                        id="GE_Time"
                                        name="GE_Time"
                                        className="form-control"
                                        value={formData.GE_Time}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="ChallanNo">Challan No:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="ChallanNo"
                                        name="ChallanNo"
                                        className="form-control"
                                        value={formData.ChallanNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="ChallanDate">Challan Date:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="date"
                                        id="ChallanDate"
                                        name="ChallanDate"
                                        className="form-control"
                                        value={formData.ChallanDate}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="container-fluid mt-4">
                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="Select">Select Series:</label>
                                    </div>
                                    <div className="col-md-7 d-flex align-items-center">
                                      <select
                                        id="Select"
                                        name="Select"
                                        className="form-control"
                                        value={selectedPoNo}
                                        onChange={handlePoSelectChange}
                                      >
                                        <option value="">Select Series</option>
                                        {poList.map((po, index) => (
                                          <option key={index} value={po.PoNo}>
                                            {po.PoNo}
                                          </option>
                                        ))}
                                      </select>

                                      <div className="col-md-1 mt-1 ms-2">
                                        <div
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            const selectedPo = poList.find((po) => po.PoNo === selectedPoNo)
                                            if (selectedPo?.pdf_link) {
                                              window.open(selectedPo.pdf_link, "_blank")
                                            } else {
                                              toast.warn("No PDF available for the selected PO.")
                                            }
                                          }}
                                        >
                                          <FaEye />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="InVoiceNo">Invoice No:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="InVoiceNo"
                                        name="InVoiceNo"
                                        className="form-control"
                                        value={formData.InVoiceNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="Invoicedate">Invoice Date:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="date"
                                        id="Invoicedate"
                                        name="Invoicedate"
                                        className="form-control"
                                        value={formData.Invoicedate}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="EWayBillNo">E-Way Bill No:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="EWayBillNo"
                                        name="EWayBillNo"
                                        className="form-control"
                                        value={formData.EWayBillNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="EWayBillDate">E-Way Bill Date:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="date"
                                        id="EWayBillDate"
                                        name="EWayBillDate"
                                        className="form-control"
                                        value={formData.EWayBillDate}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="ContactPerson">Contact Person:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="ContactPerson"
                                        name="ContactPerson"
                                        className="form-control"
                                        value={formData.ContactPerson}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-start">
                                <div className="container-fluid mt-4">
                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="VehicleNo">Vehicle No:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="VehicleNo"
                                        name="VehicleNo"
                                        className="form-control"
                                        value={formData.VehicleNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="LrNo">LR No:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="LrNo"
                                        name="LrNo"
                                        className="form-control"
                                        value={formData.LrNo}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="Transporter">Transporter:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        id="Transporter"
                                        name="Transporter"
                                        className="form-control"
                                        value={formData.Transporter}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-md-4">
                                      <label htmlFor="Remark">Remark:</label>
                                    </div>
                                    <div className="col-md-8">
                                      <textarea
                                        id="Remark"
                                        name="Remark"
                                        className="form-control"
                                        value={formData.Remark}
                                        onChange={handleChange}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="pills-GST-Details"
                        role="tabpanel"
                        aria-labelledby="pills-GST-Details-tab"
                        tabIndex="0"
                      >
                        <div className="NewGateInward1">
                          <div className="container-fluid">
                            <div className="row text-start">
                              <div className="col-md-2 col-sm-6">
                                <div className="position-relative">
                                  <label className="form-label">Select Item</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Item..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                  />
                                  {searchResults.length > 0 && (
                                    <div
                                      className="dropdown-menu show w-100"
                                      style={{ maxHeight: "200px", overflowY: "auto" }}
                                    >
                                      {searchResults.map((item, index) => (
                                        <div
                                          key={index}
                                          className="dropdown-item d-flex justify-content-between"
                                          onClick={() => handleSelectItem(item)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <span>{item.part_no}</span>
                                          <span>{item.Name_Description}</span>
                                          <span>({item.Unit_Code})</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-2">
                                <label className="form-label">Description</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Description"
                                  value={newItem.Description}
                                  readOnly
                                />
                              </div>

                              <div className="col-md-2">
                                <label className="form-label">Qty NOS</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Qty_NOS"
                                  value={newItem.Qty_NOS}
                                  onChange={(e) => setNewItem({ ...newItem, Qty_NOS: e.target.value })}
                                  placeholder="Enter Qty_NOS"
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="form-label">QTY KG</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="QTY_KG"
                                  value={newItem.QTY_KG}
                                  onChange={(e) => setNewItem({ ...newItem, QTY_KG: e.target.value })}
                                  placeholder="Enter QTY_KG"
                                />
                              </div>
                              <div className="col-md-1">
                                <label className="form-label">Unit Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Unit_Code"
                                  value={newItem.Unit_Code}
                                  readOnly
                                />
                              </div>
                              <div className="col-md-2">
                                <label className="form-label">Remark</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Remark"
                                  value={newItem.Remark}
                                  onChange={(e) => setNewItem({ ...newItem, Remark: e.target.value })}
                                  placeholder="Enter Remark"
                                />
                              </div>
                              <div className="col-md-1 align-self-end">
                                <button type="button" className="btn btn-primary w-100" onClick={addItem}>
                                  Add
                                </button>
                              </div>
                            </div>
                            <div className="table-responsive mt-4">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr.</th>
                                    <th>Item No | Code</th>
                                    <th>Description</th>
                                    <th>Qty (Desc)</th>
                                    <th>Qty (Kg)</th>
                                    <th>Unit Code</th>
                                    <th>Remark</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.ItemDetails.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.ItemNo}</td>
                                      <td>{item.Description}</td>
                                      <td>{item.Qty_NOS}</td>
                                      <td>{item.QTY_KG}</td>
                                      <td>{item.Unit_Code}</td>
                                      <td>{item.Remark}</td>
                                      <td>
                                        <button type="button" className="btn" onClick={() => deleteItem(index)}>
                                          <FaTrash />
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
                    </div>
                  </div>
                  <div className="row mb-3 text-end">
                    <div className="col-md-12">
                      <button className="pobtn" type="submit">
                        {isEditMode ? "Update Gate Entry" : "Save Gate Entry"}
                      </button>
                      <button
                        className="btn btn-secondary mx-2"
                        type="button"
                        onClick={() => navigate("/Gate-Inward-Entry")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewGateInward
