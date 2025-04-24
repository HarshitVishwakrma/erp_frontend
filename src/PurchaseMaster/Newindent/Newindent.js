import "./Newindent.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
const Newindent = () => {
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

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Get the current date and time
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
    const time = now.toTimeString().split(' ')[0].substring(0, 5); // Get the time in HH:MM format

    setCurrentDate(date);
    setCurrentTime(time);
  }, []);


  return (
    <div className="NewindentMaster">
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
                <div className="Newindent">
                  <div className="container-fluid">
                    <div className="col-md-12">
                      <div className="newindent1">
                        <div className="newindent-header mb-4 text-start">
                          <div className="row align-items-center">
                            <div className="col-md-4">
                              <h5 className="header-title">New Indent</h5>
                            </div>
                            <div className="col-md-8 text-end">
                              <button className="btn">Indent List</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="newindent2">
                        <div className="container">
                          <div className="row text-start">
                            <div className="col-md-12">
                              <form className="d-flex flex-wrap">
                                <div className="form-group col-md-1">
                                  <label htmlFor="sharp" className="form-label">
                                    Plant:
                                  </label>
                                  <select id="sharp" className="form-control">
                                  <option value="Select">Select</option>
                                    <option value="Produlink">Produlink</option>
                                    
                                    
                                  </select>
                                </div>
                                <div className="form-group col-md-1">
                                  <label
                                    htmlFor="series"
                                    className="form-label"
                                  >
                                    Series:
                                  </label>
                                  <select
                                    id="purchase"
                                    className="form-control"
                                  >
                                    <option value="">Purchase...</option>
                                    <option value="Purchase Indent">Purchase Indent</option>
                                  
                                  </select>
                                </div>
                               
                               
                                 
                                <div className="form-group col-md-1 ">
                                  <label
                                    htmlFor="indentNo"
                                    className="form-label"
                                  >
                                    Indent No:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="indentNo"
                                  />
                                </div>
                                
                                <div className="form-group col-md-2 ">
                                  <label htmlFor="date" className="form-label">
                                    Date:
                                  </label>
                                   <input
          type="date"
          className="form-control"
          id="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
                                </div>
                                <div className="form-group col-md-2 ">
                                  <label htmlFor="time" className="form-label">
                                    Time:
                                  </label>
                                  <input
          type="time"
          className="form-control"
          id="time"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />
                                </div>
                                <div className="form-group col-md-2 ">
                                  <label
                                    htmlFor="category"
                                    className="form-label"
                                  >
                                    Category:
                                  </label>
                                  <select
                                    id="category"
                                    className="form-control"
                                  >
                                    <option value="">Office</option>
                                    <option value="option1">factory</option>
                                    <option value="option2">Option 2</option>
                                  </select>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="newindentmain">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-12 text-start">
                              <button className="newindentmainbtn">
                                Item Details
                              </button>
                            </div>
                          </div>
                          <div className="newindenttable">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Select Item & CPC Code</th>
                                        <th>Description</th>
                                        <th>Available Stock</th>
                                        <th>Unit</th>
                                        <th>Machine | Department</th>
                                        <th>Qty</th>
                                        <th>Type</th>
                                        <th>Remark</th>
                                        <th>Use For</th>
                                        <th>MD Ref</th>
                                        <th>Sch. Date</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <select className="form-control">
                                            <option value="">
                                              Select Item
                                            </option>
                                            <option value="item1">
                                              Item 1
                                            </option>
                                            <option value="item2">
                                              Item 2
                                            </option>
                                          </select>
                                          <button className="btn">
                                            Search
                                          </button>
                                          <br />
                                          {/* <select className="form-control">
                                            <option value="">
                                              Select Item
                                            </option>
                                            <option value="item1">
                                              Item 1
                                            </option>
                                            <option value="item2">
                                              Item 2
                                            </option>
                                          </select> */}
                                        </td>
                                        <td>
                                          <textarea
                                            className="form-control"
                                            rows="2"
                                          ></textarea>
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                          />
                                        </td>
                                        <td>
                                          <select className="form-control">
                                            <option value="unit1">Nos</option>
                                            <option value="unit2">
                                              Unit 2
                                            </option>
                                          </select>
                                        </td>
                                        <td>
                                          <select className="form-control">
                                            <option value="machine1">
                                              Select
                                            </option>
                                            <option value="department1">
                                              Department 1
                                            </option>
                                          </select>
                                          <br />
                                          <select className="form-control">
                                            <option value="machine1">
                                              Quality
                                            </option>
                                            <option value="department1">
                                              Department 1
                                            </option>
                                          </select>
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control"
                                          />
                                        </td>
                                        <td>
                                          <select className="form-control">
                                            <option value="type1">
                                              Regular
                                            </option>
                                            <option value="type2">
                                              Type 2
                                            </option>
                                          </select>
                                        </td>
                                        <td>
                                          <textarea
                                            className="form-control"
                                            rows="2"
                                          ></textarea>
                                        </td>
                                        <td>
                                          <textarea
                                            className="form-control"
                                            rows="2"
                                          ></textarea>
                                        </td>
                                        <td>
                                          <textarea
                                            className="form-control"
                                            rows="2"
                                          ></textarea>
                                        </td>
                                        <td>
                                          <input
                                            type="date"
                                            className="form-control"
                                          />
                                        </td>
                                        <td>
                                          <button className="btn me-2">
                                            <FaPlus />
                                          </button>
                                          <button className="btn">
                                            <FaTrash />
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="newindenttable1">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Sr.</th>
                                        <th>Item No & CPC Code</th>
                                        <th>Description</th>
                                        <th>Unit</th>
                                        <th>Machine | Department</th>
                                        <th>Qty</th>
                                        <th>Type</th>
                                        <th>Remark</th>
                                        <th>Use For</th>
                                        <th>MD Ref</th>
                                        <th>Sch. Date</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
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
                                        <td>
                                          <button className="indenttablebtn">
                                            <FaTrash />
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="newindentbottom">
                        <div className="container-fluid">
                          <div className="row text-start">
                            <div className="col-md-1">
                              <label>CPU Code :</label>
                            </div>
                            <div className="col-md-2">
                              <input className="form-control" />
                            </div>
                            <div className="col-md-1">
                              <label>Work Order:</label>
                            </div>
                            <div className="col-md-2">
                              <input className="form-control" />
                            </div>
                            <div className="col-md-1">
                              <label>Remark:</label>
                            </div>
                            <div className="col-md-2">
                              <input className="form-control" />
                            </div>
                            <div className="col-md-2">
                              <button className="btn">
                                Save indent
                              </button>
                            </div>
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

export default Newindent;
