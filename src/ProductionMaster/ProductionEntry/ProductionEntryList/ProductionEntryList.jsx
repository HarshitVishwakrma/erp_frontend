import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./ProductionEntryList.css";
import { fetchProductionEntries } from "../../../Service/Production.jsx";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ProductionEntryList = () => {
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

  const [productionEntries, setProductionEntries] = useState([]);

  useEffect(() => {
    const loadProductionEntries = async () => {
      const data = await fetchProductionEntries();
      console.log("Fetched Data:", data); // Debugging step
      setProductionEntries(data.sort((a, b) => b.id - a.id));
    };
    loadProductionEntries();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Calculate indexes
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = productionEntries.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Ensure total pages are correct
  const totalPages = Math.ceil(productionEntries.length / recordsPerPage);

  console.log("Current Page:", currentPage, "Total Pages:", totalPages);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="ProductionEntryMasterList">
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
                <div className="ProductionEntryList mt-5">
                  <div className="ProductionEntryList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Production Entry Report
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="/AddQuater">
                          Production Report
                        </button>

                        <button
                          type="button"
                          className="btn"
                          to="/Companysetup"
                        >
                          Production Query
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ProductionEntryList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant:</label>
                          <select className="form-select">
                            <option>Select All</option>
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

                        {/* Series */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Series:</label>
                          <select className="form-select">
                            <option>Select All</option>
                            <option value="All">All</option>
                          </select>
                        </div>

                        {/* Series */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Shift:</label>
                          <select className="form-select">
                            <option>Select All</option>
                            <option value="All">All</option>
                          </select>
                        </div>

                        <div className="col-sm-2 col-md-2 col-lg-1 mt-4">
                          <button
                            type="button"
                            className="btn w-100"
                            style={{ marginTop: "29px" }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ProductionEntryList-table mt-5">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            <th>Mill Name</th>
                            <th>Prod No</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Shift</th>
                            <th>Contractor</th>
                            <th>Operator</th>
                            <th>Item</th>
                            <th>Prod Qty</th>
                            <th>Reject Qty</th>
                            <th>Rework Qty</th>
                            <th>Edit</th>
                            <th>View</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRecords.length > 0 ? (
                            currentRecords.map((entry, index) => (
                              <tr key={entry.id}>
                                <td>{index + 1 + indexOfFirstRecord}</td>
                                <td>{entry.mill_name}</td>
                                <td>{entry.Prod_no}</td>
                                <td>{entry.Date}</td>
                                <td>{entry.Time}</td>
                                <td>{entry.shift}</td>
                                <td>{entry.contractor}</td>
                                <td>{entry.operator}</td>
                                <td>{entry.item}</td>
                                <td>{entry.prod_qty}</td>
                                <td>{entry.reject_qty}</td>
                                <td>{entry.rework_qty}</td>
                                <td>
                                  <Link
                                    to={`/ProductionEntry/${entry.id}`}
                                    className="btn btn-sm btn-warning"
                                  >
                                    <FaEdit />
                                  </Link>
                                </td>

                                <td>
                                  <a
                                    href={`http://127.0.0.1:8000${entry.View}`}
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
                              <td colSpan="21" className="text-center">
                                No production entries found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span className="align-self-center">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="btn btn-secondary"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
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

export default ProductionEntryList;
