import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./ErpSetting.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUsers ,updateUser, deleteUser } from "../../Service/Erpsetting.jsx";

const ErpSetting = () => {
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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData(user);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUser(editingUser, editData);
      setUsers(users.map((user) => (user.id === editingUser ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async (id) => {
   
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="erpsetting">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="Main-NavBar">
              <NavBar toggleSideNav={toggleSideNav} />
              <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
              <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>
                <div className="user-management">
                  <div className="WorkOrderEntry-header mb-4">
                    <div className="row">
                      <div className="col-md-2">
                        <h5 className="header-title text-start">
                          User Management
                        </h5>
                      </div>
                      <div className="col-md-10 text-end">
                        <Link to="/UserConfiguration" className="btn ">Add New</Link>
                        <Link  to="/DisableUserList" className="btn ">Disable User List</Link>
                        <button className="btn ">Export Excel</button>
                      </div>
                    </div>
                  </div>

                  <div className="header-section mb-4">
                    <div className="row align-items-start mt-2">
                      <div className="col-md-2">
                        <label className="form-check-label mt-2">
                          <input type="checkbox" className="form-check-input" />
                          Include User Name Like
                        </label>
                      </div>
                      <div className="col-md-2">
                        <input
                          type="text"
                          id="userNameInput"
                          className="form-control"
                          placeholder="User Name Like"
                        />
                      </div>
                      <div className="col-md-1">
                        <label htmlFor="seriesSelect" className="form-label mt-2">
                          Plant:
                        </label>
                      </div>
                      <div className="col-md-2">
                        <select id="seriesSelect" className="form-select">
                          <option value="">Select Plant</option>
                          <option value="Produlink">Produlink</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>
                      <div className="col-md-2 mt-2">
                        <button className="btn">Search</button>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
      <table className="table table-bordered table-hover user-list-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Plant</th>
            <th>Department</th>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Email ID</th>
            <th>Mobile No</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={editData.PlantName}
                    onChange={(e) =>
                      setEditData({ ...editData, PlantName: e.target.value })
                    }
                  />
                ) : (
                  user.PlantName
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={editData.Department}
                    onChange={(e) =>
                      setEditData({ ...editData, Department: e.target.value })
                    }
                  />
                ) : (
                  user.Department
                )}
              </td>
              <td>{user.FullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.MobileNo}</td>
              <td>
                {editingUser === user.id ? (
                  <button className="btn btn-sm btn-success" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button
                    className="btn"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash />
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

export default ErpSetting;
