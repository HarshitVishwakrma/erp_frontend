import React, { useState, useEffect } from "react";
import "./ItemMasterGernal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import Npd from "../NPD/Npd";
import Technical from "../Technical/Technical.jsx";
import Data2 from "../Data2/Data2.jsx";
import CachedIcon from "@mui/icons-material/Cached";
import NewCardGrade from "../ItemGernalCard/NewCardGrade.jsx";
import NewCardGradeMaster from "../ItemGernalCard/NewCardGradeMaster.jsx";
import NewCardItemGroup from "../ItemGernalCard/NewCardItemGroup.jsx";
import NewCardItemSector from "../ItemGernalCard/NewCardItemSector.jsx";
import NewCardMainGroup from "../ItemGernalCard/NewCardMainGroup.jsx";
import NewCardRoute from "../ItemGernalCard/NewCardRoute.jsx";
import NewCardSector from "../ItemGernalCard/NewCardSector.jsx";
import NewCardStoreLocation from "../ItemGernalCard/NewCardStoreLocation.jsx";
// import NewCardTdc from "../ItemGernalCard/NewCardTdc.jsx";
import NewCardUnitCode from "../ItemGernalCard/NewCardUnitCode.jsx";
import NewCardModelType from "../ItemGernalCard/NewCardModelType.jsx";
import NewCardParentFg from "../ItemGernalCard/NewCardParentFg.jsx";

// gernal
import { saveItemMaster } from "../../../Service/Api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getItems,
  // getGrades,
  getMetalTypes,
  // getTdcs,
  getUnitCodes,
  getStoreLocations,
  getSectors,
  getRoutes,
  getParentFgCodes,
  getMainGroups,
  getItemSections,
  getItemGroups,
} from "../../../Service/Api.jsx";
const ItemMasterGernal = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showNewCardMainGroup, setShowNewCardMainGroup] = useState(false);

  const [showNewCardUnit, setShowNewCardUnit] = useState(false);
  const [showNewCardTdc, setShowNewCardTdc] = useState(false);
  const [showNewCardItemgroup, setShowNewCardItemgroup] = useState(false);
  const [showNewCardStoreLocation, setShowNewCardStoreLocation] =
    useState(false);
  const [showNewCardRoute, setShowNewCardRoute] = useState(false);
  const [showNewCardSector, setShowNewCardSector] = useState(false);
  const [showNewCardItemSector, setShowNewCardItemSector] = useState(false);
  const [showNewCardGrade, setShowNewCardGrade] = useState(false);
  const [showNewCardGradeMaster, setShowNewCardGradeMaster] = useState(false);
  const [showNewCardModelType, setShowNewCardModelType] = useState(false);
  const [showNewCardParentFg, setShowNewCardParentFg] = useState(false);
  const [items, setItems] = useState([]);
  // const [grades, setGrades] = useState([]);

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

  const handleNewCardMainGroup = (e) => {
    e.preventDefault();
    setShowNewCardMainGroup(!showNewCardMainGroup);
  };

  const handleNewButtonClick = (e) => {
    e.preventDefault();
    setShowNewCardUnit(!showNewCardUnit);
  };

  const handleNewButtonTDC = (e) => {
    e.preventDefault();
    setShowNewCardTdc(!showNewCardTdc);
  };

  const handleNewButtonItemgroup = (e) => {
    e.preventDefault();
    setShowNewCardItemgroup(!showNewCardItemgroup);
  };

  const handleNewButtonStoreLocation = (e) => {
    e.preventDefault();
    setShowNewCardStoreLocation(!showNewCardStoreLocation);
  };

  const handleNewButtonRoute = (e) => {
    e.preventDefault();
    setShowNewCardRoute(!showNewCardRoute);
  };

  const handleNewButtonSector = (e) => {
    e.preventDefault();
    setShowNewCardSector(!showNewCardSector);
  };

  const handleNewButtonItemSector = (e) => {
    e.preventDefault();
    setShowNewCardItemSector(!showNewCardItemSector);
  };

  const handleNewButtonGrade = (e) => {
    e.preventDefault();
    setShowNewCardGrade(!showNewCardGrade);
  };

  const handleNewButtonGradeMaster = (e) => {
    e.preventDefault();
    setShowNewCardGradeMaster(!showNewCardGradeMaster);
  };

  const handleNewButtonModelType = (e) => {
    e.preventDefault();
    setShowNewCardModelType(!showNewCardModelType);
  };

  const handleNewButtonParentFg = (e) => {
    e.preventDefault();
    setShowNewCardParentFg(!showNewCardParentFg);
  };

  // Gernal data
  const [formData, setFormData] = useState({
    Main_Group: "",
    SE_Item: "",
    Unit_Code: "",
    // TDC: "",
    Part_Code: "",
    Cut_Weight_kg: "",
    Rate: "",
    Revision_No: "",
    Item_Size: "",
    Heat_Treatment: "",
    Color_Code: "",
    Min_Rate: "",
   
    Length: "",
    Shape: "",
    Rate_Remark: "",
    Metal_Type: "",
    Specific_Gravity: "",
    Item_Group: "",
    Name_Description: "",
    Store_Location: "",
    Route: "",
    Parent_FG_Code: "",
    Finish_Weight: "",
    Sector: "",
    SAC_Code: "",
    Item_Sector: "",
    Hardness: "",
    Male: "",
    Max_Rate: "",
   
    Thickness: "",
    Diameter: "",
    Other_Desce: "",
    Metal: "",
    Finish: "",
   
    Subgroup: "",
    HSN_SAC_Code: "",
    Gross_Weight: "",
    Tool_Die_Life: "",
    Resharpening_Reconditionning: "",
    Item_ClassName: "",
    QC_Application: "",
    Jominy: "",
    Microstructure: "",
    Drawing_No: "",
    Width: "",
    Old_ERP_Code: "",
    Note: "",
    KgMM3: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "Main_Group",
      "SE_Item",
      "Unit_Code",
      "Part_Code",
      "Item_Group",
      "Name_Description",
      "Store_Location",
      "SAC_Code",
      "HSN_SAC_Code",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input change
  };


  const handleSaveitem = async (e) => {
    e.preventDefault();

    console.log("Form data before validation:", formData);

    if (!validateForm()) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      console.log("Attempting to save data...");
      const result = await saveItemMaster(formData);
      console.log("Data saved successfully:", result);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error occurred while saving data:", {
        message: error.message,
        stack: error.stack,
      });
      toast.error("Failed to save data.");
    }
  };

  const handleClear = () => {
    setFormData({
      Main_Group: "",
      SE_Item: "",
      Unit_Code: "",
      // TDC: "",
      Part_Code: "",
      Cut_Weight_kg: "",
      Rate: "",
      Revision_No: "",
      Item_Size: "",
      Heat_Treatment: "",
      Color_Code: "",
      Min_Rate: "",
     
      Length: "",
      Shape: "",
      Rate_Remark: "",
      Metal_Type: "",
      Specific_Gravity: "",
      Item_Group: "",
      Name_Description: "",
      Store_Location: "",
      Route: "",
      Parent_FG_Code: "",
      Finish_Weight: "",
      Sector: "",
      SAC_Code: "",
      Item_Sector: "",
      Hardness: "",
      Male: "",
      Max_Rate: "",
    
      Thickness: "",
      Diameter: "",
      Other_Desce: "",
      Metal: "",
      Finish: "",
    
      Subgroup: "",
      HSN_SAC_Code: "",
      Gross_Weight: "",
      Tool_Die_Life: "",
      Resharpening_Reconditionning: "",
      Item_ClassName: "",
      QC_Application: "",
      Jominy: "",
      Microstructure: "",
      Drawing_No: "",
      Width: "",
      Old_ERP_Code: "",
      Note: "",
      KgMM3: "",
    });
    setErrors({});
    console.log("data clear");
  };

  // Subgroup
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response);
    } catch (error) {
      console.error("Error fetching qty packs:", error);
    }
  };

  // fetch grade

  // useEffect(() => {
  //   fetchGrades();
  // }, []);
  // const fetchGrades = async () => {
  //   try {
  //     const response = await getGrades();
  //     setGrades(response);
  //   } catch (error) {
  //     console.error("Error fetching qty packs:", error);
  //   }
  // };

  // metal type
  const [metalTypes, setMetalTypes] = useState([]);
  useEffect(() => {
    fetchMetalTypes();
  }, []);

  const fetchMetalTypes = async () => {
    try {
      const response = await getMetalTypes();
      setMetalTypes(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // // TDC
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetchTdcs();
  // }, []);
  // const fetchTdcs = async () => {
  //   try {
  //     const response = await getTdcs();
  //     setData(response);
  //   } catch (error) {
  //     console.error("Error fetching metal types:", error);
  //   }
  // };

  // unit code
  const [unitCode, setUnitCode] = useState([]);
  useEffect(() => {
    fetchunitcode();
  }, []);
  const fetchunitcode = async () => {
    try {
      const response = await getUnitCodes();
      setUnitCode(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // Store Location
  const [storelocation, setStoreLocation] = useState([]);

  useEffect(() => {
    fetchstorelocation();
  }, []);
  const fetchstorelocation = async () => {
    try {
      const response = await getStoreLocations();
      setStoreLocation(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  //  Sector
  const [Sector, setSector] = useState([]);
  useEffect(() => {
    fetchSector();
  }, []);
  const fetchSector = async () => {
    try {
      const response = await getSectors();
      setSector(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // Route
  const [Route, setRoute] = useState([]);
  useEffect(() => {
    fetchRoute();
  }, []);
  const fetchRoute = async () => {
    try {
      const response = await getRoutes();
      setRoute(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // Parent FG
  const [ParentFG, setParentFG] = useState([]);
  useEffect(() => {
    fetchParentFG();
  }, []);
  const fetchParentFG = async () => {
    try {
      const response = await getParentFgCodes();
      setParentFG(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // Main Group
  const [MainGroup, setMainGroup] = useState([]);
  useEffect(() => {
    fetchMainGroup();
  }, []);
  const fetchMainGroup = async () => {
    try {
      const response = await getMainGroups();
      setMainGroup(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // item sector
  const [ItemSection, setItemSection] = useState([]);
  useEffect(() => {
    fetchItemSection();
  }, []);
  const fetchItemSection = async () => {
    try {
      const response = await getItemSections();
      setItemSection(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  // item Group
  const [itemGroups, setItemGroups] = useState([]);
  useEffect(() => {
    fetchitemGroups();
  }, []);
  const fetchitemGroups = async () => {
    try {
      const response = await getItemGroups();
      setItemGroups(response);
    } catch (error) {
      console.error("Error fetching metal types:", error);
    }
  };

  return (
    <div className="Itemmastergernalpage">
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
                <div className="axcv">
                  <ToastContainer />
                  <div className="top-but3">
                    <div className="row align-items-center">
                      <div className="col-md-2 text-start">
                        <p>Item List</p>
                      </div>
                      <div className="col-md-10 text-end">
                        <div className="d-flex align-items-center justify-content-end">
                          <label htmlFor="input" className="me-2">
                            Search Item For Copy
                          </label>
                          <input type="text" id="input" className="me-2" />
                          <button className="btn-uper me-2">Copy Item</button>
                          <button className="btn-uper me-2">
                            Section Group Master
                          </button>
                          <button className="btn-uper">Item List</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="itemmastergernal">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <ul
                            className="nav nav-pills mb-3"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                General
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                Data-2
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                              >
                                Technical Specification
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="pills-about-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-about"
                                type="button"
                                role="tab"
                                aria-controls="pills-about"
                                aria-selected="false"
                              >
                                NPD
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabIndex="0"
                            >
                              <div className="container">
                                <div className="gerneral">
                                  <div className="container">
                                    <form>
                                      <div className="row">
                                        <p
                                          className="mandatory  text-start"
                                          style={{
                                            marginTop: "10px",
                                            color: "grey",
                                            marginBottom: "50px",
                                          }}
                                        >
                                          Mandatory Fields
                                        </p>
                                        <div className="col-md-4">
                                          <div className="row text-start">
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Main_Group"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Main Group: <span className="text-danger">
                                                *
                                              </span>
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  name="Main_Group"
                                                  id="Main_Group"
                                                  className="form-select"
                                                  value={formData.Main_Group}
                                                  onChange={handleInputChange}
                                                >
                                                  <option
                                                    selected
                                                    style={{ color: "black" }}
                                                  >
                                                    Select ..
                                                  </option>
                                                  {MainGroup.map((Main) => (
                                                    <option
                                                      key={Main.id}
                                                      value={
                                                        Main.Sub_Group_Name
                                                      }
                                                    >
                                                      {Main.Sub_Group_Name}
                                                    </option>
                                                  ))}
                                                  <option value="FG">FG</option>
                                                  <option value="RM">RM</option>
                                                  <option value="Tool">
                                                    Tool
                                                  </option>
                                                  <option value="Instrument">
                                                    Instrument
                                                  </option>
                                                  <option value="Machine">
                                                    Machine
                                                  </option>
                                                  <option value="Consumable">
                                                    Consumable
                                                  </option>
                                                  <option value="SafetyEqu">
                                                    Safety Equ
                                                  </option>
                                                  <option value="Service">
                                                    Service
                                                  </option>
                                                  <option value="Assest">
                                                    Assest
                                                  </option>
                                                  <option value="F4">F4</option>
                                                  <option value="Scrap">
                                                    Scrap
                                                  </option>
                                                  <option value="SF">SF</option>
                                                  <option value="BO">BO</option>
                                                  <option value="DI">DI</option>
                                                </select>
                                                {errors.Main_Group && (
                                                  <div className="text-danger">
                                                    {errors.Main_Group}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewCardMainGroup
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="SE_Item"
                                                className="col-sm-5 col-form-label"
                                              >
                                               Part No: <span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="SE_Item"
                                                  name="SE_Item"
                                                  value={formData.SE_Item}
                                                  onChange={handleInputChange}
                                                  style={{ width: "115%" }}
                                                />
                                                {errors.SE_Item && (
                                                  <div className="text-danger">
                                                    {errors.SE_Item}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Unit_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Unit Code:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Unit_Code"
                                                  name="Unit_Code"
                                                  className="form-select"
                                                  value={formData.Unit_Code}
                                                  onChange={handleInputChange}
                                                >
                                                  <option selected>
                                                    Select ..
                                                  </option>
                                                  {unitCode.map((unit) => (
                                                    <option
                                                      key={unit.id}
                                                      value={unit.UnitName}
                                                    >
                                                      {unit.UnitName}
                                                    </option>
                                                  ))}
                                                  <option>PCS</option>
                                                  <option>KGS</option>
                                                  <option>Box</option>
                                                  <option>LTR</option>
                                                  <option>NOS</option>
                                                  <option>SQFT</option>
                                                  <option>MTR</option>
                                                  <option>FOOT</option>
                                                  <option>SQMTR</option>
                                                  <option>PAIR</option>
                                                  <option>BAG</option>
                                                  <option>PACKET</option>
                                                  <option>RIM</option>
                                                  <option>SET</option>
                                                  <option>MT</option>
                                                  <option>PER DAY</option>
                                                  <option>DOZEN</option>
                                                  <option>JOB</option>
                                                  <option>SQINCh</option>
                                                </select>
                                                {errors.Unit_Code && (
                                                  <div className="text-danger">
                                                    {errors.Unit_Code}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={handleNewButtonClick}
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>

                                            {/* <div className="row mb-3">
                                              <label
                                                htmlFor="TDC"
                                                className="col-sm-5 col-form-label"
                                              >
                                                TDC:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="TDC"
                                                  className="form-select"
                                                  value={formData.TDC}
                                                  name="TDC"
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {data.map((Tdc) => (
                                                    <option
                                                      key={Tdc.id}
                                                      value={Tdc.Name}
                                                    >
                                                      {Tdc.Name}
                                                    </option>
                                                  ))}
                                                  <option value="FA">FA</option>
                                                  <option value="FB">FB</option>
                                                </select>
                                                {errors.TDC && (
                                                  <div className="text-danger">
                                                    {errors.TDC}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={handleNewButtonTDC}
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div> */}
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Part_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Item/Part Code:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Part_Code"
                                                  name="Part_Code"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Part_Code}
                                                  onChange={handleInputChange}
                                                />
                                                {errors.Part_Code && (
                                                  <div className="text-danger">
                                                    {errors.Part_Code}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value=""
                                                  id="flexCheckDefault"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  for="flexCheckDefault"
                                                >
                                                  Same As Part No
                                                </label>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Cut_Weight_kg"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Cut Weight kg:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Cut_Weight_kg"
                                                  name="Cut_Weight_kg"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Cut_Weight_kg}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Cut_Weight_kg && (
                                                  <div className="text-danger">
                                                    {errors.Cut_Weight_kg}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Rate"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Rate:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Rate"
                                                  name="Rate"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Rate}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Rate && (
                                                  <div className="text-danger">
                                                    {errors.Rate}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <p
                                              className="mandatory  text-start"
                                              style={{
                                                marginTop: "30px",
                                                color: "grey",
                                              }}
                                            >
                                              Optional Fields
                                            </p>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Revision_No"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Revision No:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Revision_No"
                                                  name="Revision_No"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Revision_No}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Revision_No && (
                                                  <div className="text-danger">
                                                    {errors.Revision_No}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Item_Size"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Item Size:
                                              </label>
                                              <div className="col-sm-4">
                                                <input
                                                  type="text"
                                                  id="Item_Size"
                                                  name="Item_Size"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Item_Size}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Item_Size && (
                                                  <div className="text-danger">
                                                    {errors.Item_Size}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-3">
                                                <select
                                                  id="Item_Size"
                                                  className="form-select"
                                                  value={formData.Item_Size}
                                                  onChange={handleInputChange}
                                                  name="Item_Size"
                                                >
                                                  <option selected>
                                                    Select ..
                                                  </option>
                                                  <option>BLOCK</option>
                                                  <option>D/A</option>
                                                  <option>@</option>
                                                  <option>PLATE</option>
                                                  <option>RCS</option>
                                                  <option>RD</option>
                                                  <option>SQ</option>
                                                </select>
                                                {/* {errors.Item_Size && (
                                                  <div className="text-danger">
                                                    {errors.Item_Size}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Heat_Treatment"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Heat Treatment:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  name="Heat_Treatment"
                                                  id="Heat_Treatment"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={
                                                    formData.Heat_Treatment
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Heat_Treatment && (
                                                  <div className="text-danger">
                                                    {errors.Heat_Treatment}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Color_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Color Code:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Color_Code"
                                                  name="Color_Code"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Color_Code}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Color_Code && (
                                                  <div className="text-danger">
                                                    {errors.Color_Code}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Min_Rate"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Min Rate:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Min_Rate"
                                                  name="Min_Rate"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Min_Rate}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Min_Rate && (
                                                  <div className="text-danger">
                                                    {errors.Min_Rate}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                         
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Length"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Length (MM):
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Length"
                                                  name="Length"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Length}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Length && (
                                                  <div className="text-danger">
                                                    {errors.Length}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Shape"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Shape:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Shape"
                                                  name="Shape"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Shape}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Shape && (
                                                  <div className="text-danger">
                                                    {errors.Shape}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Rate_Remark"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Rate Remark:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Rate_Remark"
                                                  name="Rate_Remark"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Rate_Remark}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Rate_Remark && (
                                                  <div className="text-danger">
                                                    {errors.Rate_Remark}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Metal_Type"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Metal Type:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Metal_Type"
                                                  className="form-select"
                                                  value={formData.Metal_Type}
                                                  name="Metal_Type"
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {metalTypes.map((metal) => (
                                                    <option
                                                      key={metal.id}
                                                      value={metal.MetalType}
                                                    >
                                                      {metal.MetalType}
                                                    </option>
                                                  ))}
                                                  <option value="FA">FA</option>
                                                  <option value="FB">FB</option>
                                                </select>
                                                {/* {errors.Metal_Type && (
                                                  <div className="text-danger">
                                                    {errors.Metal_Type}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonModelType
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="row text-start">
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Specific_Gravity"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Specific Gravity:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  name="Specific_Gravity"
                                                  id="Specific_Gravity"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={
                                                    formData.Specific_Gravity
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Specific_Gravity && (
                                                  <div className="text-danger">
                                                    {errors.Specific_Gravity}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Item_Group"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Item Group:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Item_Group"
                                                  name="Item_Group"
                                                  className="form-select"
                                                  value={formData.Item_Group}
                                                  onChange={handleInputChange}
                                                >
                                                  <option
                                                    selected
                                                    style={{ color: "black" }}
                                                  >
                                                    Select ..
                                                  </option>
                                                  {itemGroups.map((group) => (
                                                    <option
                                                      key={group.id}
                                                      value={group.GroupName}
                                                    >
                                                      {group.GroupName}
                                                    </option>
                                                  ))}
                                                  <option>END PIECE</option>
                                                  <option>MACHINNING</option>
                                                  <option>BELTS</option>
                                                  <option>BEARING</option>
                                                  <option>
                                                    COLLETS & HOLDERS
                                                  </option>
                                                  <option>CAMS</option>
                                                  <option>CUTTING TOOL</option>
                                                  <option>
                                                    ELECTRICAL PARTS
                                                  </option>
                                                  <option>FORMING TOOLS</option>
                                                  <option>
                                                    GAUGES &INSTUMENTS
                                                  </option>
                                                  <option>GENRAL</option>
                                                  <option>HOLDERS</option>
                                                  <option>INSERTS</option>
                                                  <option>MACHINE SPARE</option>
                                                  <option>
                                                    OIL & LUBRICANTS
                                                  </option>
                                                  <option>PACKING</option>
                                                  <option>SERVICES</option>
                                                  <option>STATIONARY</option>
                                                  <option>TOOLING SPARE</option>
                                                </select>
                                                {errors.Item_Group && (
                                                  <div className="text-danger">
                                                    {errors.Item_Group}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonItemgroup
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Name_Description"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Name Description:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  name="Name_Description"
                                                  id="Name_Description"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={
                                                    formData.Name_Description
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                {errors.Name_Description && (
                                                  <div className="text-danger">
                                                    {errors.Name_Description}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Store_Location"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Store Location:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Store_Location"
                                                  name="Store_Location"
                                                  className="form-select"
                                                  value={
                                                    formData.Store_Location
                                                  }
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {storelocation.map(
                                                    (store) => (
                                                      <option
                                                        key={store.id}
                                                        value={
                                                          store.EnterStoreName
                                                        }
                                                      >
                                                        {store.EnterStoreName}
                                                      </option>
                                                    )
                                                  )}
                                                  <option>Store</option>
                                                  <option>Maintenance</option>
                                                </select>
                                                {errors.Store_Location && (
                                                  <div className="text-danger">
                                                    {errors.Store_Location}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonStoreLocation
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Route"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Route:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Route"
                                                  name="Route"
                                                  className="form-select"
                                                  value={formData.Route}
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {Route.map((Route) => (
                                                    <option
                                                      key={Route.id}
                                                      value={Route.Name}
                                                    >
                                                      {Route.Name}
                                                    </option>
                                                  ))}
                                                  <option value="SF">SF</option>
                                                  <option value="BO">BO</option>
                                                  <option value="DI">DI</option>
                                                </select>
                                                {/* {errors.Route && (
                                                  <div className="text-danger">
                                                    {errors.Route}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={handleNewButtonRoute}
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Parent_FG_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Parent FG Code:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Parent_FG_Code"
                                                  className="form-select"
                                                  value={
                                                    formData.Parent_FG_Code
                                                  }
                                                  name="Parent_FG_Code"
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {ParentFG.map((Parent) => (
                                                    <option
                                                      key={Parent.id}
                                                      value={
                                                        Parent.Parent_FG_Code
                                                      }
                                                    >
                                                      {Parent.Parent_FG_Code}
                                                    </option>
                                                  ))}
                                                  <option value="FA">FA</option>
                                                  <option value="FB">FB</option>
                                                </select>
                                                {/* {errors.Parent_FG_Code && (
                                                  <div className="text-danger">
                                                    {errors.Parent_FG_Code}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonParentFg
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Finish_Weight"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Finish Weight (KG):
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Finish_Weight"
                                                  name="Finish_Weight"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Finish_Weight}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Finish_Weight && (
                                                  <div className="text-danger">
                                                    {errors.Finish_Weight}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Sector"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Sector:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Sector"
                                                  name="Sector"
                                                  className="form-select"
                                                  value={formData.Sector}
                                                  onChange={handleInputChange}
                                                >
                                                  <option
                                                    selected
                                                    style={{ color: "black" }}
                                                  >
                                                    Select ..
                                                  </option>
                                                  {Sector.map((Sector) => (
                                                    <option
                                                      key={Sector.id}
                                                      value={Sector.Sector_Name}
                                                    >
                                                      {Sector.Sector_Name}
                                                    </option>
                                                  ))}
                                                  <option>SF</option>
                                                  <option>BO</option>
                                                  <option>DI</option>
                                                </select>
                                                {/* {errors.Sector && (
                                                  <div className="text-danger">
                                                    {errors.Sector}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonSector
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="SAC_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                SAC Code:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="SAC_Code"
                                                  name="SAC_Code"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.SAC_Code}
                                                  onChange={handleInputChange}
                                                />
                                                {errors.SAC_Code && (
                                                  <div className="text-danger">
                                                    {errors.SAC_Code}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Item_Sector"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Item Sector:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Item_Sector"
                                                  type="text"
                                                  name="Item_Sector"
                                                  className="form-select"
                                                  value={formData.Item_Sector}
                                                  onChange={handleInputChange}
                                                >
                                                  <option
                                                    selected
                                                    style={{ color: "black" }}
                                                  >
                                                    Select ..
                                                  </option>
                                                  {ItemSection.map(
                                                    (itemselect) => (
                                                      <option
                                                        key={itemselect.id}
                                                        value={
                                                          itemselect.Section_Name
                                                        }
                                                      >
                                                        {
                                                          itemselect.Section_Name
                                                        }
                                                      </option>
                                                    )
                                                  )}
                                                  <option>SF</option>
                                                  <option>BO</option>
                                                  <option>DI</option>
                                                </select>
                                                {/* {errors.Item_Sector && (
                                                  <div className="text-danger">
                                                    {errors.Item_Sector}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonSector
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Hardness"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Hardness (BHN):
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Hardness"
                                                  name="Hardness"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Hardness}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Hardness && (
                                                  <div className="text-danger">
                                                    {errors.Hardness}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="inputEmail3"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Male:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Male"
                                                  name="Male"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Male}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Male && (
                                                  <div className="text-danger">
                                                    {errors.Male}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Max_Rate"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Max Rate:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Max_Rate"
                                                  name="Max_Rate"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Max_Rate}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Max_Rate && (
                                                  <div className="text-danger">
                                                    {errors.Max_Rate}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                           
                                            <div className="row mb-3">
                                              <label
                                                for="Thickness"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Thickness:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Thickness"
                                                  name="Thickness"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Thickness}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Thickness && (
                                                  <div className="text-danger">
                                                    {errors.Thickness}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Diameter"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Diameter:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Diameter"
                                                  name="Diameter"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Diameter}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Diameter && (
                                                  <div className="text-danger">
                                                    {errors.Diameter}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                for="Other_Desce"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Other Desc:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Other_Desce"
                                                  name="Other_Desce"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Other_Desce}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Other_Desce && (
                                                  <div className="text-danger">
                                                    {errors.Other_Desce}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            {/* <div className="row mb-3">
                                              <label
                                                for="Grade"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Grade:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  type="text"
                                                  id="Grade"
                                                  name="Grade"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Grade}
                                                  onChange={handleInputChange}
                                                />
                                                {errors.Grade && (
                                                  <div className="text-danger">
                                                    {errors.Grade}
                                                  </div>
                                                )}
                                              </div>
                                            </div> */}
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="row text-start">
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Metal"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Metal:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Metal"
                                                  name="Metal"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Metal}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Metal && (
                                                  <div className="text-danger">
                                                    {errors.Metal}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Finish"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Finish:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Finish"
                                                  name="Finish"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Finish}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Finish && (
                                                  <div className="text-danger">
                                                    {errors.Finish}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>

                                            {/* <div className="row mb-3">
                                              <label
                                                htmlFor="Type"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Type/Grade:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Type"
                                                  name="Type"
                                                  className="form-select"
                                                  value={formData.Type}
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {grades.map((item) => (
                                                    <option
                                                      key={item.id}
                                                      value={
                                                        item.Item_Grade_Name
                                                      }
                                                    >
                                                      {item.Item_Grade_Name}
                                                    </option>
                                                  ))}
                                                  <option value="SF">Type</option>
                                                  <option value="BO">V</option>
                                                  <option value="DI">NV</option>
                                                </select>
                                                {errors.Type && (
                                                  <div className="text-danger">
                                                    {errors.Type}
                                                  </div>
                                                )}
                                              </div>

                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={handleNewButtonGrade}
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div> */}


                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Subgroup"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Subgroup:
                                              </label>
                                              <div className="col-sm-4">
                                                <select
                                                  id="Subgroup"
                                                  name="Subgroup"
                                                  className="form-select"
                                                  value={formData.Subgroup}
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  {items.map((item) => (
                                                    <option
                                                      key={item.id}
                                                      value={item.Sub_Group}
                                                    >
                                                      {item.Sub_Group}
                                                    </option>
                                                  ))}
                                              
                                                </select>
                                                {/* {errors.Subgroup && (
                                                  <div className="text-danger">
                                                    {errors.Subgroup}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="col-sm-2">
                                                <button
                                                  className="btn"
                                                  onClick={
                                                    handleNewButtonGradeMaster
                                                  }
                                                >
                                                  New
                                                </button>
                                              </div>
                                              <div className="col-sm-1">
                                                <button
                                                  className="btn"
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <CachedIcon />
                                                </button>
                                              </div>
                                            </div>
                                            <div className="row mb-5">
                                              <label
                                                htmlFor="HSN_SAC_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                HSN/SAC Code:<span className="text-danger">*</span>
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="HSN_SAC_Code"
                                                  name="HSN_SAC_Code"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.HSN_SAC_Code}
                                                  onChange={handleInputChange}
                                                />
                                                {errors.HSN_SAC_Code && (
                                                  <div className="text-danger">
                                                    {errors.HSN_SAC_Code}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Gross_Weight"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Gross Weight (kg):
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Gross_Weight"
                                                  name="Gross_Weight"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Gross_Weight}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Gross_Weight && (
                                                  <div className="text-danger">
                                                    {errors.Gross_Weight}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Tool_Die_Life"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Tool/Die Life:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Tool_Die_Life"
                                                  name="Tool_Die_Life"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Tool_Die_Life}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Tool_Die_Life && (
                                                  <div className="text-danger">
                                                    {errors.Tool_Die_Life}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Resharpening_Reconditionning"
                                                className="col-sm-5 col-form-label"
                                              >
                                                No of
                                                Resharpening_Reconditionning/Reconditioning:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Resharpening_Reconditionning"
                                                  name="Resharpening_Reconditionning"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={
                                                    formData.Resharpening_Reconditionning
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Resharpening_Reconditionning && (
                                                  <div className="text-danger">
                                                    {
                                                      errors.Resharpening_Reconditionning
                                                    }
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Item_ClassName"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Item Class:
                                              </label>
                                              <div className="col-sm-7">
                                              <select
                                                  id="Item_ClassName"
                                                  name="Item_ClassName"
                                                  className="form-select"
                                                  value={formData.Item_ClassName}
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  
                                                  <option value="SF">A</option>
                                                  <option value="BO">B</option>
                                                  <option value="BO">C</option>

                                                  <option value="DI">D</option>
                                                </select>
                                            
                                                {/* {errors.Item_ClassName && (
                                                  <div className="text-danger">
                                                    {errors.Item_ClassName}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="QC_Application"
                                                className="col-sm-5 col-form-label"
                                              >
                                                QC Application:
                                              </label>
                                              <div className="col-sm-7">
                                              <select
                                                  id="QC_Application"
                                                  name="QC_Application"
                                                  className="form-select"
                                                  value={formData.QC_Application}
                                                  onChange={handleInputChange}
                                                >
                                                  <option value="">
                                                    Select ..
                                                  </option>
                                                  
                                                  <option value="SF">Yes</option>
                                                  <option value="BO">No</option>
                                                 
                                                </select>
                                               
                                                {/* {errors.QC_Application && (
                                                  <div className="text-danger">
                                                    {errors.QC_Application}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Jominy"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Jominy:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Jominy"
                                                  name="Jominy"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Jominy}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Jominy && (
                                                  <div className="text-danger">
                                                    {errors.Jominy}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Microstructure"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Microstructure:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Microstructure"
                                                  name="Microstructure"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={
                                                    formData.Microstructure
                                                  }
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Microstructure && (
                                                  <div className="text-danger">
                                                    {errors.Microstructure}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Drawing_No"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Drawing No:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Drawing_No"
                                                  name="Drawing_No"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Drawing_No}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Drawing_No && (
                                                  <div className="text-danger">
                                                    {errors.Drawing_No}
                                                  </div>
                                                )} */}
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value=""
                                                  id="flexCheckDefault"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  for="flexCheckDefault"
                                                >
                                                  Sent(FG)Part Code
                                                </label>
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Width"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Width:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Width"
                                                  name="Width"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Width}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Width && (
                                                  <div className="text-danger">
                                                    {errors.Width}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Old_ERP_Code"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Old ERP Code:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Old_ERP_Code"
                                                  name="Old_ERP_Code"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Old_ERP_Code}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Old_ERP_Code && (
                                                  <div className="text-danger">
                                                    {errors.Old_ERP_Code}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="Note"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Note:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="Note"
                                                  name="Note"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.Note}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.Note && (
                                                  <div className="text-danger">
                                                    {errors.Note}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                            <div className="row mb-3">
                                              <label
                                                htmlFor="KgMM3"
                                                className="col-sm-5 col-form-label"
                                              >
                                                Kg/MM³:
                                              </label>
                                              <div className="col-sm-7">
                                                <input
                                                  id="KgMM3"
                                                  name="KgMM3"
                                                  type="text"
                                                  className="form-control"
                                                  style={{ width: "115%" }}
                                                  value={formData.KgMM3}
                                                  onChange={handleInputChange}
                                                />
                                                {/* {errors.KgMM3 && (
                                                  <div className="text-danger">
                                                    {errors.KgMM3}
                                                  </div>
                                                )} */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-3">
                                          <div className="row">
                                            <div className="col-md-4 text-start">
                                              <label
                                                className="form-check-label"
                                                for="flexCheckDefault"
                                              >
                                                Active:
                                              </label>
                                            </div>
                                            <div className="col-md-4 text-start">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value=""
                                                  id="flexCheckDefault"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  for="flexCheckDefault"
                                                >
                                                  Sales
                                                </label>
                                              </div>
                                            </div>

                                            <div className="col-md-4 text-start">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value=""
                                                  id="flexCheckDefault"
                                                />
                                                <label
                                                  className="form-check-label"
                                                  for="flexCheckDefault"
                                                >
                                                  Purchase
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-9 text-end">
                                          <div className="row mb-3">
                                            <div className="col-sm-12 text-end">
                                              <button
                                                className="btn me-2"
                                                onClick={handleSaveitem}
                                              >
                                                Save
                                              </button>
                                              <button
                                                className="btn"
                                                onClick={handleClear}
                                              >
                                                Clear
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              {showNewCardMainGroup && (
                                <div className="new-card-overlay">
                                  <div className="new-card">
                                    <div className="card">
                                      <div className="card-header">
                                        <div className="row">
                                          <div className="col-md-6 text-start">
                                            <h5
                                              className="card-title text-start"
                                              style={{ color: "blue" }}
                                            >
                                              Item Unit Master
                                            </h5>
                                          </div>
                                          <div className="col-md-6 text-end">
                                            <button
                                              className="btn-cl"
                                              style={{
                                                margin: "5px",
                                                color: "gray",
                                                border: "none",
                                                padding: "10px",
                                              }}
                                              onClick={handleNewCardMainGroup}
                                            >
                                              X
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <NewCardMainGroup />
                                    </div>
                                  </div>
                                </div>
                              )}
                              {showNewCardUnit && (
                                <div className="new-card-overlay">
                                  <div className="new-card">
                                    <div className="card">
                                      <div className="card-header">
                                        <div className="row">
                                          <div className="col-md-6 text-start">
                                            <h5
                                              className="card-title text-start"
                                              style={{ color: "blue" }}
                                            >
                                              Item Unit Master
                                            </h5>
                                          </div>
                                          <div className="col-md-6 text-end">
                                            <button
                                              className="btn-cl"
                                              style={{
                                                margin: "5px",
                                                color: "gray",
                                                border: "none",
                                                padding: "10px",
                                              }}
                                              onClick={handleNewButtonClick}
                                            >
                                              X
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <NewCardUnitCode />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardTdc && (
                                <div className="TdcCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Item TDC Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={handleNewButtonTDC}
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        {/* <NewCardTdc /> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {showNewCardItemgroup && (
                                <div className="itemgroup">
                                  <div className="itemgroup-overlay">
                                    <div className="itemgroup-card ">
                                      <div className="card-header">
                                        <div className="row">
                                          <div className="col-md-6 text-start">
                                            <h5 className="card-title text-start">
                                              Item Group Master Name
                                            </h5>
                                          </div>
                                          <div className="col-md-6 text-end">
                                            <button
                                              className="btn-cl justify-content-end"
                                              style={{
                                                margin: "5px",
                                                color: "gray",
                                                border: "none",
                                                padding: "10px",
                                              }}
                                              onClick={handleNewButtonItemgroup}
                                            >
                                              X
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <NewCardItemGroup />
                                    </div>
                                  </div>
                                </div>
                              )}
                              {showNewCardStoreLocation && (
                                <div className="Store-overlay">
                                  <div className="Store-card">
                                    <div className="card">
                                      <div className="card-header">
                                        <div className="row">
                                          <div className="col-md-6 text-start">
                                            <h5
                                              className="card-title text-start"
                                              style={{ color: "blue" }}
                                            >
                                              Store Location
                                            </h5>
                                          </div>
                                          <div className="col-md-6 text-end">
                                            <button
                                              className="btn-cl"
                                              style={{
                                                margin: "5px",
                                                color: "gray",
                                                border: "none",
                                                padding: "10px",
                                              }}
                                              onClick={
                                                handleNewButtonStoreLocation
                                              }
                                            >
                                              X
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <NewCardStoreLocation />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardRoute && (
                                <div className="RouteCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Item Route Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={handleNewButtonRoute}
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardRoute />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardSector && (
                                <div className="SectorCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Sector Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={handleNewButtonSector}
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardSector />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardGrade && (
                                <div className="RouteCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Grade Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={handleNewButtonGrade}
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardGrade />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardGradeMaster && (
                                <div className="RouteCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                New Grade Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={
                                                  handleNewButtonGradeMaster
                                                }
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardGradeMaster />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardItemSector && (
                                <div className="RouteCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Item Sector Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={
                                                  handleNewButtonItemSector
                                                }
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardItemSector />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardModelType && (
                                <div className="RouteCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Model Type Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={
                                                  handleNewButtonModelType
                                                }
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardModelType />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showNewCardParentFg && (
                                <div className="RouteCard">
                                  <div className="new-card-overlay">
                                    <div className="new-card">
                                      <div className="card">
                                        <div className="card-header">
                                          <div className="row">
                                            <div className="col-md-6 text-start">
                                              <h5 className="card-title text-start">
                                                Parent Fg Master
                                              </h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                              <button
                                                className="btn-cl justify-content-end"
                                                style={{
                                                  margin: "5px",
                                                  color: "gray",
                                                  border: "none",
                                                  padding: "10px",
                                                }}
                                                onClick={
                                                  handleNewButtonParentFg
                                                }
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <NewCardParentFg />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabIndex="0"
                            >
                              <Data2 />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabIndex="0"
                            >
                              <Technical />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-about"
                              role="tabpanel"
                              aria-labelledby="pills-about-tab"
                              tabIndex="0"
                            >
                              <Npd />
                            </div>
                          </div>
                        </div>
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

export default ItemMasterGernal;
