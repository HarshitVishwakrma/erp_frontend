
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./Challaninward.css";

const Challaninward = () => {
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

  return (
    <div className="Challaninward">
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
                <div className="Challaninward-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Inward Challan List
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      {/* <div className="row justify-content-end">
                        <div className="col-md-3 d-flex align-items-end"> */}
                          <Link className="vndrbtn">GRN Report</Link>

                           <Link type="button" className="vndrbtn" to="/ChallanQuery">
                              57F4-Inward Query
                           </Link>
                        {/* </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                
                <div className="Challaninward-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                          {/* From Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">From Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* To Date */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">To Date</label>
                            <input type="date" className="form-control" />
                          </div>

                          {/* Plant */}
                            <div className="col-md-2 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                           <div className="col-md-2 col-sm-6">
                            <label className="form-label">Type</label>
                            <select className="form-select">
                              <option value="">ALL</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                           <div className="col-md-2 col-sm-6">
                            <label className="form-label">Series </label>
                            <select className="form-select">
                              <option value="">Select</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                           <div className="col-md-2 col-sm-6">
                            <label className="form-label">F4 Status</label>
                            <select className="form-select">
                              <option value="">ALL</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          {/* Supplier Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">VenderCustomer Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>

                          {/* Item Name */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Item Code No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Item Code"
                            />
                          </div>

                          {/* Gate Entry No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Part Code.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Part Code."
                            />
                          </div>

                          {/* Gate Entry No. */}
                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Inward 5.</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter No."
                            />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-2 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreChallaninward">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Year</th>
                              <th>Plant</th>
                              <th>Inward No</th>
                              <th>Inward  Date</th>
                              <th>Type</th>
                              <th>Challan No</th>
                              <th>Challan Date</th>
                              <th>Code</th>
                              <th>Name</th>
                              <th>F4 Cust No</th>                           
                              <th>Item Qty/Desc</th>
                              <th>User</th>
                              <th>Qc</th>
                              <th>Bill</th>
                              <th>Email</th>
                              <th>Edit</th>
                              <th>View</th>
                            </tr>
                          </thead>

                          <tbody>

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

export default Challaninward;
