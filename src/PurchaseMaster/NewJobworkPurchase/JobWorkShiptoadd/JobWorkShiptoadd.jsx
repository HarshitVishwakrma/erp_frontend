"use client"

import { useState, useEffect } from "react"
import "./JobWorkShiptoadd.css"
import { ToastContainer } from "react-toastify"

const JobWorkShiptoadd = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    ShiptoAdd: "",
    ContactDetail: "",
    ProjectName: "",
    CRName: "",
    SoNo: "",
  })

  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setFormData(data[0] || formData)
    }
  }, [data, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    updateData([newFormData]) // Update parent state as array
    console.log("Ship to add data updated:", [newFormData]) // Debug log
  }

  const handleClear = () => {
    const clearedData = {
      ShiptoAdd: "",
      ContactDetail: "",
      ProjectName: "",
      CRName: "",
      SoNo: "",
    }
    setFormData(clearedData)
    updateData([clearedData])
  }

  return (
    <div className="jobworkshiptoadd">
      <div className="container-fluid">
        <div className="row text-start">
          <div className="col-md-12">
            <div className="row mb-3">
              <div className="col-md-1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shipToAdd"
                    name="ShiptoAdd"
                    checked={formData.ShiptoAdd !== ""}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-check-label" htmlFor="shipToAdd">
                    Ship to Add
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input Field"
                    name="ShiptoAdd"
                    value={formData.ShiptoAdd}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label htmlFor="shipToContact">Ship to Contact Details:</label>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <textarea
                    id="shipToContact"
                    className="form-control"
                    rows="3"
                    name="ContactDetail"
                    value={formData.ContactDetail}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <label htmlFor="reference">Project Name:</label>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <textarea
                    id="reference"
                    className="form-control"
                    rows="3"
                    name="ProjectName"
                    value={formData.ProjectName}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <label htmlFor="reference">CRName:</label>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <textarea
                    id="reference"
                    className="form-control"
                    rows="3"
                    name="CRName"
                    value={formData.CRName}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <label htmlFor="SoNo">SoNo:</label>
                </div>
              </div>
              <div className="col-md-1">
                <div className="form-group">
                  <textarea
                    id="SoNo"
                    className="form-control"
                    rows="3"
                    name="SoNo"
                    value={formData.SoNo}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row text-end">
              <div className="col-md-11"></div>
              <div className="col-md-1">
                <button className="btn " onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add this to display toast messages */}
    </div>
  )
}

export default JobWorkShiptoadd
