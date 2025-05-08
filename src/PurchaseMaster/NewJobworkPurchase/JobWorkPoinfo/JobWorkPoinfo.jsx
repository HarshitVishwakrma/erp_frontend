import React, { useState,useEffect } from "react";
import "./JobWorkPoinfo.css";
import {  FaEdit, FaTrash } from "react-icons/fa";
import { saveJwPoInfo , fetchNextJobWorkNumber } from "../../../Service/PurchaseApi";
import { toast, ToastContainer } from "react-toastify"; // Importing toaster

const JobWorkPoinfo = () => {
  const [showCard, setShowCard] = useState(false);
  const [formData, setFormData] = useState({
    PoNo: "",
    PaymentTerm: "",
    QuotNo: "",
    Delivery: "",
    PoValidityDate: "",
    PoNote: "",
    GST: "",
    PoDate: "",
    PaymentRemark: "",
    QuotationDate: "",
    freight: "",
    ContactPersion: "",
    PF_Charges: "",
    PoRateType: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Shortyear from localStorage
  const year = localStorage.getItem("Shortyear");

  // Fetch next_PoNo when the component loads
  useEffect(() => {
    const fetchPoNumber = async () => {
      if (!year) {
        console.error("Shortyear is not available in localStorage.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetchNextJobWorkNumber(year);
        if (response && response.next_PoNo) {
          setFormData((prev) => ({ ...prev, PoNo: response.next_PoNo })); // Set PoNo
        } else {
          console.error("No PoNo received from the API.");
        }
      } catch (error) {
        console.error("Error fetching next job work number:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoNumber();
  }, [year]);


  const handleCloseCard = () => setShowCard(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) tempErrors[field] = "This field is required.";
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      saveJwPoInfo(formData)
        .then((response) => {
          
          if (response && response.id) {
            console.log("response");
            
            toast.success("Data saved successfully!");
            clearForm();
          } else {
            toast.error("Failed to save data. Please try again.");
            console.error("Unexpected API Response:", response);
          }
        })
        .catch((error) => {
          console.error("Error saving data:", error); // Log full error for debugging
          if (error.response) {
            // Display specific error message if available
            toast.error(
              error.response.data.message || "An error occurred while saving."
            );
          } else {
            toast.error("An unexpected error occurred.");
          }
        });
    } else {
      toast.error("Please fill in all required fields.");
    }
  };
  
  

  const clearForm = () => {
    setFormData({
      PoNo: "",
      PaymentTerm: "",
      QuotNo: "",
      Delivery: "",
      PoValidityDate: "",
      PoNote: "",
      GST: "",
      PoDate: "",
      PaymentRemark: "",
      QuotationDate: "",
      freight: "",
      ContactPersion: "",
      PF_Charges: "",
      PoRateType: "",
    });
    setErrors({});
  };


  return (
    <div className="jobworkpoinfo">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="PoNo">PO No:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                <input
                    type="text"
                    id="PoNo"
                    name="PoNo"
                    className="form-control"
                    placeholder="Enter PO Number"
                    value={formData.PoNo}
                    onChange={handleChange}
                    readOnly={loading} // Make it read-only while fetching
                  />
                    {errors.PoNo && <div className="invalid-feedback">{errors.PoNo}</div>}
                </div>
              </div>
            </div>
           
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="PaymentTerm">Payment Term:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="PaymentTerm"
                    name="PaymentTerm"
                    className="form-control"
                    placeholder="Enter Payment Term"
                    value={formData.PaymentTerm}
                    onChange={handleChange}
                  />
                   {errors.PaymentTerm && <div className="invalid-feedback">{errors.PaymentTerm}</div>}
                </div>
              </div>
            </div>
            {/* Quotation Number */}
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="QuotNo">Quot No / Ref:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="QuotNo"
                    name="QuotNo"
                    className="form-control"
                    placeholder="Enter Quotation Number"
                    value={formData.QuotNo}
                    onChange={handleChange}
                  />
                   {errors.QuotNo && <div className="invalid-feedback">{errors.QuotNo}</div>}
                </div>
              </div>
            </div>
            {/* Delivery Date */}
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="Delivery">Delivery:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="date"
                    id="Delivery"
                    name="Delivery"
                    className="form-control"
                    value={formData.Delivery}
                    onChange={handleChange}
                  />
                   {errors.Delivery && <div className="invalid-feedback">{errors.Delivery}</div>}
                </div>
              </div>
            </div>
           
        
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="PoValidityDate">PO Validity Date:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="date"
                    id="PoValidityDate"
                    name="PoValidityDate"
                    className="form-control"
                    value={formData.PoValidityDate}
                    onChange={handleChange}
                  />
                   {errors.PoValidityDate && <div className="invalid-feedback">{errors.PoValidityDate}</div>}
                </div>
              </div>
            </div>
            {/* PO Note */}
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="PoNote">PO Note:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <textarea
                    id="PoNote"
                    name="PoNote"
                    className="form-control"
                    placeholder="Enter PO Note"
                    value={formData.PoNote}
                    onChange={handleChange}
                  ></textarea>
                   {errors.PoNote && <div className="invalid-feedback">{errors.PoNote}</div>}
                </div>
              </div>
            </div>
            {/* GST */}
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="GST">GST (Taxes):</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="GST"
                    name="GST"
                    className="form-control"
                    placeholder="Enter GST Percentage"
                    value={formData.GST}
                    onChange={handleChange}
                  />
                   {errors.GST && <div className="invalid-feedback">{errors.GST}</div>}
                </div>
              </div>
            </div>
            
          </div>
          <div className="col-md-4">
          <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="PoDate">PO Date:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="date"
                    id="PoDate"
                    name="PoDate"
                    className="form-control"
                    value={formData.PoDate}
                    onChange={handleChange}
                  />
                   {errors.PoDate && <div className="invalid-feedback">{errors.PoDate}</div>}
                </div>
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="PaymentRemark">Payment Remark:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="PaymentRemark"
                    name="PaymentRemark"
                    className="form-control"
                    placeholder="Enter Payment Remark"
                    value={formData.PaymentRemark}
                    onChange={handleChange}
                  />
                   {errors.PaymentRemark && <div className="invalid-feedback">{errors.PaymentRemark}</div>}
                </div>
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="QuotationDate">Quotation Date:</label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <input
                    type="date"
                    id="QuotationDate"
                    name="QuotationDate"
                    className="form-control"
                    value={formData.QuotationDate}
                    onChange={handleChange}
                  />
                   {errors.QuotationDate && <div className="invalid-feedback">{errors.QuotationDate}</div>}
                </div>
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label className="form-check-label" htmlFor="freight">
                    Freight:
                  </label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                <select
                id="freight"
                name="freight"
                className="form-control"
                value={formData.freight}
                onChange={handleChange}
              >
                <option value="">SELECT</option>
                <option value="option1">EX - AURANGABAD</option>
                
              </select>
              {errors.freight && <div className="invalid-feedback">{errors.freight}</div>}
                </div>
              </div>
              {/* <div className="col-md-1">
                <button
                  type="button"
                  className="jobbtn"
                  onClick={handleAddClick}
                >
                  <FaPlus />
                </button>
              </div>
              <div className="col-md-1">
                <button
                  type="button"
                  className="jobbtn"
                  onClick={handleRefreshClick}
                >
                  <FaSync />
                </button>
              </div> */}
            </div>
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label className="form-check-label" htmlFor="ContactPersion">
                    Contact Person:
                  </label>
                </div>
              </div>
              <div className="col-md-8">
              <input
                 type="text"
                    id="ContactPersion"
                    name="ContactPersion"
                    className="form-control"
                    value={formData.ContactPersion}
                    onChange={handleChange}
                  />
                   {errors.ContactPersion && <div className="invalid-feedback">{errors.ContactPersion}</div>}
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label className="form-check-label" htmlFor="PF_Charges">
                    P&F Charges Note:
                  </label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                  <textarea
                    name="PF_Charges"
                    id="PF_Charges"
                    className="form-control"
                    value={formData.PF_Charges}
                    onChange={handleChange}
                    placeholder="Enter Enquiry Number"
                  ></textarea>
                   {errors.PF_Charges && <div className="invalid-feedback">{errors.PF_Charges}</div>}
                </div>
              </div>
            </div>
            <div className="row text-start">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label className="form-check-label" htmlFor="PoRateType">
                    Po Rate Type:
                  </label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group mb-3">
                <select
                id="PoRateType"
                name="PoRateType"
                className="form-control"
                value={formData.PoRateType}
                onChange={handleChange}
              >
                <option value="">SELECT</option>
                <option value="option1">GERNAL</option>
                <option value="option2">RATEDIFF</option>
                
              </select>
              {errors.PoRateType && <div className="invalid-feedback">{errors.PoRateType}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
          {showCard && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog" role="document" style={{marginTop:"250px"}}>
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="row">
                      <div className="col-md-12 text-start">
                        <h5 className="modal-title text-primary">
                          Freight Master
                        </h5>
                      </div>
                      {/* <div className="col-md-12 text-end">
                <button type="button" className="close" onClick={handleCloseCard}>
            <span aria-hidden="true">&times;</span>
          </button>
                </div> */}
                    </div>
                  </div>
                  <div className="modal-body">
                    {/* Form content */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="freightName">Enter Freight Name:</label>
                        <input
                          type="text"
                          id="freightName"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <button type="button" className="btn mt-4">
                          Save
                        </button>
                      </div>
                    </div>
                    {/* Table content */}
                    <table className="table mt-4">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Freight Name</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row */}
                        <tr>
                          <td>1</td>
                          <td>Example Freight</td>
                          <td>
                            <button className="btn">
                              <FaEdit />
                            </button>
                          </td>
                          <td>
                            <button className="btn">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleCloseCard}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row text-end">
          <div className="col-md-12 text-end">
            <button type="button" className="jobbtn" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" className="jobbtn ms-2" onClick={clearForm}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkPoinfo;
