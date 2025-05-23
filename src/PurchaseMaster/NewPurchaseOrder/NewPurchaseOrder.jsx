"use client"

import "./NewPurchaseOrder.css"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../NavBar/NavBar.js"
import SideNav from "../../SideNav/SideNav.js"
import ItemDetails from "./ItemDetails/ItemDetails.jsx"
import GSTDetails from "./GSTDetails/GSTDetails.jsx"
import ItemOther from "./ItemOther/ItemOther.jsx"
import Schedule from "./Schedule/Schedule.jsx"
import Ship from "./Ship/Ship.jsx"
import Poinfo from "./POInfo/Poinfo.jsx"
import {
  fetchSupplierData,
  fetchNextCode,
  registerPurchaseOrder,
  fetchPurchaseOrderById,
  updatePurchaseOrder,
} from "../../Service/PurchaseApi.jsx"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useCallback } from "react"

const NewPurchaseOrder = () => {
  const { id } = useParams() // Get the order ID from URL params
  const navigate = useNavigate()
  const isEditMode = !!id // Check if we're in edit mode

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState("")
  const [indentNo, setIndentNo] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [supplierCode, setSupplierCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = useState(isEditMode) // Loading state for fetching order
  // eslint-disable-next-line no-unused-vars
  const [supplierData, setSupplierData] = useState(null)

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

  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({
    Item_Detail_Enter: [],
    Gst_Details: [],
    Item_Details_Other: [],
    Schedule_Line: [],
    Ship_To_Add: [],
    field: "",
    Plant: "",
    PoNo: "",
    EnquiryNo: "",
    QuotNo: "",
    PaymentTerms: "",
    DeliveryDate: "",
    AMC_PO: "",
    ModeOfShipment: "",
    PreparedBy: "",
    PoNote: "",
    PoSpecification: "",
    PoDate: "",
    EnquiryDate: "",
    QuotDate: "",
    PaymentRemark: "",
    DeliveryType: "",
    DeliveryNote: "",
    IndentNo: "",
    ApprovedBy: "",
    InspectionTerms: "",
    PF_Charges: "",
    Time: "",
    PoFor: "",
    Freight: "",
    PoRateType: "",
    ContactPerson: "",
    PoValidityDate: "",
    PoEffectiveDate: "",
    TransportName: "",
    PoValidity_WarrantyTerm: "",
    GstTaxes: "",
    Type: "close",
    Series: "",
    Supplier: "",
    CodeNo: "",
  })

  // Fetch order data if in edit mode
  useEffect(() => {
    const fetchOrderData = async () => {
      if (isEditMode) {
        setIsLoadingOrder(true)
        try {
          const orderData = await fetchPurchaseOrderById(id)
          console.log("Fetched order data:", orderData)

          // Update form data with fetched order
          setFormData(orderData)

          // Update other state variables
          setSelectedSeries(orderData.Series || "")
          setIndentNo(orderData.PoNo || "")
          setSupplierName(orderData.Supplier || "")
          setSupplierCode(orderData.CodeNo || "")

          toast.success("Purchase order loaded successfully")
        } catch (error) {
          console.error("Error fetching purchase order:", error)
          toast.error("Failed to load purchase order")
        } finally {
          setIsLoadingOrder(false)
        }
      }
    }

    fetchOrderData()
  }, [id, isEditMode])

  const handleSeriesChange = async (e) => {
    // Skip series change in edit mode
    if (isEditMode) return

    const seriesValue = e.target.value
    setSelectedSeries(seriesValue)
    setFormData((prevData) => ({ ...prevData, field: seriesValue }))
    setFormData((prevData) => ({ ...prevData, Series: seriesValue }))

    if (seriesValue.trim() === "" || !formData.Plant) {
      setIndentNo("")
      setFormData((prevData) => ({ ...prevData, PoNo: "" }))
      return
    }

    const year = localStorage.getItem("Shortyear")

    if (!year) {
      console.error("Year is not available in localStorage.")
      setIndentNo("")
      setFormData((prevData) => ({ ...prevData, PoNo: "" }))
      return
    }

    setLoading(true)
    try {
      const response = await fetchNextCode(seriesValue, year)
      if (response && response.next_code) {
        setIndentNo(response.next_code)
        setFormData((prevData) => ({ ...prevData, PoNo: response.next_code }))
      } else {
        setIndentNo("")
        setFormData((prevData) => ({ ...prevData, PoNo: "" }))
      }
    } catch (error) {
      console.error("Error fetching next code:", error)
      setIndentNo("")
      setFormData((prevData) => ({ ...prevData, PoNo: "" }))
    } finally {
      setLoading(false)
    }
  }

  // Fetch supplier list based on input
  const handleSearchSupplier = async (e) => {
    const value = e.target.value
    setSupplierName(value)

    if (!value.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setLoading(true)
    try {
      const data = await fetchSupplierData(value) // Fetch matching suppliers
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data)
        setShowDropdown(true)
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error)
      setSearchResults([])
      setShowDropdown(false)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = useCallback((field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }, [])

  const validateCurrentTab = () => {
    return true
  }

  const handleNext = () => {
    if (validateCurrentTab()) {
      setActiveTab((prevTab) => prevTab + 1)
    } else {
      toast.error("Please fill all required fields in the current tab.")
    }
  }

  const handlePrevious = () => {
    setActiveTab((prevTab) => prevTab - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.field || !formData.PoNo || !formData.EnquiryNo) {
      toast.error("Field, PoNo, and EnquiryNo are required.")
      return
    }

    const formattedData = {
      ...formData,
      Schedule_Line: formData.Schedule_Line.map((item) => ({
        ...item,
        ItemCode: item.ItemCode ? item.ItemCode.substring(0, 30).trim() : "", // 🔹 Ensure max 30 characters
      })),
      Item_Detail_Enter: formData.Item_Detail_Enter.map((item) => ({
        ...item,
        Item: (item.Item || "").substring(0, 30).trim(),
        Rate: Number(item.Rate) || 0,
        Qty: Number(item.Qty) || 0,
        Disc: Number(item.Disc) || 0,
        Particular: item.Particular === "I" ? "Item" : item.Particular,
      })),
      Gst_Details: formData.Gst_Details.map((gst) => ({
        ...gst,
        ItemCode: (gst.ItemCode || "").substring(0, 30).trim(),
        Rate: Number(gst.Rate) || 0,
        Qty: Number(gst.Qty) || 0,
        CGST: Number(gst.CGST) || 0,
        SGST: Number(gst.SGST) || 0,
        IGST: Number(gst.IGST) || 0,
      })),
    }

    try {
      let response

      if (isEditMode) {
        // Update existing purchase order
        response = await updatePurchaseOrder(id, formattedData)
        console.log("Purchase order updated successfully", response)
        toast.success("Purchase order updated successfully")
      } else {
        // Create new purchase order
        response = await registerPurchaseOrder(formattedData)
        console.log("Purchase order saved successfully", response)
        toast.success("Purchase order saved successfully")
      }

      // Navigate to PO list after successful save/update
      setTimeout(() => {
        navigate("/PoList")
      }, 2000)
    } catch (error) {
      console.error("Error saving purchase order:", error)
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error("An unexpected error occurred.")
      }
    }
  }

  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  // Handle supplier selection
  const handleSelectSupplier = (supplier) => {
    setSupplierName(supplier.Name)
    setSupplierCode(supplier.number)
    setFormData((prevData) => ({
      ...prevData,
      Supplier: supplier.Name,
      CodeNo: supplier.number,
      PaymentTerms: supplier.Payment_Term,
    }))
    setShowDropdown(false) // Hide dropdown after selection
  }

  // Handle clearing the form
  const handleClear = () => {
    if (isEditMode) {
      // In edit mode, redirect to new purchase order page
      navigate("/new-purchase-order")
    } else {
      // In new mode, reset the form
      setFormData({
        Item_Detail_Enter: [],
        Gst_Details: [],
        Item_Details_Other: [],
        Schedule_Line: [],
        Ship_To_Add: [],
        field: "",
        Plant: "",
        PoNo: "",
        EnquiryNo: "",
        QuotNo: "",
        PaymentTerms: "",
        DeliveryDate: "",
        AMC_PO: "",
        ModeOfShipment: "",
        PreparedBy: "",
        PoNote: "",
        PoSpecification: "",
        PoDate: "",
        EnquiryDate: "",
        QuotDate: "",
        PaymentRemark: "",
        DeliveryType: "",
        DeliveryNote: "",
        IndentNo: "",
        ApprovedBy: "",
        InspectionTerms: "",
        PF_Charges: "",
        Time: "",
        PoFor: "",
        Freight: "",
        PoRateType: "",
        ContactPerson: "",
        PoValidityDate: "",
        PoEffectiveDate: "",
        TransportName: "",
        PoValidity_WarrantyTerm: "",
        GstTaxes: "",
        Type: "close",
        Series: "",
        Supplier: "",
        CodeNo: "",
      })
      setSelectedSeries("")
      setIndentNo("")
      setSupplierName("")
      setSupplierCode("")
    }
  }

  if (isLoadingOrder) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading purchase order data...</p>
      </div>
    )
  }

  return (
    <div className="NewPurchaseMaster">
      <ToastContainer className="newpurchase" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="NewPurchse">
                  <div className="container-fluid">
                    <div className="NewPurchse-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <h5 className="header-title">{isEditMode ? "Edit Purchase Order" : "New Order Purchase"}</h5>
                        </div>
                        <div className="col-md-1">
                          <label>Type:</label>
                          <select
                            className="form-control"
                            value={formData.Type || "close"}
                            onChange={(e) => setFormData((prev) => ({ ...prev, Type: e.target.value }))}
                            disabled={isEditMode}
                          >
                            <option value="close">Close</option>

                            <option value="Open">Open</option>
                          </select>
                        </div>

                        <div className="col-md-1">
                          <label>Plant:</label>
                          <select
                            className="form-control"
                            value={formData.Plant || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, Plant: e.target.value }))}
                            disabled={isEditMode}
                          >
                            <option value="">Select</option>
                            <option value="Produlink">Produlink</option>
                          </select>
                        </div>

                        <div className="col-md-1">
                          <label>Series:</label>
                          <select
                            className="form-control"
                            value={selectedSeries}
                            onChange={handleSeriesChange}
                            disabled={!formData.Plant || isEditMode}
                          >
                            <option value="">Select</option>
                            <option value="RM">RM</option>
                            <option value="CONSUMABLE">CONSUMABLE</option>
                            <option value="ASSET">ASSET</option>
                            <option value="SERVICE">SERVICE</option>
                          </select>
                        </div>

                        {(formData.Plant && selectedSeries) || isEditMode ? (
                          <div className="col-md-2" style={{ marginTop: "20px" }}>
                            <input type="text" className="form-control" value={indentNo} readOnly />
                          </div>
                        ) : null}

                        <div className="col-md-1">
                          <label>Supplier:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={supplierName}
                            onChange={handleSearchSupplier}
                            disabled={loading || isEditMode}
                          />
                          {showDropdown && searchResults.length > 0 && (
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
                              {searchResults.map((supplier) => (
                                <li
                                  key={supplier.number}
                                  className="dropdown-item"
                                  onClick={() => handleSelectSupplier(supplier)}
                                  style={{ padding: "5px", cursor: "pointer" }}
                                >
                                  {supplier.Name} ({supplier.number})
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="col-md-1">
                          <button
                            className="btn btn-primary mt-4"
                            onClick={handleSelectSupplier}
                            disabled={loading || isEditMode}
                          >
                            {loading ? "Loading..." : "Select"}
                          </button>
                        </div>

                        {(formData.Plant && selectedSeries) || isEditMode ? (
                          <div className="col-md-1">
                            <label>Code No:</label>
                            <input type="text" className="form-control" value={supplierCode} disabled />
                          </div>
                        ) : null}

                        <div className="col-md-1 mt-4">
                          <button className="btn" onClick={handleClear}>
                            {isEditMode ? "New" : "Clear"}
                          </button>
                        </div>
                        <div className="col-md-1 mt-4 text-end">
                          <Link to="/PoList" className="btn">
                            PO List
                          </Link>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="new-purchase-main">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                          {[
                            "Item Details",
                            "GST Details",
                            "Item Details Other",
                            "Schedule Line",
                            "Ship To Add",
                            "PO Info",
                          ].map((tabName, index) => (
                            <li className="nav-item" role="presentation" key={index}>
                              <button
                                className={`nav-link ${activeTab === index ? "active" : ""}`}
                                type="button"
                                onClick={() => setActiveTab(index)}
                              >
                                {tabName}
                              </button>
                            </li>
                          ))}
                        </ul>

                        <div className="tab-content" id="pills-tabContent">
                          {activeTab === 0 && (
                            <div className="tab-pane fade show active" role="tabpanel">
                              <ItemDetails
                                updateFormData={updateFormData}
                                supplierCode={supplierCode}
                                existingItems={formData.Item_Detail_Enter}
                                isEditMode={isEditMode}
                              />
                            </div>
                          )}
                          {activeTab === 1 && (
                            <div className="tab-pane fade show active" role="tabpanel">
                              <GSTDetails
                                updateFormData={updateFormData}
                                itemDetails={formData.Item_Detail_Enter}
                                existingGstDetails={formData.Gst_Details}
                              />
                            </div>
                          )}
                          {activeTab === 2 && (
                            <div className="tab-pane fade show active" role="tabpanel">
                              <ItemOther
                                updateFormData={updateFormData}
                                itemDetails={formData.Item_Detail_Enter}
                                existingItemOther={formData.Item_Details_Other}
                              />
                            </div>
                          )}
                          {activeTab === 3 && (
                            <div className="tab-pane fade show active" role="tabpanel">
                              <Schedule
                                updateFormData={updateFormData}
                                itemDetails={formData.Item_Detail_Enter}
                                existingSchedule={formData.Schedule_Line}
                              />
                            </div>
                          )}
                          {activeTab === 4 && (
                            <div className="tab-pane fade show active" role="tabpanel">
                              <Ship
                                updateFormData={updateFormData}
                                existingShipData={
                                  formData.Ship_To_Add && formData.Ship_To_Add.length > 0
                                    ? formData.Ship_To_Add[0]
                                    : null
                                }
                              />
                            </div>
                          )}
                          {activeTab === 5 && (
                            <div className="tab-pane fade show active" role="tabpanel">
                              <Poinfo
                                updateFormData={updateFormData}
                                paymentTermsFromSupplier={formData.PaymentTerms}
                                poInfoData={formData}
                                isEditMode={isEditMode}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row"></div>
                      <div className="button-group mt-3 text-end">
                        {activeTab > 0 && (
                          <button type="button" className="btn" onClick={handlePrevious}>
                            Previous
                          </button>
                        )}
                        {activeTab < 5 ? (
                          <button type="button" className="btn" onClick={handleNext}>
                            Next
                          </button>
                        ) : (
                          <button type="submit" className="btn btn-success">
                            {isEditMode ? "Update Purchase Order" : "Save Purchase Order"}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPurchaseOrder
