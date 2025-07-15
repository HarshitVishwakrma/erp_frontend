import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PendingPo.css";

const PendingPo = () => {
  // side‑nav
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // raw list
  const [pendingPoList, setPendingPoList] = useState([]);

  // filter states
  const [plantFilter, setPlantFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [poNoFilter, setPoNoFilter] = useState("");
  const [crNameFilter, setCrNameFilter] = useState("");

  // toggle to re‑run filters on Search click
  const [searchToggle, setSearchToggle] = useState(false);

  // fetch once on mount
  const fetchPendingPo = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/Purchase/purchase-orders/unverified/simple/"
      );
      const { data } = await res.json();
      setPendingPoList(data);
    } catch (err) {
      console.error("Failed to fetch POs:", err);
    }
  };

  useEffect(() => {
    fetchPendingPo();
  }, []);

  // update body class
  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // approve / reject handler
  const handleTakeAction = async (id, action) => {
    try {
      await fetch(
        `http://127.0.0.1:8000/Purchase/purchase-po/${id}/update-status-fbv/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approved_status: action }),
        }
      );
      fetchPendingPo();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  // apply filters
  const filteredList = useMemo(() => {
    return pendingPoList.filter((po) => {
      if (plantFilter && po.Plant !== plantFilter) return false;
      if (fromDate && po.PoDate < fromDate) return false;
      if (toDate && po.PoDate > toDate) return false;
      if (typeFilter && po.Type !== typeFilter) return false;
      if (categoryFilter && po.Series !== categoryFilter) return false;
      if (
        supplierFilter &&
        !po.Supplier?.toLowerCase().includes(supplierFilter.toLowerCase())
      )
        return false;
      if (
        poNoFilter &&
        !po.PoNo.toString().includes(poNoFilter)
      )
        return false;
      if (
        crNameFilter &&
        !po.CPCCode?.toLowerCase().includes(crNameFilter.toLowerCase())
      )
        return false;
      return true;
    });
  }, [
    pendingPoList,
    plantFilter,
    fromDate,
    toDate,
    typeFilter,
    categoryFilter,
    supplierFilter,
    poNoFilter,
    crNameFilter,
    searchToggle,
  ]);

  return (
    <div className="NewPendingpoMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen((p) => !p)} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={() => setSideNavOpen((p) => !p)}
              />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                {/* Header */}
                <div className="NewPendingpoMaster-header text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">
                        Pending Purchase Order Release List
                      </h5>
                    </div>
                    <div className="col-md-8 d-flex flex-wrap justify-content-end">
                      <label className="mt-2 me-2">Ageing Days</label>
                      <button className="btn">[Under 0-7]</button>
                      <button className="btn">[Under 8-15]</button>
                      <button className="btn">[Under 16-30]</button>
                      <button className="btn">[Under 31-60]</button>
                      <button className="btn">[Above 60]</button>
                    </div>
                  </div>
                </div>

                {/* Filter Table */}
                <div className="Pendingpurchase mt-5">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>View All</th>
                          <th>Plant</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Type</th>
                          <th>Category</th>
                          <th>
                            <input type="checkbox" id="supplierNameCheck" />
                            <label htmlFor="supplierNameCheck" className="ms-2">
                              Supplier Name
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="poNoCheck" />
                            <label htmlFor="poNoCheck" className="ms-2">
                              PO No
                            </label>
                          </th>
                          <th>CR Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button className="pobtn">View All Purchase</button>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={plantFilter}
                              onChange={(e) => setPlantFilter(e.target.value)}
                            >
                              <option value="">All Plants</option>
                              <option>Plant 1</option>
                              <option>Plant 2</option>
                              <option>Plant 3</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={typeFilter}
                              onChange={(e) => setTypeFilter(e.target.value)}
                            >
                              <option value="">All Types</option>
                              <option>Type 1</option>
                              <option>Type 2</option>
                              <option>Type 3</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={categoryFilter}
                              onChange={(e) =>
                                setCategoryFilter(e.target.value)
                              }
                            >
                              <option value="">All Categories</option>
                              <option>Category 1</option>
                              <option>Category 2</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Supplier"
                              value={supplierFilter}
                              onChange={(e) =>
                                setSupplierFilter(e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="PO No"
                              value={poNoFilter}
                              onChange={(e) => setPoNoFilter(e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={crNameFilter}
                              onChange={(e) => setCrNameFilter(e.target.value)}
                            >
                              <option value="">All CR Names</option>
                              <option>CR Name 1</option>
                              <option>CR Name 2</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="pobtn"
                              onClick={() => setSearchToggle((t) => !t)}
                            >
                              Search
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Data Table */}
                  <div className="table-responsive mt-4">
                    <table className="table table-striped table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>PO No.</th>
                          <th>Enquiry No.</th>
                          <th>Type</th>
                          <th>Plant</th>
                          <th>Series</th>
                          <th>Supplier</th>
                          <th>Delivery Date</th>
                          <th>PO Date</th>
                          <th>Created By</th>
                          <th>Items</th>
                          <th>Approve</th>
                          <th>Reject</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredList.length === 0 ? (
                          <tr>
                            <td colSpan="12" className="text-center">
                              No pending purchase orders.
                            </td>
                          </tr>
                        ) : (
                          filteredList.map((po) => (
                            <tr key={po.id}>
                              <td>{po.PoNo}</td>
                              <td>{po.EnquiryNo}</td>
                              <td>{po.Type}</td>
                              <td>{po.Plant}</td>
                              <td>{po.Series}</td>
                              <td>{po.Supplier || "—"}</td>
                              <td>{po.DeliveryDate}</td>
                              <td>{po.PoDate}</td>
                              <td>{po.created_by_username}</td>
                              <td>
                                {po.item_details
                                  .map(
                                    (it) =>
                                      `${it.Item} – ${it.ItemDescription}`
                                  )
                                  .join(", ")}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() =>
                                    handleTakeAction(po.id, "Approved")
                                  }
                                >
                                  Approve
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    handleTakeAction(po.id, "Rejected")
                                  }
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))
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

export default PendingPo;
