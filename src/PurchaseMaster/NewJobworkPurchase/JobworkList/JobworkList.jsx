import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import './JobworkList.css';
import { fetchJobWorkPOList } from "../../../Service/PurchaseApi.jsx";

const JobworkList = () => {
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


  const [jobWorkData, setJobWorkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;


useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchJobWorkPOList();
        setJobWorkData(data.sort((a, b) => b.id - a.id));
        setFilteredData(data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Failed to load Job Work PO List", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = jobWorkData.filter(item =>
      (item.PoNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.Name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(1); // Reset to first page on search
  }, [searchTerm, jobWorkData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };


  return (
    <div className="JobworkListMaster">
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
              <div className="JobworkList mt-5">
                <div className="JobworkList-header mb-4 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">Jobwork Order List</h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <Link type="button" className="btn">
                        Recently Po Approval List
                      </Link>

                      <Link
                        type="button"
                        className="btn"
                       
                      >
                        AMC Purchase Order List
                      </Link>
                      <Link
                        type="button"
                        className="btn"
                       
                      >
                        Purchase Order - Query
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="JobworkList-Main">
                  <div className="container-fluid">
                    <div className="row g-3 text-start">

                        
                      {/* Plant */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Plant:</label>
                        <select className="form-select" style={{marginTop:"-2px"}}>
                          <option value="select">Select All</option>
                          <option value="Produlink">Produlink</option>
                        </select>
                      </div>

                      {/* From Date */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>From:</label>
                        <input type="date" className="form-control" />
                      </div>

                      {/* To Date */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>To Date:</label>
                        <input type="date" className="form-control" />
                      </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>Supplier Name:</label>
                        <input
                      type="text"
                      className="form-control"
                      placeholder="Search by PO No / Supplier"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  
                      </div>


                      {/* Status */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>PO Type:</label>
                        <select className="form-select"  style={{marginTop:"-2px"}}>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                     

                      {/* Series */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Series:</label>
                        <select className="form-select"  style={{marginTop:"-2px"}}>
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* Auth */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Item Group:</label>
                        <select className="form-select"  style={{marginTop:"-2px"}}>
                          <option>Select All</option>
                        </select>
                      </div>

                    
                      {/* Item Name */}
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>Po Status:</label>
                        <select className="form-select"  style={{marginTop:"-2px"}}>
                          <option>Select All</option>
                        </select>
                      </div>

                      {/* Wo No */}
                      <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>All User:</label>
                        <select className="form-select"  style={{marginTop:"-2px"}}>
                          <option>Select All</option>
                        </select>
                      </div>

                      <div className="col-sm-1 col-md-2"  style={{marginTop:"48px"}}>
                        
                      <button
                          type="button"
                          className="btn btn-primary"
                        >
                          Search
                        </button>
                        
                      </div>

                   
                     
                    </div>
                  </div>
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr.</th>
                      
                        <th scope="col">Plant</th>
                        <th scope="col">Po No</th>
                        <th scope="col">Po Date</th>
                        <th scope="col">Po Type</th>
                       
                        <th scope="col">Supplier/Vendor Name</th>
                         <th scope="col">Code No</th>
                        <th scope="col">User</th>
                        

                       
                        <th scope="col">View</th>
                         <th scope="col">Edit</th>
                        
                      </tr>
                    </thead>
                <tbody>
                        {currentData.length > 0 ? (
                          currentData.map((item, index) => (
                            <tr key={item.id || index}>
                              <td>{(page - 1) * itemsPerPage + index + 1}</td>
                              <td>{item.Plant}</td>
                              <td>{item.PoNo}</td>
                              <td>{item.PoDate}</td>
                              <td>{item.PoType}</td>
                              <td>{item.Name}</td>
                              <td>{item.number}</td>
                              <td>{item.User || "-"}</td>
                                    <td>
                                                                    <a
                                href={`http://127.0.0.1:8000${item.View}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-primary"
                              >
                                View
                              </a>
                              
                                      </td>
                                      <td>
                                      <Link
                                to={`/new-jobwork-order/${item.id}`}
                                className="btn"
                              >
                                <FaEdit />
                              </Link>
                                      </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center">No data found</td>
                          </tr>
                        )}
                      </tbody>
                  </table>
                </div>
                {/* Pagination */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      className="btn btn-secondary"
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                      className="btn btn-secondary"
                      disabled={page === totalPages}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      Next
                    </button>
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

export default JobworkList
