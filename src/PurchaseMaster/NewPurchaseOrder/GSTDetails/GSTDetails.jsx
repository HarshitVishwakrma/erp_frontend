"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import "./GStDetails.css"

const GSTDetails = ({ updateFormData = () => {}, itemDetails = [] }) => {
  const [gstDetails, setGstDetails] = useState([
    {
      ItemCode: "",
      HSN: "",
      Rate: "",
      Qty: "",
      SubTotal: "",
      Discount: "",
      DiscountAmt: "",
      Packing: "",
      Transport: "",
      ToolAmort: "",
      AssValue: "",
      CGST: "",
      CGSTAmt: "",
      SGST: "",
      SGSTAmt: "",
      IGST: "",
      IGSTAmt: "",
      Vat: "",
      Cess: "",
      Total: "",
      TOC_AssableValue: "",
      TOC_PackCharges: "",
      TOC_TransportCost: "",
      TOC_Insurance: "",
      TOC_InstallationCharges: "",
      TOC_CGST: "",
      TOC_SGST: "",
      TOC_IGST: "",
      TOC_VAT: "",
      TOC_CESS: "",
      TOC_TDS: "",
      GR_Total: "",
    },
  ])

  useEffect(() => {
    const calculatedGSTDetails = itemDetails.map((item) => {
      // Calculate subtotal
      const rate = Number(item.Rate) || 0
      const qty = Number(item.Qty) || 0
      const subtotal = rate * qty

      // Calculate discount
      const discountPercent = Number(item.Disc) || 0
      const discountAmount = (subtotal * discountPercent) / 100

      // Calculate assessable value after discount
      const assessableValue = subtotal - discountAmount

      // Calculate tax amounts
      const cgstRate = Number(item.GST_Details?.CGST?.Rate) || 9 // Default to 9%
      const sgstRate = Number(item.GST_Details?.SGST?.Rate) || 9 // Default to 9%
      const igstRate = Number(item.GST_Details?.IGST?.Rate) || 0

      const cgstAmount = (assessableValue * cgstRate) / 100
      const sgstAmount = (assessableValue * sgstRate) / 100
      const igstAmount = (assessableValue * igstRate) / 100

      // Calculate total
      const total = assessableValue + cgstAmount + sgstAmount + igstAmount

      return {
        ItemCode: item.Item || "",
        HSN: item.HSN_SAC_Code || "",
        Rate: rate,
        Qty: qty,
        SubTotal: subtotal.toFixed(2),
        Discount: discountPercent,
        DiscountAmt: discountAmount.toFixed(2),
        AssValue: assessableValue.toFixed(2),
        CGST: cgstRate,
        CGSTAmt: cgstAmount.toFixed(2),
        SGST: sgstRate,
        SGSTAmt: sgstAmount.toFixed(2),
        IGST: igstRate,
        IGSTAmt: igstAmount.toFixed(2),
        Total: total.toFixed(2),
      }
    })

    setGstDetails(calculatedGSTDetails.length > 0 ? calculatedGSTDetails : [{}])
    updateFormData("Gst_Details", calculatedGSTDetails)
  }, [itemDetails, updateFormData])

  const addNewRow = () => {
    setGstDetails([
      ...gstDetails,
      {
        ItemCode: "",
        HSN: "",
        Rate: "",
        Qty: "",
        SubTotal: "",
        Discount: "",
        DiscountAmt: "",
        Packing: "",
        Transport: "",
        ToolAmort: "",
        AssValue: "",
        CGST: "",
        CGSTAmt: "",
        SGST: "",
        SGSTAmt: "",
        IGST: "",
        IGSTAmt: "",
        Vat: "",
        Cess: "",
        Total: "",
        TOC_AssableValue: "",
        TOC_PackCharges: "",
        TOC_TransportCost: "",
        TOC_Insurance: "",
        TOC_InstallationCharges: "",
        TOC_CGST: "",
        TOC_SGST: "",
        TOC_IGST: "",
        TOC_VAT: "",
        TOC_CESS: "",
        TOC_TDS: "",
        GR_Total: "",
      },
    ])
  }

  const handleInputChange = (index, field, value) => {
    // Limit ItemCode to 30 characters
    if (field === "ItemCode" && value.length > 30) {
      toast.error("Item Code cannot exceed 30 characters.")
      return
    }

    const updatedDetails = [...gstDetails]
    updatedDetails[index][field] =
      field === "Rate" || field === "Qty" || field === "CGST" || field === "SGST" || field === "IGST"
        ? Number(value) || 0
        : value

    // Recalculate dependent values if rate, qty, or discount changes
    if (field === "Rate" || field === "Qty" || field === "Discount") {
      const rate = field === "Rate" ? Number(value) || 0 : Number(updatedDetails[index].Rate) || 0
      const qty = field === "Qty" ? Number(value) || 0 : Number(updatedDetails[index].Qty) || 0
      const discount = field === "Discount" ? Number(value) || 0 : Number(updatedDetails[index].Discount) || 0

      const subtotal = rate * qty
      const discountAmount = (subtotal * discount) / 100
      const assessableValue = subtotal - discountAmount

      updatedDetails[index].SubTotal = subtotal.toFixed(2)
      updatedDetails[index].DiscountAmt = discountAmount.toFixed(2)
      updatedDetails[index].AssValue = assessableValue.toFixed(2)

      // Recalculate tax amounts
      const cgstRate = Number(updatedDetails[index].CGST) || 0
      const sgstRate = Number(updatedDetails[index].SGST) || 0
      const igstRate = Number(updatedDetails[index].IGST) || 0

      updatedDetails[index].CGSTAmt = ((assessableValue * cgstRate) / 100).toFixed(2)
      updatedDetails[index].SGSTAmt = ((assessableValue * sgstRate) / 100).toFixed(2)
      updatedDetails[index].IGSTAmt = ((assessableValue * igstRate) / 100).toFixed(2)

      // Update total
      const total =
        assessableValue +
        Number(updatedDetails[index].CGSTAmt) +
        Number(updatedDetails[index].SGSTAmt) +
        Number(updatedDetails[index].IGSTAmt)

      updatedDetails[index].Total = total.toFixed(2)
    }

    // Recalculate tax amounts if tax rates change
    if (field === "CGST" || field === "SGST" || field === "IGST") {
      const assessableValue = Number(updatedDetails[index].AssValue) || 0
      const taxRate = Number(value) || 0
      const taxAmount = (assessableValue * taxRate) / 100

      if (field === "CGST") updatedDetails[index].CGSTAmt = taxAmount.toFixed(2)
      if (field === "SGST") updatedDetails[index].SGSTAmt = taxAmount.toFixed(2)
      if (field === "IGST") updatedDetails[index].IGSTAmt = taxAmount.toFixed(2)

      // Update total
      const total =
        assessableValue +
        Number(updatedDetails[index].CGSTAmt) +
        Number(updatedDetails[index].SGSTAmt) +
        Number(updatedDetails[index].IGSTAmt)

      updatedDetails[index].Total = total.toFixed(2)
    }

    setGstDetails(updatedDetails)
    updateFormData("Gst_Details", updatedDetails)
  }

  const calculateTotals = () => {
    const totals = gstDetails.reduce(
      (acc, item) => {
        acc.subTotal += Number(item.SubTotal) || 0
        acc.discountAmt += Number(item.DiscountAmt) || 0
        acc.assessableValue += Number(item.AssValue) || 0
        acc.cgst += Number(item.CGSTAmt) || 0
        acc.sgst += Number(item.SGSTAmt) || 0
        acc.igst += Number(item.IGSTAmt) || 0
        acc.total += Number(item.Total) || 0
        return acc
      },
      { subTotal: 0, discountAmt: 0, assessableValue: 0, cgst: 0, sgst: 0, igst: 0, total: 0 },
    )
    return totals
  }

  const totals = calculateTotals()

  return (
    <div className="GStDetails">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Item Code</th>
                  <th>HSN</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Sub Total</th>
                  <th>Discount %</th>
                  <th>Discount Amt</th>
                  <th>Ass Value</th>
                  <th>CGST %</th>
                  <th>CGST Amt</th>
                  <th>SGST %</th>
                  <th>SGST Amt</th>
                  <th>IGST %</th>
                  <th>IGST Amt</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {gstDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.ItemCode}
                        onChange={(e) => handleInputChange(index, "ItemCode", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.HSN}
                        onChange={(e) => handleInputChange(index, "HSN", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.Rate}
                        onChange={(e) => handleInputChange(index, "Rate", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.Qty}
                        onChange={(e) => handleInputChange(index, "Qty", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.SubTotal}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.Discount}
                        onChange={(e) => handleInputChange(index, "Discount", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.DiscountAmt}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.AssValue}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.CGST}
                        onChange={(e) => handleInputChange(index, "CGST", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.CGSTAmt}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.SGST}
                        onChange={(e) => handleInputChange(index, "SGST", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.SGSTAmt}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.IGST}
                        onChange={(e) => handleInputChange(index, "IGST", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.IGSTAmt}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ minWidth: "90px" }}
                        value={detail.Total}
                        readOnly
                      />
                    </td>
                    <td>
                      <button className="btn" onClick={addNewRow}>
                        Add New Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="gsttable">
        <table className="table table-bordered table-responsive">
          <tbody>
                <tbody>
            {gstDetails.length > 0 ? (
              <>
                <tr>
                  <td>TOC Assable Value:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_AssableValue || ""}
                      onChange={(e) => handleInputChange(0, "TOC_AssableValue", e.target.value)}
                    />
                  </td>
                  <td>CGST:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={totals.cgst.toFixed(2)}
                      onChange={(e) => handleInputChange(0, "TOC_CGST", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="packForward">Pack. & Fwrd. Charges:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_PackCharges || ""}
                      onChange={(e) => handleInputChange(0, "TOC_PackCharges", e.target.value)}
                    />
                  </td>
                  <td>SGST:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={totals.sgst.toFixed(2)}
                      onChange={(e) => handleInputChange(0, "TOC_SGST", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="transportCharges">Transport Charges:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_TransportCost || ""}
                      onChange={(e) => handleInputChange(0, "TOC_TransportCost", e.target.value)}
                    />
                  </td>
                  <td>IGST:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={totals.igst.toFixed(2)}
                      onChange={(e) => handleInputChange(0, "TOC_IGST", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="insurance">Insurance:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_Insurance || ""}
                      onChange={(e) => handleInputChange(0, "TOC_Insurance", e.target.value)}
                    />
                  </td>
                  <td>VAT:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_VAT || ""}
                      onChange={(e) => handleInputChange(0, "TOC_VAT", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="TOC_InstallationCharges">Installation Charges:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_InstallationCharges || ""}
                      onChange={(e) => handleInputChange(0, "TOC_InstallationCharges", e.target.value)}
                    />
                  </td>
                  <td>CESS:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_CESS || ""}
                      onChange={(e) => handleInputChange(0, "TOC_CESS", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="TOC_TDS">TDS:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={gstDetails[0].TOC_TDS || ""}
                      onChange={(e) => handleInputChange(0, "TOC_TDS", e.target.value)}
                    />
                  </td>
                  <td>GRAND TOTAL:</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={totals.total.toFixed(2)}
                      onChange={(e) => handleInputChange(0, "GR_Total", e.target.value)}
                    />
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan="4">No GST details available</td>
              </tr>
            )}
          </tbody>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GSTDetails
