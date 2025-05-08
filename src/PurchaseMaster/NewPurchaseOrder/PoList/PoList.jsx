import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import NavBar from "../../../NavBar/NavBar.js"
import SideNav from "../../../SideNav/SideNav.js"
import { FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import "./PoList.css"
import { fetchPurchaseOrders} from "../../../Service/PurchaseApi.jsx"

const PoList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [purchaseOrders, setPurchaseOrders] = useState([])
 

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
    const getPurchaseOrders = async () => {
      try {
        const data = await fetchPurchaseOrders()
        setPurchaseOrders(data)
      } catch (error) {
        console.error("Error fetching purchase orders:", error)
      }
    }

    getPurchaseOrders()
  }, [])

  

  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set number of items per page

  // Calculate indexes for slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const totalPages = Math.ceil(purchaseOrders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="POListMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="POList mt-5">
                  <div className="POList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">Purchase Order List</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link type="button" className="btn">
                          Recently Po Approval List
                        </Link>

                        <Link type="button" className="btn">
                          AMC Purchase Order List
                        </Link>
                        <Link type="button" className="btn">
                          Purchase Order - Query
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="POList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start">
                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Plant:</label>
                          <select className="form-select" style={{ marginTop: "-2px" }}>
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
                          <input type="text" className="form-control" />
                        </div>

                        {/* Status */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>PO Type:</label>
                          <select className="form-select" style={{ marginTop: "-2px" }}>
                            <option>Select All</option>
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Series */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Series:</label>
                          <select className="form-select" style={{ marginTop: "-2px" }}>
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Auth */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Item Group:</label>
                          <select className="form-select" style={{ marginTop: "-2px" }}>
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Item Name */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                          <label>Po Status:</label>
                          <select className="form-select" style={{ marginTop: "-2px" }}>
                            <option>Select All</option>
                          </select>
                        </div>

                        {/* Wo No */}
                        <div className="col-sm-6 col-md-1 col-lg-1">
                          <label>All User:</label>
                          <select className="form-select" style={{ marginTop: "-2px" }}>
                            <option>Select All</option>
                          </select>
                        </div>

                        <div className="col-sm-1 col-md-2" style={{ marginTop: "48px" }}>
                          <button type="button" className="btn btn-primary">
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
                          <th scope="col">Po No</th>
                          <th scope="col">Po Date</th>
                          <th scope="col">Po Type</th>
                          <th scope="col">Code No</th>
                          <th scope="col">Supplier/Vendor Name</th>
                          <th scope="col">User</th>
                          <th scope="col">View</th>
                          <th scope="col">Edit</th>
                          
                         
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((order, index) => (
                          <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.PoDate ? new Date(order.PoDate).getFullYear() : "N/A"}</td>
                            <td>{order.Plant}</td>
                            <td>{order.PoNo}</td>
                            <td>{order.PoDate}</td>
                            <td>{order.Type}</td>
                            <td>{order.CodeNo}</td>
                            <td>{order.Supplier}</td>
                            <td>{order.User}</td>
                              <td>
                                      <a
  href={`http://3.7.91.234:8000${order.View}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-sm btn-primary"
>
  View
</a>

        </td>
        <td>
        <Link
  to={`/new-purchase-order/${order.id}`}
  className="btn"
>
  <FaEdit />
</Link>
        </td>


                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                     {/* Pagination Controls */}
              <div className="row text-end">
                <div className="col-md">
                  <div className="pagination">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages).keys()].map((num) => (
                      <button
                        key={num + 1}
                        onClick={() => handlePageClick(num + 1)}
                        className={currentPage === num + 1 ? "active" : ""}
                      >
                        {num + 1}
                      </button>
                    ))}

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
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
  )
}

export default PoList

