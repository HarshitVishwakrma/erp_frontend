import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "../../NavBar/NavBar";
import SideNav from "../../SideNav/SideNav";
import "./UnitConversion.css";
import { saveUnitConversion } from "../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUnitConversionData } from "../../Service/Api.jsx";

const UnitConversion = () => {
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

  const [formData, setFormData] = useState({
    SubGroup: "",
    Item: "",
    Unit: "",
    StockQty: "",
    StockUnit: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await saveUnitConversion(formData);
      console.log("Response Data:", response);
      setData([...data, response]);
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error saving data");
    }
  };

  const handleClear = () => {
    setFormData({
      SubGroup: "",
      Item: "",
      Unit: "",
      StockQty: "",
      StockUnit: "",
    });
    setErrors({});
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUnitConversionData();
        setData(result.sort((a, b) => b.id - a.id));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="UniConversion">
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
              
                  <div className="UniConversion1-header mb-4 text-start mt-5">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h5 className="header-title">
                            Item Stock Unit Specification
                          </h5>
                        </div>
                      </div>
                
                  </div>
                  <div className="UnitMain">
                    <div className="container-fluid">
                      <div className="row text-start">
                        <div className="col-md-2 mb-3">
                          <label htmlFor="SubGroup" className="form-label">
                            Sub Group:
                          </label>
                          <select
                            id="SubGroup"
                            className="form-select"
                            style={{marginTop:"-1px"}}
                            value={formData.SubGroup}
                            onChange={handleChange}
                          >
                            <option value="">Select...</option>
                            <option value="FG">FG</option>
                            <option value="RM">RM</option>
                            <option value="TOOLs">TOOLS</option>
                            <option value="Instrument">Instrument</option>
                            <option value="Machine">Machine</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Service">Service</option>
                            <option value="Asset">Asset</option>
                          </select>
                          {errors.SubGroup && (
                            <div className="text-danger">{errors.SubGroup}</div>
                          )}
                        </div>
                        <div className="col-md-1 mb-3">
                          <label htmlFor="Item" className="form-label">
                            Item:<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="Item"
                            value={formData.Item}
                            onChange={handleChange}
                          />
                          {errors.Item && (
                            <div className="text-danger">{errors.Item}</div>
                          )}
                        </div>
                        <div className="col-md-1 mb-3" style={{marginTop:"31px"}}>
                          <button
                            className="btn"
                            onClick={handleSubmit}
                          >
                            Search
                          </button>
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="Unit" className="form-label">
                            Unit:
                          </label>
                          <select
                            id="Unit"
                            className="form-select"
                            style={{marginTop:"-1px"}}
                            value={formData.Unit}
                            onChange={handleChange}
                          >
                            <option value="">Select...</option>
                            <option value="1">PCS</option>
                            <option value="2">KGS</option>
                            <option value="3">BOX</option>
                            <option value="4">LTR</option>
                            <option value="5">NOS</option>
                            <option value="6">SQFT</option>
                            <option value="7">MTR</option>
                            <option value="8">FOOT</option>
                            <option value="9">SQMTR</option>
                            <option value="10">PAIR</option>
                            <option value="11">BAG</option>
                            <option value="12">PACKET</option>

                          </select>
                          {errors.Unit && (
                            <div className="text-danger">{errors.Unit}</div>
                          )}
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="StockQty" className="form-label">
                            Stock Qty:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="StockQty"
                            value={formData.StockQty}
                            onChange={handleChange}
                          />
                          {errors.StockQty && (
                            <div className="text-danger">{errors.StockQty}</div>
                          )}
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="StockUnit" className="form-label">
                            Stock Unit:
                          </label>
                          <select
                            id="StockUnit"
                            className="form-select"
                            style={{marginTop:"-1px"}}
                            value={formData.StockUnit}
                            onChange={handleChange}
                          >
                            <option value="">Select...</option>
                            <option value="1">PCS</option>
                            <option value="2">KGS</option>
                            <option value="3">BOX</option>
                            <option value="4">LTR</option>
                            <option value="5">NOS</option>
                            <option value="6">SQFT</option>
                            <option value="7">MTR</option>
                            <option value="8">FOOT</option>
                            <option value="9">SQMTR</option>
                            <option value="10">PAIR</option>
                            <option value="11">BAG</option>
                            <option value="12">PACKET</option>
                          </select>
                          {errors.StockUnit && (
                            <div className="text-danger">
                              {errors.StockUnit}
                            </div>
                          )}
                        </div>
                        <div className="col-md-1 mb-3" style={{marginTop:"31px"}}>
                          <button
                            className="btn"
                            onClick={handleSubmit}
                          >
                            Save
                          </button>
                        </div>
                        <div className="col-md-1 mb-3" style={{marginTop:"31px"}}>
                          <button className="btn" onClick={handleClear}>
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Unittable mt-5">
                    <div className="container-fluid">
                    <div className="row">
  <div className="table-responsive">
    <table className="table table-striped mt-4">

                          <thead>
                            <tr>
                              <th>SubGroup</th>
                              <th>Item</th>
                              <th>Unit</th>
                              <th>StockQty</th>
                              <th>StockUnit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.length === 0 ? (
                              <tr>
                                <td colSpan="5">No Found Data !!!</td>
                              </tr>
                            ) : (
                              data.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.SubGroup}</td>
                                  <td>{item.Item}</td>
                                  <td>{item.Unit}</td>
                                  <td>{item.StockQty}</td>
                                  <td>{item.StockUnit}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                        </div>
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

export default UnitConversion;
