
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./JobworkInvList.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const JobworkInvList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/QueryJobwork');
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="JobworkInvListMaster">
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
                <div className="JobworkInvList">
                  <div className="JobworkInvList-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Jobwork Invoice List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '3px' }}>
                          <button
                            style={{ padding: '5px' }}
                            className="BOMRouting vndrbtn"
                            onClick={toggleDropdown}
                          >
                            Job-Work Invoice : Report  ▼
                          </button>

                          {dropdownOpen && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                display: 'block',
                                minWidth: '10rem',
                                padding: '0.5rem 0',
                                margin: '0.125rem 0 0',
                                fontSize: '12px',
                                color: '#212529',
                                textAlign: 'left',
                                listStyle: 'none',
                                backgroundColor: '#fff',
                                backgroundClip: 'padding-box',
                              }}
                            >
                              <li>
                                <Link className="vndrbtn dropdown-item" to={"/"}>
                                  Export-Excel
                                </Link>
                              </li>
                              <li>
                                <Link className="vndrbtn dropdown-item" to={"/JobWorkSalesRegister"}>
                                  Job-Work Sales Register
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>

                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick}>
                          Jobwork Inv Query
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="JobworkInvList-Main">
                    <div className="container-fluid">

                      <div className="row g-3 text-start">

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>

                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control mt-2" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Plant:</label>
                          <select name="" className="form-control mt-2" id="">
                            <option value="">Produlink</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Customer Name: </label>
                          </div>
                          <input type="text" placeholder="Name" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Inv No: </label>
                          </div>
                          <input type="text" placeholder="No" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Item Grp: </label>
                          </div>
                          <select name="" className="form-control" id="">
                            <option value="">Select</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Inv No / Desc: </label>
                          </div>
                          <input type="text" placeholder="No" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Cancel:</label>
                          <select name="" className="form-control mt-2" id="">
                            <option value="">All</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-2">
                          <label htmlFor="">Ackn:</label>
                          <select name="" className="form-control mt-2" id="">
                            <option value="">All</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                          </select>
                        </div>

                        <div className="col-6 col-md-2 col-lg-2 align-items-center" style={{ marginTop: "44px" }}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="JobworkInvList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">Year</th>
                          <th scope="col">Plant</th>
                          <th scope="col">Inv No</th>
                          <th scope="col"> Inv Date</th>
                          <th scope="col"> Order No </th>
                          <th scope="col">Order Date</th>
                          <th scope="col">Cust Code</th>
                          <th scope="col">Cust Name</th>
                          <th scope="col">Item NO | Desc | Qty </th>
                          <th scope="col">Qty </th>
                          <th scope="col">Ass Amt </th>
                          <th scope="col">Total Amt </th>
                          <th scope="col">User </th>
                          <th scope="col"> IRN </th>
                          <th scope="col"> Ack </th>
                          <th scope="col"> EWB </th>
                          <th scope="col"> Email </th>
                          <th scope="col"> Cancel </th>
                          <th scope="col"> Edit </th>
                          <th scope="col"> View </th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
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


export default JobworkInvList