import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ProductionReport.css";
import { getAssemblyReport } from "../../Service/Production.jsx";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductionReport = () => {
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

  const [assemblyData, setAssemblyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can change this number based on your requirements
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAssemblyReport();
      console.log("Fetched Data:", data); // Check the structure of the data

      if (Array.isArray(data)) {
        setAssemblyData(data.sort((a, b) => b.id - a.id)); // Directly set the array if data is an array
        setTotalItems(data.length); // Set total items based on the array length
      } else {
        console.error("Data is not an array:", data);
      }
    };

    fetchData();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assemblyData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="ProductionReportMaster">
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
                <div className="ProductionReport mt-5">
                  <div className="ProductionReport-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Production Entry Ass Report
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn">
                          Production Report
                        </button>
                        <button type="button" className="btn">
                          Production - Query
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="ProductionReport-filter mb-4">
                    <div className="row text-start">
                      <div className="col-md-2">
                        <label>Plant</label>
                        <select className="form-select">
                          <option value="Produlink">Produlink</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label>From Date</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-2">
                        <label>To Date</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-2">
                        <label>Series</label>
                        <select className="form-select">
                          <option value="ALL">ALL</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-2">
                        <label>Shift</label>
                        <select className="form-select">
                          <option value="ALL">ALL</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="col-md-2 mt-4">
                        <button className="btn btn-primary">Search</button>
                      </div>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="ProductionReport-Main">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr.</th>

                            <th>Plant</th>
                            <th>Prod No</th>
                            <th>Prod Date</th>
                            <th>Time</th>
                            <th>Shift</th>
                            <th>Contractor</th>
                            <th>Operator</th>
                            <th>FGItem</th>
                            <th>ProdQty</th>
                            <th>Rework</th>
                            <th>Reject</th>

                            <th>Edit</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, index) => (
                            <tr key={index}>
                              <td>{indexOfFirstItem + index + 1}</td>

                              <td>{item.Plant}</td>
                              <td>{item.Prod_no}</td>
                              <td>{item.Date}</td>
                              <td>{item.Time}</td>

                              <td>{item.Shift}</td>
                              <td>{item.Contractor}</td>
                              <td>{item.Operator}</td>
                              <td>{item.FGItem}</td>

                              <td>{item.ProdQty}</td>
                              <td>{item.ReworkQty}</td>
                              <td>{item.RejectQty}</td>

                              <td>
                                <Link to={`/ProductionEntryAss/${item.id}`} className="btn btn-sm btn-warning">
  <FaEdit />
</Link>

                              </td>

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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination Controls */}
                    {/* Pagination Controls */}
                    <div className="pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-light"
                      >
                        Previous
                      </button>

                      {pageNumbers.map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`btn ${
                            currentPage === number ? "btn" : "btn-light"
                          }`}
                        >
                          {number}
                        </button>
                      ))}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                        className="btn btn-sm btn-light"
                      >
                        Next
                      </button>
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

export default ProductionReport;
