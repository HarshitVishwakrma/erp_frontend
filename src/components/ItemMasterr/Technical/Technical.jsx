import React, { useState,useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Technical.css";

const Technical = ({ onDataChange }) => {
  const [specifications, setSpecifications] = useState([]);
  const [newSpec, setNewSpec] = useState("");
  const [newParam, setNewParam] = useState("");
  const [editId, setEditId] = useState(null);
  const [editSpec, setEditSpec] = useState("");
  const [editParam, setEditParam] = useState("");

   // Update parent component whenever specifications change
   useEffect(() => {
    if (onDataChange) {
      onDataChange(specifications)
    }
  }, [specifications, onDataChange])


  const handleSave = () => {
    if (!newSpec.trim()) {
      toast.error("Specification is required!");
      return;
    }
  
    const newEntry = {
      id: Date.now(), // unique ID
      Specification: newSpec,
      Parameter: newParam,
    };
  
    setSpecifications([...specifications, newEntry]);
    toast.success("Specification added!");
    setNewSpec("");
    setNewParam("");
  };
  


 
  const handleEdit = (id) => {
    const updatedSpecs = specifications.map((spec) =>
      spec.id === id ? { ...spec, Specification: editSpec, Parameter: editParam } : spec
    );
  
    setSpecifications(updatedSpecs);
    toast.success("Specification updated!");
    setEditId(null);
    setEditSpec("");
    setEditParam("");
  };
  const handleDelete = (id) => {
    const updatedSpecs = specifications.filter((spec) => spec.id !== id);
    setSpecifications(updatedSpecs);
    toast.success("Specification deleted!");
  };
    
  const handleClear = () => {
    setNewSpec("");
    setNewParam("");
    setEditId(null);
    setEditSpec("");
    setEditParam("");
  };

  const handleEditMode = (spec) => {
    setEditId(spec.id);
    setEditSpec(spec.Specification);
    setEditParam(spec.Parameter);
  };


  return (
    <div className="technical">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-md-2">
            <p style={{ color: "blue" }}>Technical Specification</p>
          </div>
          <div className="col-md-4 text-end">
            <button
              className="tech-btn btn btn-secondary"
              onClick={handleClear}
            >
              Clear Tech. Specifications
            </button>
          </div>
          <div className="col-md-6">
            <button className="tech-btn btn btn-secondary">
              Get Last Tech. Specification
            </button>
          </div>
        </div>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-md-6 mb-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Specification<span className="text-danger">*</span></th>
                  <th scope="col">Parameter</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter specification"
                      value={newSpec}
                      onChange={(e) => setNewSpec(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter parameter"
                      value={newParam}
                      onChange={(e) => setNewParam(e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="btn-tech" onClick={handleSave}>
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6 mb-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">A</th>
                  <th scope="col">B</th>
                  <th scope="col">C</th>
                  <th scope="col">D</th>
                  <th scope="col">E</th>
                  <th scope="col">F</th>
                  <th scope="col">G</th>
                  <th scope="col">H</th>
                  <th scope="col">Capacity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="A"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="B"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="C"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="D"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="E"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="F"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="G"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="H"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Capacity"
                      style={{ padding: "5px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row" style={{ marginTop: "80px" }}>
          <div className="col-md-8">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">Parameter</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec) => (
                  <tr key={spec.id}>
                    <td>
                      {editId === spec.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editSpec}
                          onChange={(e) => setEditSpec(e.target.value)}
                        />
                      ) : (
                        spec.Specification
                      )}
                    </td>
                    <td>
                      {editId === spec.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editParam}
                          onChange={(e) => setEditParam(e.target.value)}
                        />
                      ) : (
                        spec.Parameter
                      )}
                    </td>
                    <td>
                      {editId === spec.id ? (
                        <button
                          className="btn-tech"
                          onClick={() => handleEdit(spec.id)}
                        >
                          <FaSave />
                        </button>
                      ) : (
                        <button
                          className="btn-tech"
                          onClick={() => handleEditMode(spec)}
                        >
                          <FaEdit />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-tech"
                        onClick={() => handleDelete(spec.id)}
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
      </div>
      
    </div>
  );
};
export default Technical;

