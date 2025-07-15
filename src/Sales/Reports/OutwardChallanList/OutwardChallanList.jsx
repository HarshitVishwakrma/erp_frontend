import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./OutwardChallanList.css";
import { useNavigate } from "react-router-dom";

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>;

const OutwardChallanList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [challanList, setChallanList] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchOutwardChallanList = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Sales/onward-challans/");
      const responseData = await res.json();
      console.log(responseData);
      setChallanList(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewPdf = (challanNo) => {
    // Navigate to PDF view page - adjust the URL as needed
    window.open(
      `http://127.0.0.1:8000/Sales/onwardchallan/pdf/${challanNo}/`,
      "_blank"
    );
    // Alternative: Open PDF in new tab
    // window.open(`/api/challan-pdf/${challanNo}`, '_blank');
  };

  const formatItemsDisplay = (items) => {
    if (!items || items.length === 0) {
      return "No items";
    }

    return items
      .map((item) => `${item.item_code} | ${item.description} | ${item.qtyNo}`)
      .join(", ");
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
    fetchOutwardChallanList();
  }, [sideNavOpen]);

  return (
    <div className="OutwardChallanListMaster">
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
                <div className="OutwardChallanList mt-5">
                  <div className="OutwardChallanList-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title"> Outward Challan List </h5>
                      </div>

                      <div className="col-md-8 text-end">
                        <button type="button" className="btn" to="#/">
                          F7 Outward Report
                        </button>
                        <button
                          type="button"
                          className="btn"
                          to="#/"
                          onClick={handleButtonClick}
                        >
                          Outward Challan Query
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="OutwardChallanList-Main">
                    <div className="container-fluid">
                      <div className="row g-3 text-start mt-3">
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>From:</label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label>To:</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-1">
                          <label htmlFor="">Plant:</label>
                          <select
                            name=""
                            className="form-control"
                            style={{ marginTop: "-0px" }}
                            id=""
                          >
                            <option value="">Produlink</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label htmlFor="">Series :</label>
                          <select
                            name=""
                            className="form-control"
                            style={{ marginTop: "-0px" }}
                            id=""
                          >
                            <option value="">Select</option>
                            <option value="">57F4</option>
                            <option value="">Rework</option>
                            <option value="">Maintenance</option>
                            <option value="">Open</option>
                            <option value="">Not For Bill</option>
                            <option value="">Tool And Die</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <label htmlFor="">Status :</label>
                          <select
                            name=""
                            className="form-control"
                            style={{ marginTop: "-0px" }}
                            id=""
                          >
                            <option value="">All</option>
                            <option value="">New</option>
                            <option value="">Partial</option>
                            <option value="">Completed</option>
                          </select>
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="Checkbox"
                            />
                            <label
                              htmlFor="Checkbox"
                              className="form-check-label"
                            >
                              Vender Name:{" "}
                            </label>
                          </div>
                          <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                          />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="Checkbox"
                            />
                            <label
                              htmlFor="Checkbox"
                              className="form-check-label"
                            >
                              Select Item :{" "}
                            </label>
                          </div>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                        <div className="col-sm-6 col-md-2 col-lg-2">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="Checkbox"
                            />
                            <label
                              htmlFor="Checkbox"
                              className="form-check-label"
                            >
                              F4 Out No :{" "}
                            </label>
                          </div>
                          <input
                            type="text"
                            placeholder="No"
                            className="form-control"
                          />
                        </div>

                        <div className="col-6 col-md-2 align-items-center mt-5">
                          <button type="button" className="btn btn-primary">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col"> Sr.</th>
                          <th scope="col"> Challan No</th>
                          <th scope="col"> Challan Date</th>
                          <th scope="col"> DC No</th>
                          <th scope="col"> Transport Name</th>
                          <th scope="col"> Vehicle No</th>
                          <th scope="col"> Estimated Value</th>
                          <th scope="col"> EWay Bill No</th>
                          <th scope="col"> Vendor Name</th>
                          <th scope="col"> Items</th>
                          <th scope="col"> Rev Charges</th>
                          <th scope="col"> Remarks</th>
                          <th scope="col"> View PDF</th>
                        </tr>
                      </thead>

                      <tbody>
                        {challanList.length > 0 ? (
                          challanList.map((challan, index) => (
                            <tr key={challan.challan_no}>
                              <td>{index + 1}</td>
                              <td>{challan.challan_no}</td>
                              <td>{challan.challan_date}</td>
                              <td>{challan.DC_no}</td>
                              <td>{challan.Transport_name}</td>
                              <td>{challan.vehical_no}</td>
                              <td>{challan.Estimated_value}</td>
                              <td>{challan.EWay_bill_no}</td>
                              <td>{challan.vender}</td>
                              <td
                                style={{
                                  maxWidth: "200px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {formatItemsDisplay(challan.items)}
                              </td>
                              <td>{challan.rev_charges}</td>
                              <td>{challan.remarks}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-info"
                                  onClick={() => handleViewPdf(challan.id)}
                                >
                                  View PDF
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center">
                              No challan data available
                            </td>
                          </tr>
                        )}
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
  );
};

export default OutwardChallanList;
