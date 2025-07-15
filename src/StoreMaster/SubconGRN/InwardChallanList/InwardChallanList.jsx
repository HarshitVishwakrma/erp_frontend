import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar.js";
import SideNav from "../../../SideNav/SideNav.js";
import "./InwardChallanList.css";

const InwardChallanList = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [inwardChallanList, setInwardChallanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  const fetchInwardChallanList = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/Store/InwardChallan/');
      const data = await response.json();
      console.log('Fetched data:', data);
      setInwardChallanList(data);
    } catch (error) {
      console.error('Error fetching inward challan list:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatItemsDisplay = (inwardChallanTable) => {
    if (!inwardChallanTable || inwardChallanTable.length === 0) {
      return 'No items';
    }
    
    return inwardChallanTable.map(item => 
      `${item.InQtyNOS || 0} | ${item.ItemDescription || 'N/A'}`
    ).join(', ');
  };

  const handleViewPdf = (challanId) => {
    // Open PDF in new tab - adjust the URL to match your Django URL pattern
    window.open(`http://127.0.0.1:8000/Store/InwardChallan/pdf/${challanId}/`, '_blank');
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
    fetchInwardChallanList();
  }, [sideNavOpen]);

  return (
    <div className="NewStoreInwardList">
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
                <div className="InwardList-header mb-4 text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">
                        Inward Challan List
                      </h5>
                    </div>
                    <div className="col-md-6 text-end">
                      <div className="row justify-content-end">
                        <label>QC PEnding:4 , Partial : 1</label>
                      </div>
                    </div>
                    <div className="col-md-4 text-end">
                      <button className="btn">GRN : Report</button>
                      <button className="btn">57F4-Inward - Query</button>
                    </div>
                  </div>
                </div>
                
                <div className="InwardList-main">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-12 col-md">
                        <label htmlFor="fromDate">From Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="fromDate"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="toDate">To Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="toDate"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="plant">Plant</label>
                        <select className="form-control" id="plant">
                          <option>Produlink</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="type">Type</label>
                        <select className="form-control" id="type">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="series">Series</label>
                        <select className="form-control" id="series">
                          <option>Select</option>
                          <option>57F4 Inward</option>
                          <option>57F4 Return</option>
                          <option>Jobwork 57F4 Inward</option>
                          <option>Non Returnable Inward</option>
                          <option>Vendor Scrap Inward</option>
                          <option>Inward Tool</option>
                          <option>Cust Rework</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="f4Status">F4 Status</label>
                        <select className="form-control" id="f4Status">
                          <option>ALL</option>
                        </select>
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="vendorCustomerName">V Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="vendorCustomerName"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="itemCodeNo">ItemCodeNo:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="itemCodeNo"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="partCode">Part Code:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="partCode"
                        />
                      </div>
                      <div className="col-12 col-md">
                        <label htmlFor="inward">Inward</label>
                        <select className="form-control" id="inward">
                          <option>Select Inward</option>
                        </select>
                      </div>
                      <div className="col-12 col-md text-start">
                        <label htmlFor="critical">Is Critical</label>
                        <button type="button" className="pobtn">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="InwardList-table">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>Inward F4 No</th>
                              <th>Inward Date</th>
                              <th>Inward Time</th>
                              <th>Challan No.</th>
                              <th>Challan Date</th>
                              <th>Invoice No</th>
                              <th>Invoice Date</th>
                              <th>Supplier Name</th>
                              <th>Vehicle No</th>
                              <th>Transporter</th>
                              <th>Item Qty | Desc</th>
                              <th>Prepared By</th>
                              <th>Checked By</th>
                              <th>Total Items</th>
                              <th>Remarks</th>
                              <th>View PDF</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="17" className="text-center">
                                  Loading...
                                </td>
                              </tr>
                            ) : inwardChallanList.length > 0 ? (
                              inwardChallanList.map((challan, index) => (
                                <tr key={challan.id || index}>
                                  <td>{index + 1}</td>
                                  <td>{challan.InwardF4No || 'N/A'}</td>
                                  <td>{challan.InwardDate || 'N/A'}</td>
                                  <td>{challan.InwardTime || 'N/A'}</td>
                                  <td>{challan.ChallanNo || 'N/A'}</td>
                                  <td>{challan.ChallanDate || 'N/A'}</td>
                                  <td>{challan.InvoiceNo || 'N/A'}</td>
                                  <td>{challan.InvoiceDate || 'N/A'}</td>
                                  <td>{challan.SupplierName || 'N/A'}</td>
                                  <td>{challan.VehicleNo || 'N/A'}</td>
                                  <td>{challan.Transporter || 'N/A'}</td>
                                  <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>
                                    {formatItemsDisplay(challan.InwardChallanTable)}
                                  </td>
                                  <td>{challan.PreparedBy || 'N/A'}</td>
                                  <td>{challan.CheckedBy || 'N/A'}</td>
                                  <td>{challan.TotalItem || 'N/A'}</td>
                                  <td>{challan.Remark || 'N/A'}</td>
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
                                <td colSpan="17" className="text-center">
                                  No inward challan data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="InwardList-bottom">
                    <div className="row text-end">
                      <div className="col-md-12">
                        <p>Total Records: {inwardChallanList.length}</p>
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

export default InwardChallanList;