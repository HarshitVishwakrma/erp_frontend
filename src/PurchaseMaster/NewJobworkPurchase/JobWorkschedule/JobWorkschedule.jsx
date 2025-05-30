"use client"

import { useState, useEffect } from "react"
import "./Jobworkschedule.css"

const JobWorkschedule = ({ data, updateData }) => {
  const [scheduleData, setScheduleData] = useState({
    ItemCode: "",
    Description: "",
    TotalQty: "",
    Date1: "",
    Qty1: "",
    Date2: "",
    Qty2: "",
    Date3: "",
    Qty3: "",
    Date4: "",
    Qty4: "",
    Date5: "",
    Qty5: "",
    Date6: "",
    Qty6: "",
  })

  // Sync with parent data
  useEffect(() => {
    console.log("Schedule component received data:", data)
    if (data && Array.isArray(data) && data.length > 0) {
      const newData = data[0]
      if (newData && Object.keys(newData).length > 0) {
        console.log("Setting Schedule data:", newData)
        setScheduleData(newData)
      }
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newScheduleData = { ...scheduleData, [name]: value }
    setScheduleData(newScheduleData)
    updateData([newScheduleData]) // Update parent state as array
    console.log("Schedule data updated:", [newScheduleData]) // Debug log
  }
  return (
    <div className="jobworkscheduleline">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-start">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="autoCalculate" />
              <label className="form-check-label" htmlFor="autoCalculate">
                Auto Calculate jobworkSchedule Line On Report:
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" id="yes" name="autoCalculate" />
              <label className="form-check-label" htmlFor="yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" id="no" name="autoCalculate" />
              <label className="form-check-label" htmlFor="no">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="jobworkscheduletable">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Item Code</th>
                      <th>Description</th>
                      <th>Total Qty</th>
                      <th>Date 1</th>
                      <th>Qty 1</th>
                      <th>Date 2</th>
                      <th>Qty 2</th>
                      <th>Date 3</th>
                      <th>Qty 3</th>
                      <th>Date 4</th>
                      <th>Qty 4</th>
                      <th>Date 5</th>
                      <th>Qty 5</th>
                      <th>Date 6</th>
                      <th>Qty 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Item Code"
                          name="ItemCode"
                          value={scheduleData.ItemCode}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          name="Description"
                          value={scheduleData.Description}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Total Qty"
                          name="TotalQty"
                          value={scheduleData.TotalQty}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="Date1"
                          value={scheduleData.Date1}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Qty 1"
                          name="Qty1"
                          value={scheduleData.Qty1}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="Date2"
                          value={scheduleData.Date2}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Qty 2"
                          name="Qty2"
                          value={scheduleData.Qty2}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="Date3"
                          value={scheduleData.Date3}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Qty 3"
                          name="Qty3"
                          value={scheduleData.Qty3}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="Date4"
                          value={scheduleData.Date4}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Qty 4"
                          name="Qty4"
                          value={scheduleData.Qty4}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="Date5"
                          value={scheduleData.Date5}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Qty 5"
                          name="Qty5"
                          value={scheduleData.Qty5}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="Date6"
                          value={scheduleData.Date6}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Qty 6"
                          name="Qty6"
                          value={scheduleData.Qty6}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobWorkschedule
