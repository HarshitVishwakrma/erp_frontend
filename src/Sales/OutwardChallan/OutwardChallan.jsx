import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../NavBar/NavBar.js";
import SideNav from "../../SideNav/SideNav.js";
import "./OutwardChallan.css";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/modals/Modal.jsx";
import VehicleModal from "../../components/modals/VehicleModal.jsx";

const initialItem = {
  item_code : "",
  type: "",
  description: "",
  store: "",
  suppRefNo: "",
  qtyNo: "",
  qtyKg: "",
  process: "",
  pkg: "",
  wRate: "",
  wValue: "",
};

const initialFooter = {
  item_code: "",
  Transport_name: "",
  EWay_bill_no: "",
  Eway_bill_Qty: "",
  challan_date: "",
  vehical_no: "",
  eway_bill_date: "",
  remarks: "",
  challan_time: "",
  Estimated_value: "",
  rev_ch_amt: "",
  DC_no: "",
  DC_date: "",
  rev_charges: 'N',
  plant: "",
  series: "",
  vender: "",
};

const OutwardChallan = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [challanNumber, setChallanNumber] = useState("");
  const [itemData, setItemData] = useState([]);
  const [filteredItemData, setFilteredItemData] = useState([]);
  const [showFilterDropDown, setShowFilterDropDown] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [showTrasportDataModel, setShowTransportDataModel] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [venders, setVenders] = useState([]);
  const [showVenderList, setShowVenderList] = useState(false);
  const [venderItems, setVenderItems] = useState([]);
  const [filteredVenderItems, setFilteredVenderItems] = useState([]);

  // The "entry" row
  const [currentItem, setCurrentItem] = useState({
    item_code : "",
    type: "",
    description: "",
    store: "",
    suppRefNo: "",
    qtyNo: "",
    qtyKg: "",
    process: "",
    pkg: "",
    wRate: "",
    wValue: "",
  });
  // The list of added items
  const [items, setItems] = useState([]);

  // All footer‐row fields
  const [footerData, setFooterData] = useState({
    Transport_name: "",
    EWay_bill_no: "",
    Eway_bill_Qty: "",
    challan_date: "",
    vehical_no: "",
    eway_bill_date: "",
    remarks: "",
    challan_time: "",
    Estimated_value: "",
    rev_ch_amt: "",
    DC_no: "",
    DC_date: "",
    rev_charges: 'N',
    plant: "",
    series: "",
    vender: "",
  });

  const handleResetAll = () => {
    setCurrentItem(initialItem);
    setItems([]);
    setFooterData(initialFooter);
  };

  const toggleSideNav = () => setSideNavOpen((p) => !p);

  function filterItemsByKeyword(items, keyword) {
    console.log(items);
    return items.filter(
      (item) =>
        item.Item?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.ItemDescription?.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const fetchVenders = async (e) => {
    setFooterData((prev) => {
      return { ...prev, vender: e.target.value };
    });
    if (e.target.value.trim().length <= 0) {
      setShowVenderList(false);
    }
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/Purchase/Fetch_Supplier_Code/?search=${e.target.value}`
      );
      const json = await res.json();
      console.log(json);
      setVenders(json);
      if (json.length > 0 && e.target.value.trim().length > 0) {
        setShowVenderList(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItemData = async () => {
    try {
      const res = await fetch(
        "https://produlink.netlify.app/api/All_Masters/api/item/summary/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setItemData(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchChallanNumber = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/Sales/generate-challan-no/"
      );
      const json = await res.json();
      setChallanNumber(json.Challan_no);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTransportData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Sales/transportdetails/");
      const resData = await res.json();
      console.log(resData);
      setTransportData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVehicleDetails = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/Sales/vehicaldetails/");
      const resData = await res.json();
      console.log(resData);
      setVehicleData(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItemsFromPO = async (query) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/Sales/inwardchallanview/?supplier=${query}`
      );
      const resData = await res.json();
      console.log("items from PO : ", resData);
      setVenderItems(resData.all_item_details);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("side-nav-open", sideNavOpen);
    fetchChallanNumber();
    fetchItemData();
    fetchTransportData();
    fetchVehicleDetails();
    fetchItemsFromPO();
  }, [sideNavOpen]);

  // Entry‐row change handlers
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemNameChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
    if (venderItems && venderItems.length > 0) {
      const filter = filterItemsByKeyword(venderItems, value);
      setFilteredItemData(filter);
    }
    if (value.length > 0) {
      setShowFilterDropDown(true);
    } else {
      setShowFilterDropDown(false);
    }
  };

  const handleAddItem = () => {
    if (
      !currentItem.description ||
      !currentItem.pkg ||
      !currentItem.process ||
      !currentItem.qtyKg ||
      !currentItem.qtyNo ||
      !currentItem.store ||
      !currentItem.suppRefNo ||
      !currentItem.type ||
      !currentItem.wRate ||
      !currentItem.wValue
    ) {
      return toast.error("fill all the values to add item.");
    }
    setItems((prev) => [...prev, currentItem]);
    setCurrentItem({
      item_code : "",
      type: "",
      description: "",
      store: "",
      suppRefNo: "",
      qtyNo: "",
      qtyKg: "",
      process: "",
      pkg: "",
      wRate: "",
      wValue: "",
    });
  };
  const handleDeleteItem = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  // Footer‐row change handler
  const handleFooterChange = (e) => {
    let { name, value } = e.target;
    if (name === "rev_charges") {
      value = value === "true" ? 'Y' : 'N';
    }

    setFooterData((prev) => ({ ...prev, [name]: value }));
  };

  // Save everything to backend
  const handleSaveChallan = async () => {
    // assemble payload

    if (items.length <= 0) {
      return toast.error("add at least one item to create challan!");
    }

    const payload = {
      challan_no: challanNumber,
      items: items,
      ...footerData,
    };

    console.log(payload);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/Sales/onward-challans/", // adjust your endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      console.log("Saved Challan:", data);
      toast.success("challan saved succefully...");
      handleResetAll();

      // TODO: show success UI, reset state if needed
    } catch (err) {
      toast.error("failed to save challan");
      console.error("Save failed:", err);
      // TODO: show error UI
    }
  };

  const handleSelectSupplier = (item) => {
    console.log(item);
    if (item) {
      setCurrentItem((prev) => {
        return {
          ...prev,
          description: item.ItemDescription,
          type: `${item.ItemDescription} (${item.Item})`,
          qtyNo: item.Qty,
          item_code : item.Item
        };
      });
      setShowFilterDropDown(false);
    }
  };

  const handleSelectVendor = async (item) => {
    try {
      setFooterData((prev) => {
        return { ...prev, vender: item.Name };
      });
      setShowVenderList(false);

      fetchItemsFromPO(item.Name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectTransportName = (item) => {
    if (item) {
      setFooterData((prev) => {
        return { ...prev, Transport_name: item.transport_name };
      });
      setShowTransportDataModel(false);
    }
  };

  const handleSelectVehicle = (item) => {
    setFooterData((prev) => {
      return { ...prev, vehicle_no: item.vehical_no };
    });
    setShowVehicleModal(false);
  };

  const handleTransportSaveButtonClick = (transport_name, eway_bill_no) => {
    console.log(transport_name, eway_bill_no);
    if (transport_name && eway_bill_no) {
      setFooterData((prev) => {
        return {
          ...prev,
          Transport_name: transport_name,
          EWay_bill_no: eway_bill_no,
        };
      });
    }
    setShowTransportDataModel(false);
  };

  const handleVehicleSave = (data) => {
    console.log(data);
    if (data) {
      setFooterData((prev) => {
        return { ...prev, vehical_no: data };
      });
    }
    setShowVehicleModal(false);
  };

  return (
    <div className="OutwardChallanMaster">
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
                <ToastContainer position="top-right" />
                <div className="OutwardChallan">
                  <div className="OutwardChallan-header mb-2 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <h5 className="header-title">Outward Challan</h5>
                      </div>
                      <div className="col-md-1">
                        {" "}
                        <label> Plant </label>{" "}
                      </div>
                      <div className="col-md-1">
                        <select className="form-control">
                          <option>ProduLink</option>
                        </select>
                      </div>

                      <div className="col-md-1">
                        {" "}
                        <label for="">Series</label>{" "}
                      </div>
                      <div className="col-md-1">
                        <select className="form-control">
                          <option> Select </option>
                          <option> 57F5 </option>
                          <option> Rework </option>
                          <option> Maintenance </option>
                          <option> OPEN </option>
                          <option> Not For Bill </option>
                          <option> Tool And Die </option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <input
                          type="text"
                          placeholder=" ## "
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-1">
                        <label for="">Vender</label>
                      </div>
                      <div className="col-md-2">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="form-control"
                          onChange={fetchVenders}
                          value={footerData.vender}
                        />
                        {showVenderList && venders && venders.length > 0 && (
                          <ul
                            className="dropdown-menu show"
                            style={{
                              width: "30%",
                              maxHeight: "200px",
                              overflowY: "auto",
                              border: "1px solid #ccc",
                              zIndex: 1000,
                            }}
                          >
                            {venders.map((item) => (
                              <li
                                key={item.id}
                                className="dropdown-item"
                                onClick={() => handleSelectVendor(item)}
                                style={{
                                  padding: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                {item.Name} ({item.Number})
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="col-md-1">
                        <button type="button" className=" vndrbtn">
                          Select
                        </button>
                      </div>
                      <div className="col-md-1">
                        <button type="button" className=" vndrbtn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="OutwardChallan-main">
                    <div className="OutwardChallan-tabs">
                      <div
                        className="tab-content"
                        id="productionEntryTabsContent"
                      >
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th className="align-middle text-center">
                                  <div className="d-flex justify-content-center align-items-center gap-3">
                                    <span>Type</span>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="fg"
                                        name="type"
                                        value="FG"
                                      />
                                      <label htmlFor="fg">FG</label>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="rm"
                                        name="type"
                                        value="RM"
                                      />
                                      <label htmlFor="rm">RM</label>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="itemmaster"
                                        name="type"
                                        value="ITEMMASTER"
                                      />
                                      <label htmlFor="itemmaster">
                                        ITEM MASTER
                                      </label>
                                    </div>
                                  </div>
                                </th>

                                <th className="align-middle text-center">
                                  Item Desc.
                                </th>

                                <th className="align-middle text-center">
                                  <div className="d-flex justify-content-center align-items-center gap-3">
                                    <span>Store</span>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="mainstore"
                                        name="store"
                                        value="MainStore"
                                      />
                                      <label htmlFor="mainstore">
                                        Main Store
                                      </label>
                                    </div>
                                    <div className="d-flex align-items-center gap-1">
                                      <input
                                        type="radio"
                                        id="reworkstore"
                                        name="store"
                                        value="ReworkStore"
                                      />
                                      <label htmlFor="reworkstore">
                                        Rework Store
                                      </label>
                                    </div>
                                  </div>
                                </th>

                                <th className="align-middle text-center">
                                  Quantity
                                </th>
                                <th className="align-middle text-center">
                                  Process/Operation
                                </th>
                                <th className="align-middle text-center">
                                  Package
                                </th>
                                <th className="align-middle text-center">
                                  Value
                                </th>
                                <th className="align-middle text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    name="type"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={currentItem.type}
                                    onChange={handleItemNameChange}
                                  />
                                  {showFilterDropDown &&
                                    filteredItemData.length > 0 && (
                                      <ul
                                        className="dropdown-menu show"
                                        style={{
                                          width: "30%",
                                          maxHeight: "200px",
                                          overflowY: "auto",
                                          border: "1px solid #ccc",
                                          zIndex: 1000,
                                        }}
                                      >
                                        {filteredItemData.map((item) => (
                                          <li
                                            key={item.Item}
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleSelectSupplier(item)
                                            }
                                            style={{
                                              padding: "5px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {item.ItemDescription}({item.Item})
                                            Rate: {item.Rate} Item size:{" "}
                                            {item.ItemSize}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </td>
                                <td>
                                  <textarea
                                    name="description"
                                    className="form-control"
                                    value={currentItem.description}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <select
                                    name="store"
                                    className="form-control mb-2"
                                    value={currentItem.store}
                                    onChange={handleItemChange}
                                  >
                                    <option value="">NOS</option>
                                    <option value="MainStore">
                                      Main Store
                                    </option>
                                    <option value="ReworkStore">
                                      Rework Store
                                    </option>
                                  </select>
                                  <div>
                                    <label>Supp. Ref. No:</label>
                                    <input
                                      type="text"
                                      name="suppRefNo"
                                      className="form-control"
                                      value={currentItem.suppRefNo}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="mb-2">
                                    <label>No:</label>
                                    <input
                                      type="text"
                                      name="qtyNo"
                                      className="form-control"
                                      value={currentItem.qtyNo}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                  <div>
                                    <label>Kg:</label>
                                    <input
                                      type="text"
                                      name="qtyKg"
                                      className="form-control"
                                      value={currentItem.qtyKg}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <textarea
                                    name="process"
                                    className="form-control"
                                    value={currentItem.process}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    name="pkg"
                                    className="form-control"
                                    value={currentItem.pkg}
                                    onChange={handleItemChange}
                                  />
                                </td>
                                <td>
                                  <div className="mb-2">
                                    <label>W. Rate:</label>
                                    <input
                                      type="text"
                                      name="wRate"
                                      className="form-control"
                                      value={currentItem.wRate}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                  <div>
                                    <label>W. Value:</label>
                                    <input
                                      type="text"
                                      name="wValue"
                                      className="form-control"
                                      value={currentItem.wValue}
                                      onChange={handleItemChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="vndrbtn"
                                    onClick={handleAddItem}
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.</th>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Heat Code</th>
                                <th>Qty</th>
                                <th>WIP Wt.</th>
                                <th>Total Wt.</th>
                                <th>Process Name</th>
                                <th>Pkg</th>
                                <th>Value</th>
                                <th>Del</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((it, idx) => (
                                <tr key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>{it.type}</td>
                                  <td>
                                    <span>HSN Code :</span>
                                    <br />
                                    {it.description}
                                  </td>
                                  <td className="text-start">
                                    Supp. Ref. NO : {it.suppRefNo}
                                  </td>
                                  <td>{it.qtyNo}</td>
                                  <td>{it.qtyKg}</td>
                                  <td></td>
                                  <td>{it.process}</td>
                                  <td>{it.pkg}</td>
                                  <td>
                                    Rate: {it.wRate}
                                    <br />
                                    Value: {it.wValue}
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        border: "1px solid black",
                                        padding: "2px 6px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleDeleteItem(idx)}
                                    >
                                      X
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              {items.length === 0 && (
                                <tr>
                                  <td>1</td>
                                  <td></td>
                                  <td>
                                    <span>HSN Code :</span>{" "}
                                  </td>
                                  <td className="text-start">
                                    Supp. Ref. NO :
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <span style={{ border: "1px solid black" }}>
                                      X
                                    </span>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <tbody>
                                <tr>
                                  <td>Challan No:</td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={challanNumber}
                                      readOnly
                                    />
                                  </td>
                                  <td>Transport Name:</td>
                                  <td>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "100%",
                                      }}
                                    >
                                      <input
                                        name="Transport_name"
                                        type="text"
                                        className="form-control"
                                        style={{ paddingRight: "30px" }}
                                        value={footerData.Transport_name}
                                        onChange={handleFooterChange}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                          color: "#6c757d",
                                        }}
                                        onClick={() => {
                                          setShowTransportDataModel(true);
                                        }}
                                      >
                                        <FaPlus></FaPlus>
                                      </span>
                                    </div>
                                  </td>
                                  <td>EWay Bill No:</td>
                                  <td>
                                    <input
                                      name="EWay_bill_no"
                                      type="text"
                                      className="form-control"
                                      value={footerData.EWay_bill_no}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>EWay Bill Qty:</td>
                                  <td>
                                    <input
                                      name="Eway_bill_Qty"
                                      type="text"
                                      className="form-control"
                                      value={footerData.Eway_bill_Qty}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Challan Date:</td>
                                  <td>
                                    <input
                                      name="challan_date"
                                      type="date"
                                      className="form-control"
                                      value={footerData.challan_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Vehicle No:</td>
                                  <td>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "100%",
                                      }}
                                    >
                                      <input
                                        name="vehical_no"
                                        type="text"
                                        className="form-control"
                                        style={{ paddingRight: "30px" }}
                                        value={footerData.vehical_no}
                                        onChange={handleFooterChange}
                                      />
                                      <span
                                        style={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          cursor: "pointer",
                                          color: "#6c757d",
                                        }}
                                        onClick={() => {
                                          setShowVehicleModal(true);
                                        }}
                                      >
                                        <FaPlus></FaPlus>
                                      </span>
                                    </div>
                                  </td>
                                  <td>EWay Bill Date:</td>
                                  <td>
                                    <input
                                      name="eway_bill_date"
                                      type="date"
                                      className="form-control"
                                      value={footerData.eway_bill_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td rowSpan="2">Remarks / Note:</td>
                                  <td rowSpan="2">
                                    <textarea
                                      name="remarks"
                                      className="form-control"
                                      value={footerData.remarks}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Challan Time:</td>
                                  <td>
                                    <input
                                      name="challan_time"
                                      type="time"
                                      className="form-control"
                                      value={footerData.challan_time}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Estimated Value:</td>
                                  <td>
                                    <input
                                      name="Estimated_value"
                                      type="text"
                                      className="form-control"
                                      value={footerData.Estimated_value}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Rev. Charges:</td>
                                  <td>
                                    <select
                                      name="rev_charges"
                                      className="form-control"
                                      value={footerData.rev_charges}
                                      onChange={handleFooterChange}
                                    >
                                      <option value={false}>No</option>
                                      <option value={true}>Yes</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td> D.C No:</td>
                                  <td>
                                    <input
                                      name="DC_no"
                                      type="text"
                                      className="form-control"
                                      value={footerData.DC_no}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>DC Date:</td>
                                  <td>
                                    <input
                                      name="DC_date"
                                      type="date"
                                      className="form-control"
                                      value={footerData.DC_date}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td>Rev.Ch.Amt:</td>
                                  <td>
                                    <input
                                      name="rev_ch_amt"
                                      type="text"
                                      className="form-control"
                                      value={footerData.rev_ch_amt}
                                      onChange={handleFooterChange}
                                    />
                                  </td>
                                  <td colSpan="2">
                                    <button
                                      className="vndrbtn btn btn-primary"
                                      onClick={handleSaveChallan}
                                    >
                                      Save Challan
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
                <Modal
                  isOpen={showTrasportDataModel}
                  items={transportData}
                  onClose={() => setShowTransportDataModel(false)}
                  handleSelect={handleSelectTransportName}
                  handleButtonClick={handleTransportSaveButtonClick}
                ></Modal>
                <VehicleModal
                  isOpen={showVehicleModal}
                  items={vehicleData}
                  onClose={() => setShowVehicleModal(false)}
                  handleSelect={handleSelectVehicle}
                  handleButtonClick={handleVehicleSave}
                ></VehicleModal>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutwardChallan;
