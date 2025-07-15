import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import "./VenderList.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { getSupplierList } from "../../../Service/Api.jsx"; // Import the getSupplierList function

const VenderList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [supplierCustomerData, setSupplierCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showData, setShowData] = useState(false); // State to control data display
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [recordsPerPage] = useState(10); // Number of records per page

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupplierList();
        setSupplierCustomerData(data);
        setFilteredData(data); // Initially show all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = supplierCustomerData.filter((item) => {
      const matchesType = searchType ? item.type === searchType : true;
      const matchesQuery = searchQuery
        ? item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.number.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesType && matchesQuery;
    });
    setFilteredData(filtered);
    console.log(filtered)
    setCurrentPage(1);
    setShowData(true);
  };

  const handleViewAll = () => {
    setFilteredData(supplierCustomerData.sort((a, b) => b.id - a.id));
    setSearchType("");
    setSearchQuery("");
    setShowData(true);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  )
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="VenderList">
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
                <div className="VenderList1">
                  <div className="VenderList2List-header mb-3 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Supplier / Customer / Vendor-List
                        </h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link
                          to={"/Supplier-Customer-Master"}
                          className="vndrbtn"
                        >
                          Add New
                        </Link>
                        <Link to={"/CustomerQuery"} className="vndrbtn">Customer - Query</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="VenderListMain">
                  <div className="container-fluid">
                    <div className="row text-start">
                      <div className="row mb-3 text-start mt-4">
                        <label
                          htmlFor="Type"
                          className="col-sm-1 col-form-label"
                        >
                          Type
                        </label>
                        <div className="col-sm-2">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                          >
                            <option value="">Select..</option>
                            <option value="Customer">Customer</option>
                            <option value="Supplier">Supplier</option>
                            <option value="Job Work">Job Work</option>
                            <option value="WCSJW">CSJW</option>
                          </select>
                        </div>
                        <label
                          htmlFor="SearchName"
                          className="col-sm-2 col-form-label"
                        >
                          Search Name
                        </label>
                        <div className="col-sm-3">
                          <input
                            type="text"
                            className="form-control"
                            id="SearchQuery"
                            placeholder="Search by name or number"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-4">
                          <button className="btn" onClick={handleSearch}>
                            Search
                          </button>
                          <button className="btn" onClick={handleViewAll}>
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showData && ( // Conditionally render the table based on showData
                  <div className="Vender3table">
                    <div className="Container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th className="blue-th" scope="col">
                                    Sr.
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Type
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Code No.
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Name
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Contact No.
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Email
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Vendor Code
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Payment term
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Gst Type
                                  </th>
                                  <th className="blue-th" scope="col">
                                    GST No.
                                  </th>
                                  <th className="blue-th" scope="col">
                                    GST Tax Code
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Auth
                                  </th>
                                  <th className="blue-th" scope="col">
                                    User
                                  </th>

                                  <th className="blue-th" scope="col">
                                    View
                                  </th>
                                  <th className="blue-th" scope="col">
                                    Edit
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentRecords.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.type}</td>
                                    <td>{item.number}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Contact_No}</td>
                                    <td>{item.Email_Id}</td>
                                    <td>{item.Vendor_Code}</td>
                                    <td>{item.Payment_Term}</td>

                                    <td>{item.GST_No}</td>
                                    <td>{item.GST_No2}</td>
                                    <td>{item.GST_Tax_Code}</td>
                                    <td>
                                      {item.Auth ? (
                                        <i className="fas fa-check text-success"></i>
                                      ) : (
                                        <i className="fas fa-times text-danger"></i>
                                      )}
                                    </td>

                                    <td>{item.User}</td>

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
                                        to={`/Supplier-Customer-Master/${item.id}`}
                                        className="btn btn-sm btn-warning"
                                      >
                                        <FaEdit />
                                      </Link>
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
                )}

                {/* Pagination Controls */}
                <nav className="text-end mt-5">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {pageNumbers.map((number) => (
                      <li
                        key={number}
                        className={`page-item ${
                          currentPage === number ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>

                <div className="vender-bottom">
                  <div className="row" style={{ color: "blue" }}>
                    <div className="col-md-12 text-start">
                      <div className="row mb-3 text-start">
                        <label
                          htmlFor="TotalRecord"
                          className="col-sm-4 col-form-label"
                        >
                          Total Record : {filteredData.length}
                        </label>
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

export default VenderList;
