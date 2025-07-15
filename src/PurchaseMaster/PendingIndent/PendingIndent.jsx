import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./PendingIndent.css";

const PendingIndent = () => {
  // Side‐nav control
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Raw list from API
  const [indentList, setIndentList] = useState([]);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [plant, setPlant] = useState("");
  const [indentNo, setIndentNo] = useState("");
  const [item, setItem] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [mainGroup, setMainGroup] = useState("");
  const [directMrp, setDirectMrp] = useState("");
  const [department, setDepartment] = useState("");

  // Dummy toggle to re‐run filters on Search click
  const [searchToggle, setSearchToggle] = useState(false);

  // Fetch pending indents
  const fetchPendingAuthIndents = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/Purchase/pending-indents/"
      );
      const { data } = await res.json();
      setIndentList(data);
    } catch (err) {
      console.error("Failed fetching indents:", err);
    }
  };

  // Take approve/reject action
  const handleTakeAction = async (id, action) => {
    try {
      await fetch(
        "http://127.0.0.1:8000/Purchase/indents/update-auth/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ indent_id: id, auth_status: action }),
        }
      );
      // refresh list
      fetchPendingAuthIndents();
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  useEffect(() => {
    fetchPendingAuthIndents();
  }, []);

  // Apply or remove body class for side‑nav
  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
  }, [sideNavOpen]);

  // Compute filtered list
  const filteredIndents = useMemo(() => {
    return indentList.filter((ind) => {
      if (fromDate && ind.Date < fromDate) return false;
      if (toDate && ind.Date > toDate) return false;
      if (plant && ind.Plant !== plant) return false;
      if (indentNo && !ind.IndentNo.includes(indentNo)) return false;
      if (
        item &&
        !ind.indent_details.some((d) =>
          d.ItemNoCpcCode.includes(item)
        )
      )
        return false;
      if (
        typeFilter &&
        !ind.indent_details.some((d) => d.Type === typeFilter)
      )
        return false;
      if (mainGroup && ind.Category !== mainGroup) return false;
      if (directMrp && ind.CPCCode !== directMrp) return false;
      if (department && ind.WorkOrder !== department) return false;
      return true;
    });
  }, [
    indentList,
    fromDate,
    toDate,
    plant,
    indentNo,
    item,
    typeFilter,
    mainGroup,
    directMrp,
    department,
    searchToggle,
  ]);

  return (
    <div className="NewPendingIndentMaster">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={() => setSideNavOpen((s) => !s)} />
              <SideNav
                sideNavOpen={sideNavOpen}
                toggleSideNav={() => setSideNavOpen((s) => !s)}
              />

              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                {/* Header */}
                <div className="PendingIndent-header text-start mt-5">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="header-title">
                        Pending Indent Release List
                      </h5>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                      <button className="btn">Export To Excel</button>
                    </div>
                  </div>
                </div>

                {/* Filter Table */}
                <div className="Pendingindent mt-5">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>All Pending Indent</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Plant</th>
                          <th>
                            <input
                              type="checkbox"
                              id="supplierNameCheck"
                            />
                            <label
                              htmlFor="supplierNameCheck"
                              className="ms-2"
                            >
                              Indent No
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="itemCheck" />
                            <label htmlFor="itemCheck" className="ms-2">
                              Item
                            </label>
                          </th>
                          <th>
                            <input type="checkbox" id="typeCheck" />
                            <label htmlFor="typeCheck" className="ms-2">
                              Type
                            </label>
                          </th>
                          <th>Main Group</th>
                          <th>Direct/MRP</th>
                          <th>Department</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button className="pobtn">
                              All Pending Indent
                            </button>
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
                              value={plant}
                              onChange={(e) => setPlant(e.target.value)}
                            >
                              <option value="">All Plants</option>
                              <option>Plant 1</option>
                              <option>Plant 2</option>
                              <option>Plant 3</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Indent No"
                              value={indentNo}
                              onChange={(e) => setIndentNo(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Item"
                              value={item}
                              onChange={(e) => setItem(e.target.value)}
                            />
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={typeFilter}
                              onChange={(e) =>
                                setTypeFilter(e.target.value)
                              }
                            >
                              <option value="">All Types</option>
                              <option>type1</option>
                              <option>type2</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={mainGroup}
                              onChange={(e) =>
                                setMainGroup(e.target.value)
                              }
                            >
                              <option value="">All Groups</option>
                              <option>Category 1</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={directMrp}
                              onChange={(e) =>
                                setDirectMrp(e.target.value)
                              }
                            >
                              <option value="">Direct/MRP</option>
                              <option>CR Name 1</option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={department}
                              onChange={(e) =>
                                setDepartment(e.target.value)
                              }
                            >
                              <option value="">All Departments</option>
                              <option>Dept 1</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="pobtn"
                              onClick={() =>
                                setSearchToggle((t) => !t)
                              }
                            >
                              Search
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Data Table */}
                <div className="Pendingindent-list mt-4">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Plant</th>
                          <th>Series</th>
                          <th>Indent No</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Category</th>
                          <th>CPC Code</th>
                          <th>Work Order</th>
                          <th>Remark</th>
                          <th>Auth</th>
                          <th>Details</th>
                          <th>Approve</th>
                          <th>Reject</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredIndents.length === 0 && (
                          <tr>
                            <td colSpan="14" className="text-center">
                              No pending indents found.
                            </td>
                          </tr>
                        )}
                        {filteredIndents.map((ind, idx) => (
                          <tr key={ind.id}>
                            <td>{idx + 1}</td>
                            <td>{ind.Plant || "—"}</td>
                            <td>{ind.Series}</td>
                            <td>{ind.IndentNo}</td>
                            <td>{ind.Date}</td>
                            <td>{ind.Time}</td>
                            <td>{ind.Category || "—"}</td>
                            <td>{ind.CPCCode || "—"}</td>
                            <td>{ind.WorkOrder || "—"}</td>
                            <td>{ind.Remark || "—"}</td>
                            <td>
                              <span
                                className={`badge ${
                                  ind.Auth === "Pending"
                                    ? "bg-warning text-dark"
                                    : ind.Auth === "Approved"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {ind.Auth}
                              </span>
                            </td>
                            <td>
                              <ul className="mb-0 ps-3">
                                {ind.indent_details.map((d) => (
                                  <li key={d.id}>
                                    {d.ItemNoCpcCode} — {d.Description} ×{" "}
                                    {d.Qty} ({d.Unit})
                                    <br />
                                    Sch: {d.SchDate} | Type: {d.Type}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() =>
                                  handleTakeAction(ind.id, "Approved")
                                }
                              >
                                Approve
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleTakeAction(ind.id, "Rejected")
                                }
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
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

export default PendingIndent;
