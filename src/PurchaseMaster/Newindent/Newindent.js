import "./Newindent.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getNextIndentNo , postIndent} from "../../Service/PurchaseApi";
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

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Get the current date and time
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
    const time = now.toTimeString().split(" ")[0].substring(0, 5); // Get the time in HH:MM format

    setCurrentDate(date);
    setCurrentTime(time);
  }, []);

  const [series, setSeries] = useState("");
  const [indentNo, setIndentNo] = useState("");

  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;
    setSeries(selectedSeries);

    if (selectedSeries === "Purchase Indent") {
      const shortYear = localStorage.getItem("Shortyear"); // e.g., "2425"
      try {
        const indent = await getNextIndentNo(shortYear);
        if (indent) {
          setIndentNo(indent);
          console.log("Fetched Indent No:", indent);
        }
      } catch (error) {
        console.error("Error fetching indent number:", error);
      }
    } else {
      setIndentNo("");
    }
  };

  const [formData, setFormData] = useState({
    Plant: '',
    Series: 'IND-2025',
    IndentNo: '',
    Date: '',
    Time: '',
    Category: '',
    CPCCode: '',
    WorkOrder: '',
    Remark: '',
    New_Indent: [],
  });
  

  const [itemRow, setItemRow] = useState({
    ItemNoCpcCode: '',
    Description: '',
    // AvailableStock: '',
    Unit: '',
    MachineAndDepartment: '',
    // Department: '',
    Qty: '',
    Type: '',
    Remark: '',
    UseFor: '',
    MoRef: '',
    SchDate: '',
  });
  
  const [newIndentTable, setNewIndentTable] = useState([]);
  const handleAddItem = () => {
    if (!itemRow.ItemNoCpcCode || !itemRow.Qty) return alert("Fill required fields");
  
    setNewIndentTable((prev) => [...prev, itemRow]);
    setItemRow({
      ItemNoCpcCode: '',
      Description: '',
      // AvailableStock: '',
      Unit: '',
      MachineAndDepartment: '',
      // Department: '',
      Qty: '',
      Type: '',
      Remark: '',
      UseFor: '',
      MoRef: '',
      SchDate: '',
    });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the field exists in itemRow, update itemRow
    if (name in itemRow) {
      setItemRow((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  

  const handleSaveIndent = async (e) => {

    e.preventDefault();
    const payload = {
      ...formData,
      IndentNo: indentNo,
  Date: currentDate,
  Time: currentTime,
  New_Indent: newIndentTable,
     
    };
  
    try {
      await postIndent(payload);
      toast.success("Indent saved successfully");
  
      // Reset form
      setFormData({
        Plant: '',
        Series: 'IND-2025',
        IndentNo: '',
        Date: '',
        Time: '',
        Category: '',
        CPCCode: '',
        WorkOrder: '',
        Remark: '',
        New_Indent: [],
      });
    } catch (err) {
      toast.error("Failed to save indent. Check console for details.");
    }
  };

  const handleDeleteItem = (index) => {
    setNewIndentTable(prev => prev.filter((_, i) => i !== index));
  };
  

  return (
    <div className="NewindentMaster">
      <ToastContainer/>
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
                      <form>
                        <div className="newindent2">
                          <div className="container">
                            <div className="row text-start">
                              <div className="d-flex flex-wrap">
                              <div className="form-group col-md-1">
  <label htmlFor="Plant" className="form-label">Plant:</label>
  <select
    id="Plant"
    name="Plant"
    className="form-control"
    value={formData.Plant}
    onChange={handleChange}
  >
    <option value="">Select</option>
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
                                    value={series}
                                    onChange={handleSeriesChange}
                                  >
                                    <option value="">Purchase...</option>
                                    <option value="Purchase Indent">
                                      Purchase Indent
                                    </option>
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
                                    value={indentNo}
                                    readOnly
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
                                    onChange={(e) =>
                                      setCurrentDate(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setCurrentTime(e.target.value)
                                    }
                                  />
                                  {/* <input
  type="time"
  className="form-control"
  id="time"
  name="Time"
  value={formData.Time}
  onChange={handleChange}
/> */}

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
  name="Category"
  className="form-control"
  value={formData.Category}
  onChange={handleChange}
>
  <option value="">Office</option>
  <option value="factory">Factory</option>
  <option value="option2">Option 2</option>
</select>

                                </div>
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
                                          <select
  name="ItemNoCpcCode"
  value={itemRow.ItemNoCpcCode}
  onChange={handleChange}
  className="form-control"
>
  <option value="">Select Item</option>
  <option value="item1">Item 1</option>
  <option value="item2">Item 2</option>
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
  name="Description"
  value={itemRow.Description}
  onChange={handleChange}
  className="form-control"
  rows="2"
/>
                                          </td>
                                          <td>
                                          <input
                                              type="text"
                                              className="form-control"
                                            />

                                          </td>
                                          <td>
                                          <select
  id="sharp"
  name="Unit"
  className="form-control"
  value={itemRow.Unit}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="1">PCS</option>
                      <option value="2">KGS</option>
                      <option value="3">BOX</option>
                      <option value="3">LTR</option>
                      <option value="1">NOS</option>
                      <option value="2">SQFT</option>
                      <option value="3">MTR</option>
                      <option value="3">FOOT</option>
                      <option value="1">SQMTR</option>
                      <option value="2">PAIR</option>
                      <option value="3">BAG</option>
                      <option value="3">PACKET</option>
                      <option value="1">RIM</option>
                      <option value="2">SET</option>
                      <option value="3">MT</option>
                      <option value="3">PER DAY</option>
                      <option value="1">DOZEN</option>
                      <option value="2">JOB</option>
                      <option value="3">SQINCH</option>
                      <option value="3">LTR</option>
</select>

                                          </td>
                                          <td>
                                          <select
  name="MachineAndDepartment"
  value={itemRow.MachineAndDepartment}
  onChange={handleChange}
  className="form-control"
>
  <option value="">Select Item</option>
  <option value="item1">TATA Puchase</option>
  <option value="item2">Pencil Store</option>
</select>
                                          </td>
                                          <td>
                                          <input
  type="type"
  className="form-control"
  id="Qty"
  name="Qty"
  value={itemRow.Qty}
  onChange={handleChange}
/> 
                                          </td>
                                          <td>
                                            
                                            <select
  name="Type"
  value={itemRow.Type}
  onChange={handleChange}
  className="form-control"
>
  <option value="">Select Item</option>
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
  name="Remark"
  value={itemRow.Remark}
  onChange={handleChange}
  className="form-control"
  rows="2"
/>
                                          </td>
                                          <td>
                                          <textarea
  name="UseFor"
  value={itemRow.UseFor}
  onChange={handleChange}
  className="form-control"
  rows="2"
/>
                                          </td>
                                          <td>
                                          <textarea
  name="MoRef"
  value={itemRow.MoRef}
  onChange={handleChange}
  className="form-control"
  rows="2"
/>
                                          </td>
                                          <td>
                                          <input
  type="date"
  className="form-control"
  id="SchDate"
  name="SchDate"
  value={itemRow.SchDate}
  onChange={handleChange}
/> 
</td>
                                          <td>
                                          <button className="btn me-2" type="button" onClick={handleAddItem}>
  <FaPlus />
</button>

                                            <button className="btn" type="button" onClick={handleDeleteItem} >
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
                                  {newIndentTable.length > 0 && (
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
                                      {newIndentTable.map((item, index) => (
        <tr key={index}>
          <td>{item.ItemNoCpcCode}</td>
          <td></td>
          <td>{item.Description}</td>
          <td>{item.Unit}</td>
          <td>{item.MachineAndDepartment}</td>
          <td>{item.Qty}</td>
          <td>{item.Type}</td>
          <td>{item.Remark}</td>
          <td>{item.UseFor}</td>
          <td>{item.MoRef}</td>
          <td>{item.SchDate}</td>
          <td>
            <button className="btn btn-sm" onClick={() => handleDeleteItem(index)}>
              <FaTrash/>
            </button>
          </td>
        </tr>
      ))}
    </tbody>

                                    </table>
                                  )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="newindentbottom">
                          <div className="container-fluid">
                          <div className="row text-start align-items-center mb-3">
  <div className="col-md-1">
    <label htmlFor="CPCCode">CPC Code:</label>
  </div>
  <div className="col-md-2">
    <input
      type="text"
      className="form-control"
      id="CPCCode"
      name="CPCCode"
      value={formData.CPCCode}
      onChange={handleChange}
    />
  </div>

  <div className="col-md-1">
    <label htmlFor="WorkOrder">Work Order:</label>
  </div>
  <div className="col-md-2">
    <input
      type="text"
      className="form-control"
      id="WorkOrder"
      name="WorkOrder"
      value={formData.WorkOrder}
      onChange={handleChange}
    />
  </div>

  <div className="col-md-1">
    <label htmlFor="Remark">Remark:</label>
  </div>
  <div className="col-md-2">
    <input
      type="text"
      className="form-control"
      id="Remark"
      name="Remark"
      value={formData.Remark}
      onChange={handleChange}
     
    />
  </div>

  <div className="col-md-2">
    <button className="btn btn-primary w-100" onClick={handleSaveIndent}>
      Save Indent
    </button>
  </div>
</div>

                          </div>
                        </div>
                      </form>
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
