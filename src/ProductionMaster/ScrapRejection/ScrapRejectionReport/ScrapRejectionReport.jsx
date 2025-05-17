"use client"

import "./ScrapRejectionReport.css"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { FaEdit } from "react-icons/fa"
import { getScrapLineRejectionReport } from "../../../Service/Production.jsx"
import { Link } from "react-router-dom"

const ScrapRejectionReport = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [reportData, setReportData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10
  const [isLoading, setIsLoading] = useState(false)

  // Search filters
  const [filters, setFilters] = useState({
    plant: "",
    dateFrom: "",
    dateTo: "",
   
    series: "",
    itemName: "",
    customerName: "",
   
  })

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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await getScrapLineRejectionReport()
      setReportData(data)
      setFilteredData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Apply filters
  const applyFilters = () => {
    setIsLoading(true)

    // Create params object for API call
    const params = {}
    if (filters.plant) params.plant = filters.plant
    if (filters.dateFrom) params.date_from = filters.dateFrom
    if (filters.dateTo) params.date_to = filters.dateTo
  
    if (filters.series) params.series = filters.series
    if (filters.itemName) params.scrap_rejection_item = filters.itemName
    if (filters.customerName) params.cust_supp_name = filters.customerName
   

    // Call API with filters
    getScrapLineRejectionReport(params)
      .then((data) => {
        setFilteredData(data)
        setCurrentPage(1) // Reset to first page when filtering
      })
      .catch((error) => {
        console.error("Error applying filters:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      plant: "",
      dateFrom: "",
      dateTo: "",
      trnType: "",
      series: "",
      itemName: "",
      customerName: "",
      docNo: "",
      user: "",
    })
    setFilteredData(reportData)
    setCurrentPage(1)
  }



  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredData.length / recordsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="ScrapRejectionMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="ScrapRejection mt-5">
                  <div className="ScrapRejection-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Scrap / Rejection Report</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn">
                          Rejection Report
                        </button>

                        <button type="button" className="btn">
                          Export To Excel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="ScrapRejection-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant:</label>
                          <select
                            className="form-select"
                            name="plant"
                            value={filters.plant}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select All</option>
                            <option value="Produlink">Produlink</option>
                            <option value="FactoryA">Factory A</option>
                          </select>
                        </div>

                        {/* From Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="dateFrom"
                            value={filters.dateFrom}
                            onChange={handleFilterChange}
                          />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To Date:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="dateTo"
                            value={filters.dateTo}
                            onChange={handleFilterChange}
                          />
                        </div>


                        {/* Series */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Series:</label>
                          <select
                            className="form-select"
                            name="series"
                            value={filters.series}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select All</option>
                            <option value="Line R">Line R</option>
                          </select>
                        </div>

                        {/* Item Name */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                          <label>Item Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="itemName"
                            value={filters.itemName}
                            onChange={handleFilterChange}
                          />
                        </div>

                        {/* Customer Name */}
                        <div className="col-sm-6 col-md-1 col-lg-2">
                          <label>Customer Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="customerName"
                            value={filters.customerName}
                            onChange={handleFilterChange}
                          />
                        </div>


                        <div className="col-sm-2 col-md-2 col-lg-1 mt-4">
                          <label></label>
                          <button type="button" className="btn btn-primary w-100" onClick={applyFilters}>
                            Search
                          </button>
                        </div>

                        <div className="col-sm-2 col-md-2 col-lg-1 mt-4">
                          <label></label>
                          <button type="button" className="btn btn-secondary w-100" onClick={resetFilters}>
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped mt-3">
                          <thead>
                            <tr>
                              <th>Sr.</th>
                                <th>Plant</th>
                              <th>Scrap Rejection No</th>
                              <th>Date</th>
                              <th>Type</th>
                              <th>Item No</th>
                              <th>Reject Reason</th>
                              <th>ScrapRejectRemark</th>
        <th>ScrapRejectionItem</th>
        <th>ScrapQty</th>
                             
                              <th>Customer</th>
                              <th>User</th>
                              <th>Auth</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRecords.length > 0 ? (
                              currentRecords.map((entry, index) => (
                                <tr key={entry.id || index}>
                                  <td>{index + 1 + indexOfFirstRecord}</td>
                                  <td>{entry.Plant}</td>
                                  <td>{entry.ScrapRejectionNo}</td>
                                  <td>{entry.ScrapRejectionNoteDate}</td>
                                  <td>{entry.TrnType}</td>
                                  <td>{entry.ItemNo}</td>
                                  <td>{entry.RejectReason}</td>
                                  <td>{entry.ScrapRejectRemark}</td>
                                  <td>{entry.ScrapRejectionItem}</td>
                                  <td>{entry.ScrapQty}</td>
                                  <td>{entry.cust_SuppName}</td>
                                  <td>{entry.user || "N/A"}</td>
                                  <td>
                                  {entry.Auth ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}
                                </td>
                                  <td>
                                    <Link to={`/ScrapRejection/${entry.id}`} className="btn btn-sm btn-warning me-2">
                                      <FaEdit />
                                    </Link>
                                    <a
                                      href={`http://3.7.91.234:8000/Production/scrap-line-rejection/pdf/${entry.id}/`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-sm btn-primary"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="11" className="text-center">
                                  No data found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                      
                      </div>
                      
                    )}
                      {/* Pagination */}
                        {filteredData.length > 0 && (
                          <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
                              Previous
                            </button>
                            <button
                              className="btn btn-secondary"
                             
                            >
                             <span className="align-self-center">
                             {currentPage}  
                            </span>
                            </button>
                            
                            <button
                              className="btn btn-secondary"
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
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
  )
}

export default ScrapRejectionReport
