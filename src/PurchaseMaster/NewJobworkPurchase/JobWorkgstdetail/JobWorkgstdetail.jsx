"use client"

import { useState, useEffect } from "react"
import "./JobWorkgstdetail.css"

const JobWorkgstdetail = ({ data, updateData }) => {
  const [gstData, setGstData] = useState({
    ItemCode: "",
    SAC: "",
    Rate: "",
    Qty: "",
    SubTotal: "",
    Discount: "",
    DiscountAmt: "",
    Packing: "",
    Transport: "",
    AssValue: "",
    CGST: "",
    CGSTAmt: "",
    SGST: "",
    SGSTAmt: "",
    IGST: "",
    IGSTAmt: "",
    UTGST: "",
    UTGSTAmt: "",
    Total: "",
    TOC_AssableValue: "",
    PackCharges: "",
    TransportCharges: "",
    Insurance: "",
    InstallationCharges: "",
  })

  // Sync with parent data
  useEffect(() => {
    console.log("GST component received data:", data)
    if (data && Array.isArray(data) && data.length > 0) {
      const newData = data[0]
      if (newData && Object.keys(newData).length > 0) {
        console.log("Setting GST data:", newData)
        setGstData(newData)
      }
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newGstData = { ...gstData, [name]: value }

    // Auto-calculate values when certain fields change
    if (["Rate", "Qty", "Discount", "CGST", "SGST", "IGST"].includes(name)) {
      const rate = Number.parseFloat(name === "Rate" ? value : newGstData.Rate) || 0
      const qty = Number.parseFloat(name === "Qty" ? value : newGstData.Qty) || 0
      const subtotal = rate * qty
      newGstData.SubTotal = subtotal.toString()

      const discPercent = Number.parseFloat(name === "Discount" ? value : newGstData.Discount) || 0
      const discAmount = (subtotal * discPercent) / 100
      newGstData.DiscountAmt = discAmount.toString()
      const assValue = subtotal - discAmount
      newGstData.AssValue = assValue.toString()

      // Calculate taxes
      const cgstPercent = Number.parseFloat(name === "CGST" ? value : newGstData.CGST) || 0
      const sgstPercent = Number.parseFloat(name === "SGST" ? value : newGstData.SGST) || 0
      const igstPercent = Number.parseFloat(name === "IGST" ? value : newGstData.IGST) || 0

      const cgstAmount = (assValue * cgstPercent) / 100
      const sgstAmount = (assValue * sgstPercent) / 100
      const igstAmount = (assValue * igstPercent) / 100

      newGstData.CGSTAmt = cgstAmount.toString()
      newGstData.SGSTAmt = sgstAmount.toString()
      newGstData.IGSTAmt = igstAmount.toString()

      const total = assValue + cgstAmount + sgstAmount + igstAmount
      newGstData.Total = total.toString()
    }

    setGstData(newGstData)
    updateData([newGstData]) // Update parent state as array
  }

  return (
    <div className="JobworkGStDetails">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>SAC</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Sub Total</th>
                  <th>Discount</th>
                  <th>DiscountAmt</th>
                  <th>Packing</th>
                  <th>Transport</th>
                  <th>Ass Value</th>
                  <th>CGST</th>
                  <th>CGST Amt</th>
                  <th>SGST</th>
                  <th>SGST Amt</th>
                  <th>IGST</th>
                  <th>IGST Amt</th>
                  <th>UTGST</th>
                  <th>UTGST Amt</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="ItemCode"
                      value={gstData.ItemCode}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="SAC"
                      value={gstData.SAC}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="Rate"
                      value={gstData.Rate}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="Qty"
                      value={gstData.Qty}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="SubTotal"
                      value={gstData.SubTotal}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="Discount"
                      value={gstData.Discount}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="DiscountAmt"
                      value={gstData.DiscountAmt}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="Packing"
                      value={gstData.Packing}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="Transport"
                      value={gstData.Transport}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="AssValue"
                      value={gstData.AssValue}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="CGST"
                      value={gstData.CGST}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="CGSTAmt"
                      value={gstData.CGSTAmt}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="SGST"
                      value={gstData.SGST}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="SGSTAmt"
                      value={gstData.SGSTAmt}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="IGST"
                      value={gstData.IGST}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="IGSTAmt"
                      value={gstData.IGSTAmt}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="UTGST"
                      value={gstData.UTGST}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="UTGSTAmt"
                      value={gstData.UTGSTAmt}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="Total"
                      value={gstData.Total}
                      onChange={handleChange}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="jobworkgsttable">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td>TDC Assable Value:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="TOC_AssableValue"
                        value={gstData.TOC_AssableValue}
                        onChange={handleChange}
                      />
                    </td>
                    <td>CGST:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="CGST"
                        value={gstData.CGST}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="packForward">Pack. & Fwrd. Charges:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="PackCharges"
                        value={gstData.PackCharges}
                        onChange={handleChange}
                      />
                    </td>
                    <td>SGST:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="SGST"
                        value={gstData.SGST}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="transportCharges">Transport Charges:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="TransportCharges"
                        value={gstData.TransportCharges}
                        onChange={handleChange}
                      />
                    </td>
                    <td>IGST:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="IGST"
                        value={gstData.IGST}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="insurance">Insurance:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Insurance"
                        value={gstData.Insurance}
                        onChange={handleChange}
                      />
                    </td>
                    <td>VAT:</td>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="installationCharges">Installation Charges:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="InstallationCharges"
                        value={gstData.InstallationCharges}
                        onChange={handleChange}
                      />
                    </td>
                    <td>CESS:</td>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobWorkgstdetail
