import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./PurchaseGrn.css";
import { FaTrash } from "react-icons/fa";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getNextGrnNo ,getGeneralDetails ,postPurchaseGRN} from "../../Service/StoreApi.jsx";


const PurchaseGrn = () => {
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


  useEffect(() => {
    const year = new Date().getFullYear(); // e.g., 2025
    const shortYear = `${String(year).slice(2)}${String(year + 1).slice(2)}`; // "2425"
    localStorage.setItem("Shortyear", shortYear);
  }, []);
  
  const [grnNo, setGrnNo] = useState('');


  const handleSeriesChange = async (e) => {
    const selectedSeries = e.target.value;
  
    setFormData((prevData) => ({
      ...prevData,
      Series: selectedSeries,
    }));
  
    if (selectedSeries === "Purchase GRN") {
      const shortYear = localStorage.getItem("Shortyear"); // example: "2425"
      if (shortYear) {
        try {
          const nextGrnNo = await getNextGrnNo(shortYear);
          if (nextGrnNo) {
            setGrnNo(nextGrnNo); // Show in readonly input
            setFormData((prevData) => ({
              ...prevData,
              GrnNo: nextGrnNo,
            }));
          }
        } catch (error) {
          console.error("Error fetching next GRN number:", error);
        }
      }
    } else {
      // Reset GRN No if a different series is selected
      setGrnNo("");
      setFormData((prevData) => ({
        ...prevData,
        GrnNo: "",
      }));
    }
  };
  
  
  



  const [geList, setGeList] = useState([]);
  const [formData, setFormData] = useState({
    GrnNo:"",
    Series:"",
    GE_No: '',
    Supp_Cust: '',
    Select: '',
    ChallanNo: '',
    InvoiceNo: '',
    EWayBillNo: '',
    VehicleNo: '',
    Transporter: ''
  });

  useEffect(() => {
    getGeneralDetails()
      .then(data => setGeList(data))
      .catch(err => console.error('Error loading GE list:', err));
  }, []);

  const handleGEChange = (e) => {
    const selectedGE = e.target.value;
    const selectedData = geList.find(item => item.GE_No === selectedGE);

    if (selectedData) {
      setFormData({
        ...formData,
        GE_No: selectedData.GE_No,
        Supp_Cust: selectedData.Supp_Cust,
        Select: selectedData.Select,
        ChallanNo: selectedData.ChallanNo,
        InvoiceNo: selectedData.InVoiceNo,
        EWayBillNo: selectedData.EWayBillNo,
        VehicleNo: selectedData.VehicleNo,
        Transporter: selectedData.Transporter
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      NewGrnList: [/* map from form or static */],
      GrnGst: [/* map from form or static */],
      GrnGstTDC: [/* map from form or static */],
      RefTC: [/* map from form or static */],
      Plant: "Produlink",
      Series: "Series Name",
      GateEntryNo: formData.GE_No,
      SelectSupplier: formData.Supp_Cust,
      SelectPO: formData.Select,
      AddChallanGrnQty: false,
      SelectItem: "Item XYZ",
      ItemDropdown: "Dropdown Option 1",
      HeatNo: "HN123456",
      GrnNo: formData.GrnNo,
      GrnDate: "2025-04-02",
      GrnTime: "12:30:00",
      ChallanNo: formData.ChallanNo,
      ChallanDate: "2025-04-01",
      InvoiceNo: formData.InvoiceNo,
      InvoiceDate: "2025-04-01",
      EWayBillNo: formData.EWayBillNo,
      EWayBillDate: "2025-04-02",
      VehicleNo: formData.VehicleNo,
      LrNo: "LR98765",
      Transporter: formData.Transporter,
      PreparedBy: "John Doe",
      CheckedBy: "Jane Smith",
      TcNo: "TC123456",
      TcDate: "2025-04-01",
      QcCheck: false,
      Delivery: false,
      Remark: "Some remarks here",
      PaymentTermDay: "30"
    };
  
    try {
      const result = await postPurchaseGRN(payload);
      console.log('result',result);
      
      toast("GRN submitted successfully!");
      console.log("Server Response:", result);
    } catch (err) {
      toast("Error submitting GRN.");
    }
  };


  return (
    <div className="NewStorePurchasegrn">
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
                <div className="Purchasegrn-header mb-4 text-start mt-5">
                    <div className="row align-items-center">
                    <div className="col-md-1">
                      <h5 className="header-title text-start">New GRN</h5>
                    </div>
                    <div className="col-md-9 mt-4">
                      <div className="row mb-3">
                       
                        <div className="col-md-2">
                          <select id="sharpSelect" className="form-select">
                            <option selected>Produlink</option>
                          </select>
                        </div>

                      
                    {/* Label: Series and Series Select Option */}
<div className="col-md-1">
  <label htmlFor="seriesSelect" className="form-label">
    Series:
  </label>
</div>
<div className="col-md-2">
  <select id="seriesSelect" className="form-select" onChange={handleSeriesChange}>
    <option value="">Select</option>
    <option value="Purchase GRN">Purchase GRN</option>
    <option value="s2">s2</option>
    <option value="s3">s3</option>
    <option value="s4">s4</option>
  </select>
</div>

{/* GRN Number Input - readonly */}
<div className="col-md-2">
  <input
    type="text"
    id="inputField"
    className="form-control"
    placeholder="Enter value"
    value={grnNo}
    readOnly
  />
</div>



                        <div className="col-md-2 d-flex align-items-center">
                          <input type="checkbox" id="poGrnCheckbox" />
                          <label htmlFor="poGrnCheckbox" className="ms-1">
                            PO GRN
                          </label>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <input type="checkbox" id="directGrnCheckbox" />
                          <label htmlFor="directGrnCheckbox" className="ms-1">
                            Direct GRN
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      
                          <Link className="btn" to="/Grn-List">GM List</Link>
                       
                    </div>
                  </div>
                </div>
                <div className="Purchasegrn-main mt-5">
                  <div className="container-fluid text-start">
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">Gate Entry No:</div>
                          <div className="col-md-6">
                          <select className="form-select" onChange={handleGEChange}>
            <option value="">Select GE No</option>
            {geList.map((item, idx) => (
              <option key={idx} value={item.GE_No}>
                {item.GE_No} - {item.Supp_Cust}
              </option>
            ))}
          </select>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-4">Select Supplier:</div>
                          <div className="col-md-6">
                          <input className="form-control" value={formData.Supp_Cust} readOnly />
                          </div>
                          
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row text-start">
                          <div className="col-md-4">Select Po:</div>
                          <div className="col-md-3">
                          <select id="routingSelect" className="form-select" value={formData.Select} readOnly>
            <option value="">Select</option>
            {formData.Select && <option>{formData.Select}</option>}
          </select>
                          </div>
                          <div className="col-md-3">
                            <button type="button" className="btn">
                              Add All Item
                            </button>
                          </div>
                          <div className="col-md-1">
                            <button type="button" className="btn">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4 ">
                      <div className="col-md-6">
                        <div className="row ">
                          <div className="col-md-4">Search Item:</div>
                          <div className="col-md-6">
                            <input className="form-control" />
                          </div>
                          <div className="col-md-2">
                            <button type="button" className="btn">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="row ">
                          <div className="col-md-8">
                            <button
                              type="button"
                              className="btn"
                              onClick={handleButtonClick}
                            >
                              Pending Release PO item
                            </button>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className="Purchasegrntable">
                    <div className="container-fluid mt-4 text-start">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Sr no.</th>
                              <th>PO No</th>
                              <th>Date</th>
                              <th>Item No | Code</th>
                              <th>Description</th>
                              <th>Rate</th>
                              <th>PO Qty</th>
                              <th>Bal. Qty</th>
                              <th>Challan Qty</th>
                              <th>GRN Qty</th>
                              <th>Short/Excess Qty</th>
                              <th>Unit Code</th>
                              <th>Total</th>
                              <th>Heat No.</th>
                              <th>MFg Date</th>
                              <th>Hc</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control me-2"
                                  />
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
                    </div>
                  </div>

                 
                </div>

                <div
                    className="Purchasegrn122Footer"

                  >
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-Gernal-Detail-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Gernal-Detail"
                          type="button"
                          role="tab"
                          aria-controls="pills-Gernal-Detail"
                          aria-selected="true"
                        >
                          Gernal Detail
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-GST-Details-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-GST-Details"
                          type="button"
                          role="tab"
                          aria-controls="pills-GST-Details"
                          aria-selected="false"
                        >
                          GST Details
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-Ref-Doc/Tc-Details-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Ref-Doc/Tc-Details"
                          type="button"
                          role="tab"
                          aria-controls="pills-Ref-Doc/Tc-Details"
                          aria-selected="false"
                        >
                          Ref Doc/TC Details
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent" >
                      <div
                        className="tab-pane fade show active"
                        id="pills-Gernal-Detail"
                        role="tabpanel"
                        aria-labelledby="pills-Gernal-Detail-tab"
                        tabindex="0"
                      >
                        <div className="StorePurchasegrn1 text-start">
                          <div className="container-fluid">
                         
                            <div className="row">
                              <div className="col-md-4 text-start">
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        {/* First Column Group */}
                                        <tr>
                                          <th className="col-md-4">GRN No:</th>
                                          <td>
                                          <input
  type="text"
  name="GrnNo"
  value={grnNo}
  onChange={handleChange} // optional if editable
  className="form-control"
/>
                          
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>GRN Date:</th>
                                          <td>
                                          <input
                            type="date"
                            name="GrnDate"
                            value={formData.GrnDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>GRN Time:</th>
                                          <td>
                                          <input
                            type="text"
                            name="GrnTime"
                            value={formData.GrnTime}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan No:</th>
                                          <td>
                                          <input
                type="text"
                name="ChallanNo"
                value={formData.ChallanNo}
                onChange={handleChange}
                className="form-control"
              />
                        
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Challan Date:</th>
                                          <td>
                                          <input
                            type="date"
                            name="ChallanDate"
                            value={formData.ChallanDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                        
                                          </td>
                                        </tr>
                                        <tr>
                                          <th>Invoice No:</th>
                                          <td>
                                          <input
                type="text"
                name="InvoiceNo"
                value={formData.InvoiceNo}
                onChange={handleChange}
                className="form-control"
              />
                          
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            Invoice Date:
                                          </th>
                                          <td>
                                          <input
                            type="date"
                            name="InvoiceDate"
                            value={formData.InvoiceDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-start">
                                {/* Second Column Group */}
                                <div className="container mt-4">
                                  <div className="table-responsive text-start">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>E Way Bill No:</th>
                                          <td>
                                          <input
                type="text"
                name="EWayBillNo"
                value={formData.EWayBillNo}
                onChange={handleChange}
                className="form-control"
              />
                        </td>
                                        </tr>
                                        <tr>
                                          <th>E Way Bill Date:</th>
                                          <td>
                                          <input
                            type="date"
                            name="EWayBillDate"
                            value={formData.EWayBillDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                      
                        </td>
                                        </tr>
                                        <tr>
                                          <th>Vehical No:</th>
                                          <td>
                                          <input
                type="text"
                name="VehicleNo"
                value={formData.VehicleNo}
                onChange={handleChange}
                className="form-control"
              />
                          
                        </td>
                                        </tr>
                                        <tr>
                                          <th>LR No:</th>
                                          <td>
                                          <input
                            type="text"
                            name="LrNo"
                            value={formData.LrNo}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                        </td>
                                        </tr>
                                        <tr>
                                          <th>Transporter:</th>
                                          <td>
                                          <input
                type="text"
                name="Transporter"
                value={formData.Transporter}
                onChange={handleChange}
                className="form-control"
              />
                          
                        </td>
                                        </tr>
                                        <tr>
                                          <th>Prepared By:</th>
                                          <td>
                                          <input
                            type="text"
                            name="PreparedBy"
                            value={formData.PreparedBy}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                        </td>
                                        </tr>
                                        <tr>
                                          <th>Checked By:</th>
                                          <td>
                                          <input
                            type="text"
                            name="CheckedBy"
                            value={formData.CheckedBy}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                        </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-start">
                                {/* Third Column Group */}
                                <div className="container mt-4">
                                  <div className="table-responsive">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>TC No:</th>
                                          <td>
                                          <input
                            type="text"
                            name="TcNo"
                            value={formData.TcNo}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                        </td>
                                        </tr>
                                        <tr>
                                          <th>TC Date:</th>
                                          <td>
                                          <input
                            type="date"
                            name="TcDate"
                            value={formData.TcDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                         
                        </td>
                                        </tr>
                                        <tr>
                                          <th>QC Check:</th>
                                          <td>
                          <div className="row">
                            <div className="col-md-4 d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="QuantityCheckbox"
                                name="QCCheck"
                                value="Quantity"
                                checked={formData.QCCheck?.includes('Quantity') || false}
                                onChange={handleChange}
                              />
                              <label htmlFor="QuantityCheckbox" className="ms-1">Quantity</label>
                            </div>
                            <div className="col-md-3 d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="QualityCheckbox"
                                name="QCCheck"
                                value="Quality"
                                checked={formData.QCCheck?.includes('Quality') || false}
                                onChange={handleChange}
                              />
                              <label htmlFor="QualityCheckbox" className="ms-1">Quality</label>
                            </div>
                          </div>
                        </td>
                                        </tr>
                                        <tr>
                                          <th className="col-md-4">
                                            Delivery in Time:
                                          </th>
                                          <td>
                          <div className="row">
                            <div className="col-md-2 d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="YesCheckbox"
                                name="DeliveryInTime"
                                value="Yes"
                                checked={formData.DeliveryInTime === 'Yes'}
                                onChange={handleChange}
                              />
                              <label htmlFor="YesCheckbox" className="ms-1">Yes</label>
                            </div>
                            <div className="col-md-2 d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="NoCheckbox"
                                name="DeliveryInTime"
                                value="No"
                                checked={formData.DeliveryInTime === 'No'}
                                onChange={handleChange}
                              />
                              <label htmlFor="NoCheckbox" className="ms-1">No</label>
                            </div>
                          </div>
                        </td>
                                        </tr>
                                        <tr>
                                          <th>Remark:</th>
                                          <td>
                                          <textarea
                            name="Remark"
                            value={formData.Remark}
                            onChange={handleChange}
                            className="form-control"
                          ></textarea>
                        
                        </td>
                                        </tr>
                                        <tr>
                                          <th>Payment Term Days:</th>
                                          <td>
                                          <input
                            type="text"
                            name="PaymentTermDay"
                            value={formData.PaymentTermDay}
                            onChange={handleChange}
                            className="form-control"
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
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-GST-Details"
                        role="tabpanel"
                        aria-labelledby="pills-GST-Details-tab"
                        tabindex="0"
                      >
                        <div className="StorePurchasegrn2">
                          <div className="row ">
                            <div className="col-md-8">
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Sr</th>
                                      <th>Item Code</th>
                                      <th>HSN</th>
                                      <th>PO Rate</th>
                                      <th>Disc Rate</th>
                                      <th>Qty</th>
                                      <th>Discount</th>
                                      <th>Pack Amt</th>
                                      <th>TransAmt</th>
                                      <th>Tool Amort</th>
                                      <th>Ass Value</th>
                                      <th>CGST</th>
                                      <th>SGST</th>
                                      <th>IGST</th>
                                      <th>VAT</th>
                                      <th>CESS</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>{/* Data rows will go here */}</tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="row">
                                <div className="col-md-6 text-start">
                                  {/* Second Column Group */}
                                  <div className="container">
                                    <div className="table-responsive">
                                      <table className="table table-bordered">
                                        <tbody>
                                          <tr>
                                            <th>TDC Assessable Value:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">
                                              (TDC) Pack & Fwrd Charge:
                                            </th>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>TransPort Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Insurance:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Instailation Charges:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Other Charges:</th>
                                            <td>
                                              <input
                                                type="date"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>TDS:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 text-start">
                                  {/* Third Column Group */}
                                  <div className="container mt-4">
                                    <div className="table-responsive">
                                      <table className="table table-bordered">
                                        <tbody>
                                          <tr>
                                            <th>CGST:00.00%</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th className="col-md-4">
                                              SGST:00.00%
                                            </th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>IGST:00.00%:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>VAT Amt:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Cess Amt:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>TCS: :</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>GR. Total:</th>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control"
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colspan="2"
                                              className="text-start"
                                            >
                                              <button className="btn">
                                                DocTCUpload
                                              </button>
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
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-Ref-Doc/Tc-Details"
                        role="tabpanel"
                        aria-labelledby="pills-Ref-Doc/Tc-Details-tab"
                        tabindex="0"
                      >
                        <div className="StorePurchasegrn3">
                          <div className="row ">
                            <div className="col-md-8 mt-4">
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Sr</th>
                                      <th>Item Code</th>
                                      <th>Item Desc</th>
                                      <th>Mill/TC Name</th>
                                      <th>Mill/TC No</th>
                                      <th>Mill/TC Date</th>
                                      <th>Location</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>{/* Data rows will go here */}</tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 text-end">
                              <button className="pobtn" type="button">
                                Doc/Tc Upload
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-end">
                      <div className="col-md-2">
                      <button className="btn btn-primary" onClick={handleSubmit}>
  Submit GRN
</button>
                      </div>
                    </div>
                  </div>
                  
                                         
                                        

                                       
              </main>
             
              {/* {isCardVisible && (
                <div className="storenewmrn-overlay">
                  <div className="costtype2-overlay">
                    <div className="new-card">
                      <div className="row">
                        <div className="col-md-10 text-start">
                          <h5 className="card-title">
                            Pending for Release PO Item List
                          </h5>
                        </div>
                        <div className="col-md-2 text-end">
                          <button className="btn" onClick={handleClose}>
                            X
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <table>
                          <thead>
                            <tr>
                              <th>No Data Found !!</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseGrn;
