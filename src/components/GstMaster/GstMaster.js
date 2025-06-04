import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import { Link } from "react-router-dom";
import {
  fetchGstMasterRecords,
  createGstMasterRecord,
  updateGstMasterRecord,
  deleteGstMasterRecord,
} from "../../Service/Api.jsx";
import "./GstMaster.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GstMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    HSN_SAC_Code: "",
    HSN_SAC_Desc: "",
    CGST: "",
    SGST: "",
    IGST: "",
    UTGST: "",
    export_SGST: "",
    export_CGST: "",
    export_IGST: "",
    Cess: "",
    Is_Exempt: "no",
    Type: "type1",
  });
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await fetchGstMasterRecords();
      setRecords(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
      toast.error("Error fetching records");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.HSN_SAC_Code) {
      newErrors.HSN_SAC_Code = "This field is required";
    }
    if (!formData.HSN_SAC_Desc) {
      newErrors.HSN_SAC_Desc = "This field is required";
    }

    if (!formData.CGST) {
      newErrors.CGST = "This field is required";
    }
    if (!formData.SGST) {
      newErrors.SGST = "This field is required";
    }
    if (!formData.IGST) {
      newErrors.IGST = "This field is required";
    }
    if (!formData.UTGST) {
      newErrors.UTGST = "This field is required";
    }
    if (!formData.export_SGST) {
      newErrors.export_SGST = "This field is required";
    }
    if (!formData.export_CGST) {
      newErrors.export_CGST = "This field is required";
    }
    if (!formData.export_IGST) {
      newErrors.export_IGST = "This field is required";
    }
    if (!formData.Cess) {
      newErrors.Cess = "This field is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editId) {
        await updateGstMasterRecord(editId, formData);
        setEditId(null);
        toast.success("Record updated successfully");
      } else {
        await createGstMasterRecord(formData);
        toast.success("Record created successfully");
      }
      setFormData({
        id: "",
        HSN_SAC_Code: "",
        HSN_SAC_Desc: "",
        CGST: "",
        SGST: "",
        IGST: "",
        UTGST: "",
        export_SGST: "",
        export_CGST: "",
        export_IGST: "",
        Cess: "",
        Is_Exempt: "no",
        Type: "type1",
      });
      setErrors({});
      fetchRecords();
    } catch (error) {
      console.error(error.message);
      toast.error("Error deleting record");
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditId(record.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGstMasterRecord(id);
      fetchRecords();
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error(error.message);
      toast.error("Error deleting record");
    }
  };

  return (
    <div className="GstMaster">
      <ToastContainer />
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
                <div className="GstMaster1 mt-5">
                  <div className="GstMasterupper-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className="header-title">GST Rate Master</h5>
                      </div>
                      <div className="col-md-8 text-end">
                        <Link to="/task-master" className="btn">
                          Tax Code Master
                        </Link>
                        <Link to="/Cut-wise" className="btn">
                          Cust-Wise GST Master
                        </Link>
                        <Link to="/Customer-Item-Wise-Gst" className="btn">
                          Cut-Wise GST Rate - Excel Upload
                        </Link>
                        <Link to="/#" className="btn">
                          Export To Excel
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="GstMasterMain mt-5">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>
                                    HSN/SAC Code{" "}
                                    <span className="text-danger">*</span>
                                  </th>
                                  <th>
                                    HSN/SAC Desc.
                                    <span className="text-danger">*</span>
                                  </th>
                                  <th>Domestic</th>
                                  <th>Export</th>
                                  <th>Action</th>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="HSN_SAC_Code"
                                      value={formData.HSN_SAC_Code}
                                      onChange={handleInputChange}
                                      placeholder="Tariff code"
                                    />
                                    {errors.HSN_SAC_Code && (
                                      <div className="text-danger">
                                        {errors.HSN_SAC_Code}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <textarea
                                      className="form-control"
                                      name="HSN_SAC_Desc"
                                      value={formData.HSN_SAC_Desc}
                                      onChange={handleInputChange}
                                    ></textarea>
                                    {errors.HSN_SAC_Desc && (
                                      <div className="text-danger">
                                        {errors.HSN_SAC_Desc}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <thead>
                                      <tr>
                                        <th>
                                          CGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>
                                          SGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>
                                          IGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>
                                          UTGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="CGST"
                                            value={formData.CGST}
                                            onChange={handleInputChange}
                                            placeholder="CGST (%)"
                                          />
                                          {errors.CGST && (
                                            <div className="text-danger">
                                              {errors.CGST}
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="SGST"
                                            value={formData.SGST}
                                            onChange={handleInputChange}
                                            placeholder="SGST (%)"
                                          />
                                          {errors.SGST && (
                                            <div className="text-danger">
                                              {errors.SGST}
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="IGST"
                                            value={formData.IGST}
                                            onChange={handleInputChange}
                                            placeholder="IGST (%)"
                                          />
                                          {errors.IGST && (
                                            <div className="text-danger">
                                              {errors.IGST}
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="UTGST"
                                            value={formData.UTGST}
                                            onChange={handleInputChange}
                                            placeholder="UTGST (%)"
                                          />
                                          {errors.UTGST && (
                                            <div className="text-danger">
                                              {errors.UTGST}
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </td>
                                  <td>
                                    <thead>
                                      <tr>
                                        <th>
                                          SGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>
                                          CGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>
                                          IGST (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>
                                          CESS (%)
                                          <span className="text-danger">*</span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="export_SGST"
                                            value={formData.export_SGST}
                                            onChange={handleInputChange}
                                            placeholder="SGST (%)"
                                          />
                                          {errors.export_SGST && (
                                            <div className="text-danger">
                                              {errors.export_SGST}
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="export_CGST"
                                            value={formData.export_CGST}
                                            onChange={handleInputChange}
                                            placeholder="CGST (%)"
                                          />
                                          {errors.export_CGST && (
                                            <div className="text-danger">
                                              {errors.export_CGST}
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="export_IGST"
                                            value={formData.export_IGST}
                                            onChange={handleInputChange}
                                            placeholder="IGST (%)"
                                          />
                                          {errors.export_IGST && (
                                            <div className="text-danger">
                                              {errors.export_IGST}
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            className="form-control mb-2"
                                            name="Cess"
                                            value={formData.Cess}
                                            onChange={handleInputChange}
                                            placeholder="Cess (%)"
                                          />
                                          {errors.Cess && (
                                            <div className="text-danger">
                                              {errors.Cess}
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </td>

                                  <td>
                                    <thead>
                                      <tr>
                                        <th>Is Exempt</th>
                                        <th>Type</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <select
                                            className="form-control"
                                            name="Is_Exempt"
                                            value={formData.Is_Exempt}
                                            onChange={handleInputChange}
                                          >
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                          </select>
                                        </td>
                                        <td>
                                          <select
                                            className="form-control"
                                            style={{ width: "75px" }}
                                            name="Type"
                                            value={formData.Type}
                                            onChange={handleInputChange}
                                          >
                                            <option value="HSN">HSN</option>
                                            <option value="SAC">SAC</option>
                                          </select>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </td>

                                  <td>
                                    <button
                                      className="btn-gst"
                                      onClick={handleSave}
                                    >
                                      Save
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="GstMastertable">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sr</th>
                                    <th>HSN Code</th>
                                    <th>HSN Code Desc.</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>IGST</th>
                                    <th>UTGST</th>
                                    <th>Export CGST</th>
                                    <th>Export SGST</th>
                                    <th>Export IGST</th>
                                    <th>Cess</th>
                                    <th>DBK SrNo</th>
                                    <th>Is Exempt</th>
                                    <th>Type</th>
                                    <th>User</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {records.map((record, index) => (
                                    <tr key={record.id}>
                                      <td>{index + 1}</td>
                                      <td>{record.HSN_SAC_Code}</td>

                                      <td>{record.HSN_SAC_Desc}</td>
                                      <td>{record.CGST}</td>
                                      <td>{record.SGST}</td>
                                      <td>{record.IGST}</td>
                                      <td>{record.UTGST}</td>
                                      <td>{record.export_CGST}</td>
                                      <td>{record.export_SGST}</td>
                                      <td>{record.export_IGST}</td>
                                      <td>{record.Cess}</td>
                                      <td>{record.DBK_SrNo}</td>
                                      <td>{record.Is_Exempt}</td>
                                      <td>{record.Type}</td>
                                      <td>{record.User}</td>
                                      <td>
                                        <button
                                          className="sgstbtn"
                                          onClick={() => handleEdit(record)}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                          className="sgstbtn"
                                          onClick={() =>
                                            handleDelete(record.id)
                                          }
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                        <button className="sgstbtn">
                                          <i className="fas fa-info-circle"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ color: "blue", padding: "10px" }}
                  >
                    <div className="col-md-12 text-start">
                      <p>Total Records: {records.length}</p>
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

export default GstMaster;
