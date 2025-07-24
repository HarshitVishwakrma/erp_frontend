import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./OpeningStock.css";
import { Link } from "react-router-dom";
const OpeningStock = () => {
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
    <div className="NewStoreOpeningStock">
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
                <div className="OpeningStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">Opening Stock</h5>
                    </div>
                  </div>
                </div>
                <div className="OpeningStock-main">
                  <div className="container-fluid text-start">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="card text-start">
                          <div className="card-header">
                            Opening: FG | SFG | WIP
                          </div>
                          <div className="card-body text-start">
                            <Link className="Openingbtn mb-2" to="/Openingstockmodal">
                              Add New
                            </Link>
                             <br/>
                            <Link className="Openingbtn mb-2">
                              Excel Upload
                            </Link>
                            <br/>
                            <Link className="Openingbtn mb-2">
                              View Opening Report
                            </Link>
                            <br/>

                            <button>Download Opening Stock Upload Template</button>

                            <div className="row mt-3">
                                <div className="col-4">
                                <label
                                  htmlFor="itemGroup"
                                  className="form-label"
                                >
                                  Item Group:
                                </label>
                                </div>
                              <div className="col-4">
                               
                                <select id="itemGroup" className="form-select">
                                  <option selected>Select</option>
                                  <option value="Group1">FG</option>
                                  <option value="Group2">SFG</option>
                                </select>
                              </div>
                              <div className="col-4 d-flex align-items-end">
                                <Link className="Openingbtn1">
                                  Download
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card">
                          <div className="card-header">
                            Opening: RM | Con | Other Group
                          </div>
                          <div className="card-body">
                            <Link className="Openingbtn mb-2">
                              Add New
                            </Link>
                             <br/>
                            <Link className="Openingbtn mb-2">
                              Excel Upload
                            </Link>
                            <br/>
                            <Link className="Openingbtn mb-2">
                              View Opening Report
                            </Link>
                            <br/>

                            <button>Download Opening Stock Upload Template</button>

                            <div className="row mt-3">
                                <div className="col-4">
                                <label
                                  htmlFor="itemGroup"
                                  className="form-label"
                                >
                                  Item Group:
                                </label>
                                </div>
                              <div className="col-4">
                               
                                <select id="itemGroup" className="form-select">
                                  <option selected>Select</option>
                                  <option value="Group1">RM</option>
                                  <option value="Group2">Tools</option>
                                  <option value="Group3">Consumable</option>
                                  <option value="BO">Bo</option>
                                  <option value="Asset">Asset</option>
                                </select>
                              </div>
                              <div className="col-4 d-flex align-items-end">
                                <Link className="Openingbtn1">
                                  Download
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card">
                          <div className="card-header">
                            Opening: Scrap
                          </div>
                          <div className="card-body">
                            <Link className="Openingbtn mb-2">
                              Add New
                            </Link>
                             <br/>
                           
                            <br/>
                            <Link className="Openingbtn mb-2">
                              View Opening Report
                            </Link>
                            <br/>

                            
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card">
                          <div className="card-header">
                            Stock Receipt
                          </div>
                          <div className="card-body">
                            <Link className="Openingbtn mb-2">
                              Add New
                            </Link>
                             <br/>
                           
                            <br/>
                            <Link className="Openingbtn mb-2">
                              View Receipt List
                            </Link>
                            <br/>

                          
                          </div>
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
  );
};

export default OpeningStock;
