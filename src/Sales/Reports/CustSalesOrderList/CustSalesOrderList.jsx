
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./CustSalesOrderList.css";
import { useNavigate } from 'react-router-dom';


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>


const CustSalesOrderList    = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
      const navigate = useNavigate();  
      
        const handleButtonClick = () => {
          navigate('/QuerySales'); 
        };

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
    <div className="CustSalesOrderListMaster">
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
              <div className="CustSalesOrderList">
                <div className="CustSalesOrderList-header mb-2 text-start">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="header-title"> Customer Sales Order List </h5>
                    </div>

                    <div className="col-md-6 text-end">
                        <button type="button" className=" vndrbtn" to="#/" >
                         CustPO - Report
                        </button>
                        <button type="button" className=" vndrbtn" to="#/" onClick={handleButtonClick} >
                             Sales Return - Query
                        </button>             
                    </div>

                  </div>
                </div>
               
                <div className="CustSalesOrderList-Main">
                    <div className="container-fluid">
                      
                        <div className="row g-3 text-start">  

                     <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">Plant:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">Produlink</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">So Series:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">All</option>
                            <option value="">New</option>
                            <option value="">PArtial</option>
                            <option value="">Completed</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">So Type:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">All</option>
                            <option value="">Domestic</option>
                            <option value="">Export</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">Other Type:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">All</option>
                            <option value="">GST</option>
                            <option value="">JobWork</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">Open/Close:</label>
                        <select name="" className="form-control" style={{marginTop:"-0px"}} id="">
                            <option value="">All</option>
                            <option value="">Open</option>
                            <option value="">Close</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                       <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="Checkbox" />
                            <label htmlFor="Checkbox" className="form-check-label">Customer Name: </label>
                        </div>
                        <input type="text"  placeholder="Name" className="form-control"/>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">User:</label>
                        <select name="" className="form-control" id="">
                            <option value="">All User</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-2">
                        <label htmlFor="">CR Name:</label>
                        <select name="" className="form-control" id="">
                            <option value="">All</option>
                        </select>
                      </div>  
                       <div className="col-sm-6 col-md-3 col-lg-4" style={{marginTop:"38px"}}>
                          <button type="button" className=" vndrbtn">
                            Search
                          </button>
                          <button type="button" className=" vndrbtn">
                            Search Option
                          </button>
                          <button type="button" className=" vndrbtn">
                            ValidityDate
                          </button>
                        </div>
                       
                        </div>

                    </div>
                  </div>

             <div className="CustSalesOrderList-Main mt-2 table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Year</th>
                            <th scope="col">Plant</th>
                            <th scope="col">SO No</th>
                            <th scope="col">SO Date</th>
                            <th scope="col">Cust PO No </th>
                            <th scope="col">Cust PO Dt</th>
                            <th scope="col">Type</th>
                            <th scope="col">Code</th>
                            <th scope="col">Cust Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">PO Status </th>
                            <th scope="col">Auth </th>
                            <th scope="col">User </th>
                            <th scope="col">Info </th>
                            <th scope="col">Doc </th>
                            <th scope="col"> Email </th>
                            <th scope="col">Edit </th>
                            <th scope="col">View </th>
                            <th scope="col">All </th>

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



export default CustSalesOrderList