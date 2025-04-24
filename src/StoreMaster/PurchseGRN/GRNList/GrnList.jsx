
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getGrnDetails } from "../../../Service/StoreApi.jsx";

const GrnList = () => {
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

  const [grnData, setGrnData] = useState([]);

  useEffect(() => {
    getGrnDetails()
      .then(data => {
        setGrnData(data);
      })
      .catch(err => {
        console.error('Failed to load GRN data:', err);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = grnData.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(grnData.length / itemsPerPage);



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
                      <h5 className="header-title">Purchase GRN List</h5>
                    </div>
                    <div className="col-md-8 text-end">
                     

                      <Link
                        type="button"
                        className="btn"
                       
                      >
                        GRN Report
                      </Link>
                      <Link
                        type="button"
                        className="btn"
                       
                      >
                        GRN - Query
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="JobworkList-Main">
                  <div className="container-fluid">
                    <div className="row g-3 text-start">

                        
                     

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

                       {/* Plant */}
                       <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Plant:</label>
                        <select className="form-select" style={{marginTop:"-2px"}}>
                          <option value="select">Select All</option>
                          <option value="Produlink">Produlink</option>
                        </select>
                      </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>Supplier Name:</label>
                        <input type="text" className="form-control" />
                      </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>Item Name:</label>
                        <input type="text" className="form-control" />
                      </div>


                      {/* Status */}
                      <div className="col-sm-6 col-md-2 col-lg-1">
                        <label>Main Group:</label>
                        <select className="form-select"  style={{marginTop:"-2px"}}>
                          <option>Select All</option>
                          <option>Select All</option>
                        </select>
                      </div>

                     

            {/* Supplier Name */}
            <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>GRN No:</label>
                        <input type="text" className="form-control" />
                      </div>

                        {/* Supplier Name */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                        <label>PO No:</label>
                        <input type="text" className="form-control" />
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

                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Year</th>
                        <th scope="col">Plant</th>
                        <th scope="col">GRN No</th>
                        <th scope="col">GRN Date</th>
                        <th scope="col">Entry Date</th>
                        <th scope="col">Challan No</th>
                        <th scope="col">Challan Date</th>
                        
                        <th scope="col">Invoice No</th>
                        <th scope="col">Invoice Date</th>
                        <th scope="col">Supplier Name</th>
                        <th scope="col">PO No</th>
                        <th scope="col">User</th>
                        <th scope="col">Info</th>
                        <th scope="col">Doc</th>
                        <th scope="col">QC</th>
                        <th scope="col">Bill</th>
                        <th scope="col">Email</th>
                        <th scope="col">Del</th>

                        <th scope="col">Edit</th>
                        <th scope="col">View</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example data row */}
                      {currentItems.map((item, index) => (
    <tr key={item.id}>
         <td>{indexOfFirstItem + index + 1}</td>
            <td>{new Date(item.GrnDate).getFullYear()}</td>
            <td>{item.Plant}</td>
            <td>{item.GrnNo}</td>
            <td>{item.GrnDate}</td>
            <td>{item.GrnDate}</td>
            <td>{item.ChallanNo}</td>
            <td>{item.ChallanDate}</td>
            <td>{item.InvoiceNo}</td>
            <td>{item.InvoiceDate}</td>
            <td>{item.SelectSupplier}</td>
            <td>{item.SelectPO}</td>
            <td>Admin</td>
            <td>Info</td>
            <td>
             Doc
            </td>
            <td>QC</td>
            <td>Bill</td>
            <td>
              <button className="btn">Email</button>
            </td>
            <td>
              <button className="btn"><FaTrash/></button>
            </td>
            <td>
              <button className="btn"><FaEdit/></button>
            </td>
            <td>
              <button className="btn"> <a href={`http://3.7.91.234:8000${item.PDF_Link}`} target="_blank" rel="noopener noreferrer">👁</a></button>
            </td>
          </tr>
        ))}
      </tbody>
                  </table>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
  <span>Page {currentPage} of {totalPages}</span>
  <div>
    <button
      className="btn btn-outline-primary mx-1"
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <button
      className="btn btn-outline-primary mx-1"
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
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

export default GrnList


