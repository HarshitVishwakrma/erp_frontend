import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
// import { FaEdit, FaTrash } from "react-icons/fa";

const MaterialIssueReport = () => {
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
    <div className="QualityPlanMaster">
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
              <div className="QualityPlanList">
                <div className="QualityPlanList-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title"> Material Issue Report </h5>
                    </div>
                    <div className="col-md-8 text-end">
                      <button type="button" className="vndrbtn" to="#/">
                        Export Report
                      </button>
                     </div>
                  </div>
                </div>

                <div className="ProQualityPlan-Main">
                  <div className="container-fluid">
                    <div className="row g-3 text-start">
                        {/* Plant */}
                          <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Wo Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* To Date */}
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>Target Date:</label>
                          <input type="date" className="form-control" />
                        </div>

                        {/* Plant */}
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Plant:</label>
                          <select className="form-select">
                            <option>Produlink</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Series:</label>
                          <select className="form-select">
                            <option>Select </option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Report Type:</label>
                          <select className="form-select">
                            <option>Details </option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Is Pandding:</label>
                          <select className="form-select">
                            <option> All</option>
                          </select>
                        </div>

                        <div className="col-sm-6 col-md-1 col-lg-2">
                          <label>Customer Name:</label>
                          <input type="text" className="form-control" />
                        </div>

                     </div>
                    
                      <div className="row g-3 mt-2 text-start">

                        {/* Item Name */}
                        <div className="col-sm-6 col-md-1 col-lg-2">
                          <label>Item Name:</label>
                          <input type="text" className="form-control" />
                        </div>


                        <div className="col-sm-6 col-md-3 col-lg-2">
                        <label>Main Group :</label>
                        <select className="form-control" style={{marginTop:"1px"}}>
                          <option>Select</option>
                          <option>FG</option>
                          <option>RM</option>
                          <option>Tools</option>
                          <option>Instrument</option>
                          <option>Machine</option>
                          <option>Consumable</option>
                          <option>Safety Equ</option>
                          <option>Service</option>
                          <option>Asset</option>
                          <option>F4</option>
                          <option>Scrap</option>
                          <option>SF</option>
                          <option>BO</option>
                          <option>DI</option>
                        </select>
                        </div>

                         <div className="col-sm-6 col-md-2 col-lg-2">
                          <label>Project:</label>
                          <select className="form-select">
                            <option>Details </option>
                          </select>
                        </div>

                      {/* Item Name */}
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label>WOrder No:</label>
                        <input type="text" className="form-control"/>
                      </div>

                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label>SO No:</label>
                        <input type="text" className="form-control"/>
                      </div>

                      <div className="col-sm-2 col-md-2 col-lg-1">
                      <button type="button" className="vndrbtn  w-100" style={{marginTop:"22px"}} >
                          Search
                      </button> 
                      </div>
                
                    </div>
                  </div>
                </div>

                 <div className="ProQualityPlantable mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">No  Data.</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        {/* <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr> */}
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

export default MaterialIssueReport;