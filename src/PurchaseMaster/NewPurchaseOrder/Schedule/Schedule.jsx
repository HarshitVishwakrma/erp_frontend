"use client"

import React, { useState, useEffect } from "react"

import "./Schedule.css"

const Schedule = ({ updateFormData, itemDetails = [] }) => {
  const [scheduleLine, setScheduleLine] = useState([])

  // ✅ Update schedule when `itemDetails` changes
  useEffect(() => {
    if (itemDetails.length > 0) {
      setScheduleLine((prevSchedule) => {
        const updatedSchedule = itemDetails.map((item, index) => {
          const existingItem = prevSchedule.find((prev) => prev.ItemCode === item.Item)

          return {
            id: index + 1,
            ItemCode: (item.Item || "").substring(0, 30).trim(),
            Description: item.ItemDescription || "",
            TotalQty: item.Qty || 0,
            // Initialize dates and quantities arrays if they don't exist
            Dates: existingItem?.Dates || Array(10).fill(""),
            Quantities: existingItem?.Quantities || Array(10).fill(""),
          }
        })

        updateFormData("Schedule_Line", updatedSchedule)
        return updatedSchedule
      })
    }
  }, [itemDetails, updateFormData])

  // ✅ Handle date and quantity changes
  const handleInputChange = (rowIndex, field, value, dateIndex) => {
    setScheduleLine((prevSchedule) => {
      const updatedSchedule = prevSchedule.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [field]: row[field].map((val, i) => (i === dateIndex ? value : val)),
          }
        }
        return row
      })

      updateFormData("Schedule_Line", updatedSchedule)
      return updatedSchedule
    })
  }

  return (
    <div className="scheduleline">
      <div className="container-fluid">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Item Code</th>
                <th>Description</th>
                <th>Total Qty</th>
                {Array(10)
                  .fill()
                  .map((_, index) => (
                    <React.Fragment key={index}>
                      <th>Date {index + 1}</th>
                      <th>Qty {index + 1}</th>
                    </React.Fragment>
                  ))}
              </tr>
            </thead>
            <tbody>
              {scheduleLine.length > 0 ? (
                scheduleLine.map((row, rowIndex) => (
                  <tr key={row.id}>
                    <td>{rowIndex + 1}</td>
                    <td>{row.ItemCode}</td>
                    <td>{row.Description}</td>
                    <td>{row.TotalQty}</td>
                    {Array(10)
                      .fill()
                      .map((_, index) => (
                        <React.Fragment key={index}>
                          <td>
                            <input
                              type="date"
                              className="form-control"
                              value={row.Dates[index]}
                              onChange={(e) => handleInputChange(rowIndex, "Dates", e.target.value, index)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={row.Quantities[index]}
                              onChange={(e) => handleInputChange(rowIndex, "Quantities", e.target.value, index)}
                            />
                          </td>
                        </React.Fragment>
                      ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="22">No schedule data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Schedule
