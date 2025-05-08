import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./CommodityMaster.css";

const CommodityMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  return (
    <div className="CommodityMaster">
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
                <div className="CommodityMaster1">
                
                  <div className="Commodity-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">
                          Commodity Master</h5>
                      </div>
                        <div className="col-md-8 text-md-end text-start mt-2 mt-md-0">
                          <button className="btn">
                            Export Report
                          </button>
                        </div>
                      </div>
                    </div>
                 
                  <div className="CommodityMainerty mt-5">
                    <div className="container-fluid">
                      <div className="row text-start">
                        <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="commodityName"
                            className="col-form-label"
                          >
                            Commodity Name:<span className="text-danger">
                                                *
                                              </span>
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control"
                            id="commodityName"
                            
                          />
                        </div>
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label htmlFor="tariffNo" className="col-form-label">
                            Tariff No:<span className="text-danger">
                                                *
                                              </span>
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control"
                            id="tariffNo"
                            
                          />
                        </div>
                        <div className="col-md-1 col-sm-12 text-sm-start text-md-start">
                          <button className="btn">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="CommodityTable mt-5">
                    <div className="container-fluid">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead className="table-primary">
                            <tr>
                              <th scope="col">No Found Data!!</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div
                    className="record-count text-start"
                    style={{ color: "blue", padding: "10px" }}
                  >
                    Total Records: 00
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

export default CommodityMaster;
