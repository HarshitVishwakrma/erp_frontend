import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "../Indent/ListIndent.css";

const ListIndent = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [indentList, setIndentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    plant: '',
    item: '',
    indentNo: '',
    type: '',
    status: ''
  });

  // Toggle side nav
  const toggleSideNav = () => setSideNavOpen((prev) => !prev);

  // Mock fetch – replace URL with your real endpoint
  const fetchIndents = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Purchase/all-indents/");
      const json = await res.json();
      setIndentList(json.data);
      setFilteredList(json.data); // Initialize filtered list
    } catch (err) {
      console.error("Failed to load indents:", err);
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = indentList;

    // Filter by date range
    if (filters.fromDate) {
      filtered = filtered.filter(indent => 
        new Date(indent.Date) >= new Date(filters.fromDate)
      );
    }

    if (filters.toDate) {
      filtered = filtered.filter(indent => 
        new Date(indent.Date) <= new Date(filters.toDate)
      );
    }

    // Filter by plant
    if (filters.plant) {
      filtered = filtered.filter(indent => 
        indent.Plant?.toLowerCase().includes(filters.plant.toLowerCase())
      );
    }

    // Filter by item (searches in indent_details)
    if (filters.item) {
      filtered = filtered.filter(indent => 
        indent.indent_details.some(detail => 
          detail.ItemNoCpcCode?.toLowerCase().includes(filters.item.toLowerCase()) ||
          detail.Description?.toLowerCase().includes(filters.item.toLowerCase())
        )
      );
    }

    // Filter by indent number
    if (filters.indentNo) {
      filtered = filtered.filter(indent => 
        indent.IndentNo?.toLowerCase().includes(filters.indentNo.toLowerCase())
      );
    }

    // Filter by type (searches in indent_details)
    if (filters.type) {
      filtered = filtered.filter(indent => 
        indent.indent_details.some(detail => 
          detail.Type?.toLowerCase().includes(filters.type.toLowerCase())
        )
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(indent => 
        indent.Auth?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredList(filtered);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      plant: '',
      item: '',
      indentNo: '',
      type: '',
      status: ''
    });
    setFilteredList(indentList);
  };

  // Get unique values for dropdowns
  const getUniqueValues = (field) => {
    const values = new Set();
    if (field === 'plant') {
      indentList.forEach(indent => {
        if (indent.Plant) values.add(indent.Plant);
      });
    } else if (field === 'status') {
      indentList.forEach(indent => {
        if (indent.Auth) values.add(indent.Auth);
      });
    } else if (field === 'type') {
      indentList.forEach(indent => {
        indent.indent_details.forEach(detail => {
          if (detail.Type) values.add(detail.Type);
        });
      });
    }
    return Array.from(values);
  };

  useEffect(() => {
    fetchIndents();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  return (
    <div className="ListIndent">
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
                <div className="ListIndent-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title">Indent List</h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <Link className="vndrbtn" to={"/IndentStutasReport"}>
                        Indent Status Report
                      </Link>
                      <Link className="vndrbtn">Export Excel</Link>
                    </div>
                  </div>
                </div>

                <div className="ListIndent-main1 mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start" onSubmit={handleSearch}>
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input 
                              type="date" 
                              className="form-control mt-1"
                              name="fromDate"
                              value={filters.fromDate}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input 
                              type="date" 
                              className="form-control mt-1"
                              name="toDate"
                              value={filters.toDate}
                              onChange={handleFilterChange}
                            />
                          </div>

                          {/* Plant */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select 
                              className="form-select mt-1"
                              name="plant"
                              value={filters.plant}
                              onChange={handleFilterChange}
                            >
                              <option value="">Select Plant</option>
                              {getUniqueValues('plant').map(plant => (
                                <option key={plant} value={plant}>{plant}</option>
                              ))}
                            </select>
                          </div>

                          {/* Item */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item</label>
                            <input 
                              type="text" 
                              className="form-control mt-1"
                              name="item"
                              value={filters.item}
                              onChange={handleFilterChange}
                              placeholder="Search item..."
                            />
                          </div>

                          {/* Indent No */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Indent No</label>
                            <input 
                              type="text" 
                              className="form-control mt-1"
                              name="indentNo"
                              value={filters.indentNo}
                              onChange={handleFilterChange}
                              placeholder="Search indent no..."
                            />
                          </div>

                          {/* Type */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Type</label>
                            <select 
                              className="form-select mt-1"
                              name="type"
                              value={filters.type}
                              onChange={handleFilterChange}
                            >
                              <option value="">Select Type</option>
                              {getUniqueValues('type').map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          {/* Status */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Status</label>
                            <select 
                              className="form-select"
                              name="status"
                              value={filters.status}
                              onChange={handleFilterChange}
                            >
                              <option value="">Select Status</option>
                              {getUniqueValues('status').map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>

                          {/* Search Buttons */}
                          <div className="col-md-2 col-sm-6 mt-4 align-self-end">
                            <button type="submit" className="vndrbtn me-2">
                              Search
                            </button>
                            <button 
                              type="button" 
                              className="vndrbtn btn-secondary"
                              onClick={clearFilters}
                            >
                              Clear
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreListIndent">
                    <div className="container-fluid mt-4 text-start">
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <p className="text-muted">
                            Showing {filteredList.length} of {indentList.length} results
                          </p>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Ind No | Date</th>
                              <th>Required Delivery</th>
                              <th>Item No | Desc</th>
                              <th>Ind Qty</th>
                              <th>MRP Run Date</th>
                              <th>Auth Details</th>
                              <th>Status</th>
                              <th>Supplier</th>
                              <th>User</th>
                              <th>Del</th>
                              <th>Edit</th>
                              <th>View</th>
                              <th>Doc</th>
                              <th>Rep</th>
                              <th>Mail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredList.length === 0 && (
                              <tr>
                                <td colSpan="17" className="text-center">
                                  {indentList.length === 0 ? "No indents found." : "No indents match the current filters."}
                                </td>
                              </tr>
                            )}

                            {filteredList.map((indent, i) =>
                              indent.indent_details.map((d, j) => {
                                const year = new Date(indent.Date).getFullYear();
                                return (
                                  <tr key={`${indent.id}-${d.id}`}>
                                    <td>
                                      {i + 1}.{j + 1}
                                    </td>
                                    <td>{year}</td>
                                    <td>
                                      {indent.IndentNo} | {indent.Date}
                                    </td>
                                    <td>{d.SchDate}</td>
                                    <td>
                                      {d.ItemNoCpcCode} | {d.Description}
                                    </td>
                                    <td>{d.Qty}</td>
                                    <td>{indent.Time}</td>
                                    <td>{indent.Auth}</td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          indent.Auth === "Approved"
                                            ? "bg-success"
                                            : indent.Auth === "Pending"
                                            ? "bg-warning text-dark"
                                            : "bg-secondary"
                                        }`}
                                      >
                                        {indent.Auth}
                                      </span>
                                    </td>
                                    <td>{indent.Plant || "—"}</td>
                                    <td>{/* user you can add here */}</td>
                                    <td>
                                      <button className="btn btn-sm btn-danger">
                                        Del
                                      </button>
                                    </td>
                                    <td>
                                      <button className="btn btn-sm btn-primary">
                                        Edit
                                      </button>
                                    </td>
                                    <td>
                                      <Link to={`/indent/${indent.id}`}>
                                        View
                                      </Link>
                                    </td>
                                    <td>
                                      <button className="btn btn-sm btn-info">
                                        Doc
                                      </button>
                                    </td>
                                    <td>
                                      <button className="btn btn-sm btn-secondary">
                                        Rep
                                      </button>
                                    </td>
                                    <td>
                                      <button className="btn btn-sm btn-outline-primary">
                                        Mail
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
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

export default ListIndent;