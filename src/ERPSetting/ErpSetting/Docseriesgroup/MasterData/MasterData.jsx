import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./MasterData.css";

const MasterData = () => {
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
    <div className="DataSeriesGroup">
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
                <div className="DataSeries mt-5">
                  <div className="DataSeries-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">
                          Document Series / Group
                        </h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <Link
                          type="button"
                          className="btn btn-primary me-2"
                          to="/Companysetup"
                        >
                          Company Info
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="DataSeries-Main mb-4 text-start">
                    <div className="row text-start">
                      <div className="col-md-12">
                        <button className="btn btn-light">Series Master</button>
                        <Link to="/MasterData" className="btn btn-light">
                          Master Data
                        </Link>
                        <Link to="/PurchaseErp" className="btn btn-light">
                          Purchase Order
                        </Link>
                        <Link to='/PurchaseERPGRN' className="btn btn-light">Purchase GRN</Link>
                        <Link to='/OutwardInward' className="btn btn-light">
                          57F4 Outward / Inward
                        </Link>
                        <Link className="btn btn-light">GST Sales</Link>
                        <Link className="btn btn-light">
                          GST Sales Return
                        </Link>
                        <Link className="btn btn-light">
                          Debit Credit Note
                        </Link>
                        <button className="btn btn-light">
                          Delivery Challan
                        </button>
                        <button className="btn btn-light">Account</button>
                        <button className="btn btn-light">Production</button>
                        <button className="btn btn-light">Quotation</button>
                      </div>
                    </div>
                  </div>

                  <div className="DataSeries-Table">
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="text-primary text-start">Customer Type Master</h4>
                        <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">CustTypeId</th>
                          <th scope="col">Cust Type</th>
                          <th scope="col">Prefix</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td>1</td>
                          <td><input type="text" className="form-control"></input></td>
                          <td><input type="text" className="form-control"></input></td>

                         
                          
                          
                        </tr>
                        {/* More rows can be added here */}
                      </tbody>
                    </table>
                  </div>
                        </div>
                        <div className="col-md-6">
                        <h4 className="text-primary text-start">Item Master</h4>
                        <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.</th>
                          <th scope="col">SubGroupId</th>
                          <th scope="col">SubGroupName</th>
                          <th scope="col">VPrefix</th>
                          <th scope="col">NVPrefix</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example data row */}
                        <tr>
                          <td>1</td>
                          <td>January</td>
                          <td>FG</td>
                          <td><input type="text" className="form-control"></input></td>
                          <td><input type="text" className="form-control"></input></td>
                          
                          
                        </tr>
                        {/* More rows can be added here */}
                      </tbody>
                    </table>
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

export default MasterData;
