import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./WorkCenterMaster.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getWorkCenters ,updateWorkCenter,deleteWorkCenter} from "../../Service/Api.jsx";
import AddNewCard from "./AddNewCard/AddNewCard.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import WorkCenterType from "./WorkCenterType.jsx";
const WorkCenterMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    // Logic to fetch records can be added here, and then setRecords with the fetched data
  }, []);


  //   card
  const [isCardVisible, setCardVisible] = useState(false);

  const [showNewCardWork, setShowNewCardWork] = useState(false);

  const handleAddNewClick = () => {
    setCardVisible(true);
  };

  const handleCloseCard = () => {
    setCardVisible(false);
  };

  

  const handleNewButtonWork = () => {
    setShowNewCardWork(!showNewCardWork);
  };





  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [editId, setEditId] = useState(null);
const [editData, setEditData] = useState({});


  useEffect(() => {
    fetchData();
  }, []);
const fetchData = async () => {
  try {
    const result = await getWorkCenters();
    setData(result);
  } catch (err) {
    setError("Failed to fetch data");
    toast.error("Error fetching data!");
  } finally {
    setLoading(false);
  }
};

  // Handle Edit
const handleEdit = (item) => {
  setEditId(item.id);
  setEditData({ ...item }); // preload row data
};


  // Handle Delete
const handleDelete = async (id) => {
  try {
    await deleteWorkCenter(id);
    toast.success("Deleted successfully!");
    fetchData();
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Delete failed!");
  }
};


const handleSave = async () => {
  try {
    await updateWorkCenter(editId, editData);
    setEditId(null);
    setEditData({});
    toast.success("Updated successfully!");
    fetchData();
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Update failed!");
  }
};


const handleCancel = () => {
  setEditId(null);
  setEditData({});
};



const handleChange = (e) => {
  const { name, value } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  
  return (
    <div className="work-center">
     

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
                <div className="workcentermaster">
                  <div className="workmain mt-5">
                    <div className="workmain-header mb-4 text-start">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                        <h5 className="header-title">Work Center Master</h5>
                        </div>
                        <div className="col-md-6 text-md-end text-start mt-2 mt-md-0">
                          <button
                            className="btn me-2"
                            onClick={handleAddNewClick}
                          >
                            Add New
                          </button>
                          <button
                            className="btn  me-2"
                            onClick={handleNewButtonWork}
                          >
                            Work Center Type
                          </button>
                          <button className="btn">Export Report</button>
                        </div>
                      </div>
                    </div>
                    {isCardVisible && (
                      <div className="overlay-workcenter">
                        <div className="card-work">
                          <div className="card-header-work">
                            <h5>Add New Work Center</h5>
                            <button
                              className="btn-close"
                              onClick={handleCloseCard}
                            >
                              ×
                            </button>
                          </div>
                          <AddNewCard/>
                         
                        </div>
                      </div>
                    )}
                {showNewCardWork && (
<WorkCenterType handleClose={handleNewButtonWork} />
)}

                  </div>
                  <div className="centerMain mt-5">
                    <ToastContainer position="top-right" autoClose={3000} />
                    <div className="container-fluid">
                      <div className="row text-start centerselect">
                        <div className="col-md-1 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="selectPlant"
                            className="col-form-label"
                          >
                            Select Plant
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <select
                            id="selectPlant"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Produlink</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-md-2 col-sm-3 mb-3 mb-sm-0">
                          <label
                            htmlFor="machineType"
                            className="col-form-label"
                          >
                            Machine Type
                          </label>
                        </div>
                        <div className="col-md-3 col-sm-9 mb-3 mb-sm-0">
                          <select
                            id="machineType"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>ALL</option>
                            <option value="1">CENTERLESS GRINDING</option>
                            <option value="2">CNC</option>
                            <option value="3">DRILLING</option>
                            <option value="1">GRINDER</option>
                            <option value="2">INDUCTION</option>
                            <option value="3">LATHE</option>
                            <option value="1">MANUAL</option>
                            <option value="2">MILLING</option>
                            <option value="3">PRESS</option>
                            <option value="1">SECOND OPERATION</option>
                            <option value="2">SPM</option>
                            <option value="3">TAPPING</option>
                            <option value="1">THREAD ROLLING</option>
                            <option value="2">TROUB</option>
                            <option value="3">VMC</option>
                          </select>
                        </div>
                        <div className="col-md-3 col-sm-12 text-sm-start mt-2">
                          <button className="btn">
                            <i className="bi bi-search"></i> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="workTable mt-5">
                    <div className="container-fluid">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="table-primary">
                            <tr>
                              <th scope="col">Sr</th>
                              <th scope="col">Plant</th>
                              <th scope="col">Work Center Code</th>
                              <th scope="col">Work Center Name</th>
                              <th scope="col">Machine Type</th>
                              <th scope="col">Type Group</th>
                              <th scope="col">Category</th>
                              <th scope="col">W.Hr.Rate</th>
                              <th scope="col">PPM</th>
                              
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                              <th scope="col">Doc</th>
                            </tr>
                          </thead>
                        <tbody>
  {data.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>
        {editId === item.id ? (
          <input name="Plant" value={editData.Plant} onChange={handleChange} />
        ) : (
          item.Plant
        )}
      </td>
      <td>
        {editId === item.id ? (
          <input name="WorkCenterCode" value={editData.WorkCenterCode} onChange={handleChange} />
        ) : (
          item.WorkCenterCode
        )}
      </td>
      <td>
        {editId === item.id ? (
          <input name="WorkCenterName" value={editData.WorkCenterName} onChange={handleChange} />
        ) : (
          item.WorkCenterName
        )}
      </td>
      <td>
        {editId === item.id ? (
          <input name="WorkCenterType" value={editData.WorkCenterType} onChange={handleChange} />
        ) : (
          item.WorkCenterType
        )}
      </td>
      <td>{editId === item.id ? (
          <input name="TypeGroup" value={editData.TypeGroup} onChange={handleChange} />
        ) : (
          item.TypeGroup
        )}</td>
      <td>
        {editId === item.id ? (
          <input name="Category" value={editData.Category} onChange={handleChange} />
        ) : (
          item.Category
        )}
      </td>
      <td>
        {editId === item.id ? (
          <input name="Mhr_Rate" value={editData.Mhr_Rate} onChange={handleChange} />
        ) : (
          item.Mhr_Rate
        )}
      </td>
      <td>
        {editId === item.id ? (
          <input name="PPM" value={editData.PPM} onChange={handleChange} />
        ) : (
          item.PPM
        )}
      </td>
      
      <td>
        {editId === item.id ? (
          <>
            <button className="btn" onClick={handleSave}>Save</button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="btn" onClick={() => handleEdit(item)}><FaEdit /></button>
        )}
      </td>
      <td>
        <button className="btn" onClick={() => handleDelete(item.id)}><FaTrash /></button>
      </td>
      <td><button className="btn">Doc</button></td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
        </div>
      </div>
      <div className="record-count text-start" style={{ color: "blue", padding: "10px" }}>
        Total Records: {data.length}
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

export default WorkCenterMaster;
