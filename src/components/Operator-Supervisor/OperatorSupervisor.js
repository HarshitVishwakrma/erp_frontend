import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./Operator-Supervisor.css";
import { Link } from "react-router-dom";
import {  getOperatorList,
  getOperatorById,
  deleteOperator, } from "../../Service/Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const OperatorSupervisor = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);


 const [operatorList, setOperatorList] = useState([]);
  const [, setFormData] = useState({});
  const [, setEditId] = useState(null);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const data = await getOperatorList();
      setOperatorList(data.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error("Error fetching data", err);
      toast.error("Failed to fetch data");
    }
  };

const handleEdit = async (id) => {
  try {
    const data = await getOperatorById(id);
    setFormData(data);
    setEditId(id);
    // You should store the data to localStorage or global state if needed
    localStorage.setItem("editOperator", JSON.stringify(data));
    
    navigate("/Supervisor");
  } catch (err) {
    console.error("Error fetching operator by ID", err);
    toast.error("Failed to load data for editing");
  }
};


  const handleDelete = async (id) => {
   
    try {
      await deleteOperator(id);
      toast.success("Deleted successfully");
      fetchOperators(); // Refresh list
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete entry");
    }
  };

  // Pagination calculation
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = operatorList.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(operatorList.length / recordsPerPage);



  return (
    <div className="OperatorSupervisor">
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
                <div className="OperatorSupervisor1">
                  <div className="Operator mt-5">
                  <div className="Operator-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <h5 className="header-title">
                            Operator / Supervisor / Staff
                          </h5>
                        </div>
                        <div className="col-md-7 col-12 text-md-end text-start mt-3 mt-md-0">
                          <Link to={"/Supervisor"} className="btn me-2">
                            Add New Operator/Supervisor
                          </Link>
                          <Link
                            to={"/Department-Head"}
                            className="btn me-2"
                          >
                            Department Head
                          </Link>
                          <Link className="btn">Export Report</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="OperatorMain mt-5">
                    <div className="container-fluid">
                      <div className="row gy-3 text-start">
                        <div className="col-md-1 col-6">
                          <label htmlFor="Produlink" className="form-label">Plant</label>
                          <select id="Produlink" className="form-select" style={{marginTop:"-1px"}}>
                            <option value="">Produlink</option>
                            {/* Add options here */}
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkLabel"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkLabel"
                            >
                              Name
                            </label>
                          </div>
                          <input
                            type="text"
                            id="description"
                            className="form-control"
                            placeholder="Operator Name"
                          />
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <select id="contractor" className="form-select" style={{marginTop:"-1px"}}>
                            <option value="">All</option>
                            <option value="">All</option>
                            {/* Add options here */}
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="contractor" className="form-label">
                            Contractor
                          </label>
                          <select id="contractor" className="form-select" style={{marginTop:"-1px"}}>
                            <option value="">All</option>
                            <option value="Company">Company</option>
                            <option value="SAINATH JADHAV">
                              SAINATH JADHAV
                            </option>
                            <option value="MOMIN PATEL">MOMIN PATEL</option>
                            <option value="QUALITY CONTROL">
                              QUALITY CONTROL
                            </option>
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="type" className="form-label">
                            Type
                          </label>
                          <select id="type" className="form-select" style={{marginTop:"-1px"}}>
                            <option value="">All</option>
                            <option value="FID">FID</option>{" "}
                            <option value="INSPECTOR">INSPECTOR</option>{" "}
                            <option value="MACHINING">MACHINING</option>{" "}
                            <option value="NIRAJ">NIRAJ</option>{" "}
                            <option value="QA SUPERWISER">QA SUPERWISER</option>{" "}
                            <option value="STORE">STORE</option>
                          </select>
                        </div>
                        <div className="col-md-2 col-6">
                          <label htmlFor="status" className="form-label">
                            Status
                          </label>
                          <select id="status" className="form-select" style={{marginTop:"-1px"}}>
                            <option>All</option>
                            <option value="Status1">Status1</option>
                            <option value="Status2">Status2</option>
                          </select>
                        </div>
                        <div className="col-md-1 col-12">
                          
                          <button className="btn" style={{marginTop:"31px"}}>
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Operatortable mt-5">
                    <div className="container-fluid">
                      <div className="row gy-3 text-start">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Sr.</th>
                               
                                <th>Name</th>
                                <th>Type</th>
                                 <th>Department</th>
                                <th>Code</th>
                                <th>Designation4</th>
                                <th>Contact</th>
                                <th>DailyWorkHours</th>
                                <th>Contractor</th>
                               
                              
                                 <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                     <tbody>
   {currentRecords.map((item, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.Name}</td>
      <td>{item.Type}</td>
      <td>{item.Department}</td>
      <td>{item.Code}</td>
      <td>{item.Designation}</td>
      <td>{item.Contact_No}</td>
      <td>{item.DailyWorkHours}</td>
      <td>{item.Contractor}</td>

     
      <td>
        <FaEdit  onClick={() => handleEdit(item.id)}/>
        
      </td>
      <td>
        <FaTrash  onClick={() => handleDelete(item.id)}/>
        
      </td>
    </tr>
  ))}
</tbody>

                          </table>
                        </div>
                      </div>
                       
                    </div>
                  </div>
               {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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

export default OperatorSupervisor;
