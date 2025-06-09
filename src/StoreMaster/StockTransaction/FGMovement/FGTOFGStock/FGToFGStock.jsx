import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import "./FGToFGStock.css";
import Cached from "@mui/icons-material/Cached.js";
const FGToFGStock = () => {
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
    <div className="NewStoreFgMoventStock">
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
                <div className="FgMoventStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-5">
                      <h5 className="header-title text-start">
                        FG To FG Stock Movement (Shop-Floor)
                      </h5>
                    </div>
                    <div className="col-md-7 text-start">
                      <div className="row">
                        <div className="col-md-2 d-flex flex-wrap">
                          <select className="form-select">
                            <option>Produlink</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="FgMoventStock-main mt-3">
                  <div className="container-fluid text-start">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Trn No:</label>
                          </div>
                          <div className="col-md-4">
                            <input className="form-control" />
                          </div>
                          <div className="col-md-4">
                            <Cached />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Tran. Date:</label>
                          </div>
                          <div className="col-md-4">
                            <input className="form-control" type="date" />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Item Code:</label>
                          </div>
                          <div className="col-md-8">
                            <input className="form-control" />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Part Code:</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option></option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Heat No:</label>
                          </div>
                          <div className="col-md-8">
                            <select className="form-select">
                              <option></option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="FGMovementSelect mt-3">
                      <div className="row flex-nowrap align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title text-start">
                            Select Item to Transfer Stock
                          </h5>
                        </div>
                      </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label>Item Code:</label>
                            </div>
                            <div className="col-md-8">
                              <input className="form-control" />
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label>Part Code:</label>
                            </div>
                            <div className="col-md-8">
                              <select className="form-select">
                                <option></option>
                              </select>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label>Heat No:</label>
                            </div>
                            <div className="col-md-8">
                              <select className="form-select">
                                <option></option>
                              </select>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label>Transfer Qty:</label>
                            </div>
                            <div className="col-md-4">
                              <input className="form-control" />
                            </div>
                            <div className="col-md-4">
                              <label>BOM WIP WT: = </label>
                            </div>
                            
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-4">
                              <label>Remark:</label>
                            </div>
                            <div className="col-md-8">
                              <textarea className="form-control"></textarea>
                            </div>
                            
                            
                          </div>

                        </div>
                      </div>
                  

                    <div className="row text-end mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="vndrbtn">
                          Save
                        </button>
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

export default FGToFGStock;