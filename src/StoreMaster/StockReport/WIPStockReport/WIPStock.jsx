
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./WIPStock.css";

const WIPStock = () => {
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
    <div className="WIPStock">
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
                <div className="WIPStock-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-3">
                      <h5 className="header-title text-start">
                        WIP Stock Report
                      </h5>
                    </div>

                    <div className="col-md-9 text-end">
                      {/* <div className="row justify-content-end">
                        <div className="col-md-3 d-flex align-items-end"> */}
                           <Link type="button" className="vndrbtn">
                              Export To Excel
                           </Link>
                             <Link type="button" className="vndrbtn">
                              WIP-Under Decaration Stock
                           </Link>
                             <Link type="button" className="vndrbtn">
                              WIP Delewise Stock
                           </Link>
                        {/* </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                
                <div className="WIPStock-main mt-3">
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <form className="g-3 text-start">
                  <div className="row">
                          {/* Plant */}
                            <div className="col-md-2 col-sm-6">
                            <label className="form-label">Store</label>
                            <select className="form-select">
                              <option value="Produlink">Main Store</option>
                              {/* Add more options here */}
                            </select>
                          </div>

                          <div className="col-md-3 col-sm-6">
                            <label className="form-label">Search Item No Code Desc </label>
                            <input type="text" className="form-control" />
                          </div>

                           <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Search
                            </button>
                          </div>
 
                          {/* End First */}

                         
                          <div className="col-md-3 col-sm-6">
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }} >
                                    Heat No
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    All 
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    In Stock 
                                </label>
                             </div>
                             <select className="form-select">
                              <option value="Produlink"> </option>
                              {/* Add more options here */}
                            </select>
                          </div>



                         <div className="col-md-1 col-sm-6 mt-1 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              Clear
                            </button>
                          </div>

                     </div>

                  <div className="row mt-4">

                        <div className="col-md-3 col-sm-6">
                            <label className="form-label">Stock Level</label><br />
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    All Part Code
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input type="radio" name="stockLevel" value="" />
                                    In Stock Part Code
                                </label>
                             </div>
                        </div>

                        <div className="col-md-1 col-sm-6 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                                View
                            </button>
                        </div>

                          <div className="col-md-2 col-sm-6">
                            <label className="form-label">Part Code Like</label>
                            <input type="text"  className="form-control" value=""/>
                          </div>

                          <div className="col-md-1 col-sm-6 align-self-end">
                            <button type="submit" className="vndrbtn w-100">
                              View
                            </button>
                          </div>
                  </div>

                        </form>
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

export default WIPStock;
