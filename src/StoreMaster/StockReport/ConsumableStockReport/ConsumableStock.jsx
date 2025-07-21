
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./ConsumableStock.css";

const ConsumableStock = () => {
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
    <div className="ConsumableStock">
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
                <div className="ConsumableStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        Consumable Stock Report
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      <div className="row justify-content-end">
                        <div className="">
                        
                        <div className="text-end">
                               < div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }} >
                                    Filter By : 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    All 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    In Stock  
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    Out Of Stock 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    Negative Stock 
                                </label>
                                 </div>
                        </div>

                           <Link type="button" className="vndrbtn">
                              Export To Excel
                           </Link>

                           <Link type="button" className="vndrbtn">
                              CON DataWise Stock
                           </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ConsumableStock-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="row g-3 text-start">
                         
                          <div className="col-md-1 col-sm-6">
                            <label className="form-label">Plant</label>
                            <select className="form-select">
                              <option value="Produlink">Produlink</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Store</label>
                            <select className="form-select">
                              <option value="">Main Store</option>
                              {/* Add more options here */}
                            </select>
                          </div>    

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Main Group</label>
                            <select className="form-select">
                              <option value="">Select</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Group</label>
                            <select className="form-select">
                              <option value="">All</option>
                              {/* Add more options here */}
                            </select>
                          </div>


                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Sub Group</label>
                            <select className="form-select">
                              <option value="">All</option>
                              {/* Add more options here */}
                            </select>
                          </div> 

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label"> Item </label>
                            <input type="text" className="form-control" />
                          </div>

                          {/* Search Button */}
                          <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="StoreConsumableStock">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Item No</th>
                              <th>Item Desc </th>
                              <th>Item  Size </th>
                              <th> Group Name </th>
                              <th> UnitCode </th>
                              <th> PO Bal. Qty</th>
                              <th>ShopFloor</th>
                              <th> Stock</th>
                              <th>Rate</th>
                              <th>Value</th>
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

export default ConsumableStock;
