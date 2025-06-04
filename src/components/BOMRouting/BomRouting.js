import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./BomRouting.css";
import { Link } from "react-router-dom";
const BomRouting = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const [activeTable, setActiveTable] = useState('');

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggleDropdown = () => {
  //   setDropdownOpen(prevState => !prevState);
  // };
  

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  return (
    <div className="BomRouting">
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
                <div className="BomRouting1">
                  
                  <div className="BomRoutingheading mb-4 text-start">
                      <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">
                            BOM And Routing List
                          </h5>
                        </div>
                        <div className="col-md-1 col-form-label">
                          <label htmlFor="TotalBom">Total BOM:</label>
                        </div>

                        <div className="col-sm-9 text-end">
                         <button className="vndrbtn" onClick={() => setActiveTable('FG')}>
                            FG:548
                          </button>
                          <button className="vndrbtn" onClick={() => setActiveTable('SFG')}>
                            SFG:1
                          </button>
                          <button className="vndrbtn" onClick={() => setActiveTable('RM')}>
                            RM:44
                          </button>
                          <button className="vndrbtn" onClick={() => setActiveTable('NPD')}>
                            NPD:0
                          </button>
                          <button className="vndrbtn" onClick={() => setActiveTable('Total')}>
                            Total:593
                          </button>
                          <button className="vndrbtn" onClick={() => setActiveTable('UnAuth')}>
                            Un-Auth:2
                          </button>
                          <button className="vndrbtn" onClick={() => setActiveTable('Auth')}>
                            Auth:591
                          </button>

                          <div style={{ position: 'relative', display: 'inline-block', marginLeft: '3px' }}>
                            <button
                              style={{ padding: '5px' }}
                              className="BOMRouting vndrbtn"
                              onClick={toggleDropdown}
                            >
                              BOM:Report ▼
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
                                  <Link className="vndrbtn dropdown-item" to={"/UploadWIPvalue"}>
                                    Upload WIP Value
                                  </Link>
                                </li>
                                <li>
                                  <Link className="vndrbtn dropdown-item" to={"/UploadOperationSpeci"}>
                                    Upload Operation Specification
                                  </Link>
                                </li>
                                <li>
                                  <Link className="vndrbtn dropdown-item" to={"/ManualBOMWorking"}>
                                    Manual BOM Working Sheet
                                  </Link>
                                </li>
                                <li>
                                  <Link className="vndrbtn dropdown-item" to={"/BOMItemTrace"} >
                                    BOM Item Traceability
                                  </Link>
                                </li>
                                <li>
                                  <Link className="vndrbtn dropdown-item"  to={"/"}>
                                    BOM Value Report
                                  </Link>
                                </li>
                                <li>
                                  <Link className="vndrbtn dropdown-item" to={"/"}>
                                    BOM Tree View
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </div>
                          
                          <Link
                            to={"/bill-material"}
                            className="vndrbtn"
                          >
                            New / Modify BOM
                          </Link>
                          <Link className="vndrbtn"  to={"/BOMQuery"}>BOM:Query</Link>
                        </div>

                      </div>
                    </div>
              
                  <div className="BomRoutingMain">
                    <div className="Container-fluid">

                      <div className="row mb-3 text-start">
                        <div className="col-md-1 mt-1">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>ALL</option>
                            <option value="1">FG</option>
                            <option value="2">RM</option>
                            <option value="3">SFG</option>
                          </select>
                        </div>
                        <div className="col-sm-2 mt-2">
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail3"
                          />
                        </div>
                        <label
                          htmlFor="itemGroup"
                          className="col-sm-1 col-form-label"
                        >
                          Item Group:
                        </label>
                        <div className="col-md-2">
                          <select
                            className="form-select mt-2"
                            aria-label="Default select example"
                          >
                            <option selected>ALl</option>
                            <option value="BEARING">BEARING</option>
                            <option value="BELTS">BELTS</option>
                            <option value="CAMS">CAMS</option>
                            <option value="COLLETS & HOLDERS">COLLETS & HOLDERS</option>
                            <option value="COMPUTER">COMPUTER</option>
                            <option value="CUTTING TOOL">CUTTING TOOL</option>
                            <option value="ELECTRICS PARTS">ELECTRICS PARTS</option>
                            <option value="END PIEC">END PIECE</option>
                            <option value="FIXCTURE">FIXCTURE</option>
                          </select>
                        </div>
                        <div className="col-md-6 mt-2">
                          <button className="  vndrbtn">Search</button>
                          <button className="  vndrbtn">View All</button>
                          <button className="  vndrbtn">
                            Export Excel (Routing)
                          </button>
                          <button className="  vndrbtn">
                            Export Excel (BOM)
                          </button>
                          <button className="  vndrbtn">Excel(Routing)</button>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="BomRoutingTable mt-4">
                    <div className="row">

                       <div className="col-md-12">
                            {/* Tables */}
                            {activeTable === 'FG' && (
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                                    <th>Sr</th>
                                                    <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                    <td>1</td>
                                                      <td>Item No 1</td>
                                                      <td>Item Code 1</td>
                                                      <td>Item Docs 1</td>
                                                      <td>NPO 1</td>
                                                      <td>Auth 1</td>
                                                      <td>User 1</td>
                                                      <td>View 1</td>
                                                      <td>View 1</td>
                                                      <td>Tree 1</td>
                                                      <td>Tree 1</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {activeTable === 'SFG' && (
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                    <th>Sr</th>
                                                      <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
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
                            )}

                            {activeTable === 'RM' && (
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                  <tr>
                                                      <th>Sr</th>
                                                      <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                                    </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>admin</td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {activeTable === 'NPD' && (
                              <div className="table-responsive">
                              <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                    <th>Sr</th>
                                                      <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
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
                            )}

                            {activeTable === 'Total' && (
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                    <th>Sr</th>
                                                      <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
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
                            )}

                            {activeTable === 'UnAuth' && (
                              <div className="table-responsive">    
                              <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                    <th>Sr</th>
                                                      <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
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
                            )}

                            {activeTable === 'Auth' && (
                              <div className="table-responsive">
                              <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                    <th>Sr</th>
                                                      <th>Item No</th>
                                                      <th>Item Code</th>
                                                      <th>Item Docs</th>
                                                      <th>NPO</th>
                                                      <th>Auth</th>
                                                      <th>User</th>
                                                      <th>View</th>
                                                      <th>View</th>
                                                      <th>Tree</th>
                                                      <th>Tree</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
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
                            )}
                      </div>

                    </div>
                  </div>

                  <div className="BomRouteBottom mt-5">
                    <div className="row">
                      <div className="col-md-6 text-start">
                        <h6 style={{ color: "blue" }}>
                          Total Reacords<span>00</span>
                        </h6>
                      </div>
                      <div className="col-md-6 text-end">
                        <h6 style={{ color: "blue" }}>
                          Format<span>PDF</span>
                        </h6>
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

export default BomRouting;