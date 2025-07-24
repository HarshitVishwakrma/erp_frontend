import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../../NavBar/NavBar.js";
import SideNav from "../../../../SideNav/SideNav.js";
import { Link } from "react-router-dom";
import "./AddNewFGMovement.css";
import Cached from "@mui/icons-material/Cached.js";

const AddNewFGMovent = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemList, setShowItemList] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [heatNumbers, setHeatNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  function filterItems(items, searchString) {
    // split the input on whitespace, drop empty strings, lowercase
    const keywords = searchString
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    // if no keywords, hide list and return full list (or empty if you prefer)
    if (keywords.length === 0) {
      setShowItemList(false);
      return items;
    }

    // filter
    const filtered = items.filter((item) => {
      const partNo = item.part_no.toLowerCase();
      const desc = item.Name_Description.toLowerCase();
      // include this item if ANY keyword matches part_no OR description
      return keywords.some((kw) => partNo.includes(kw) || desc.includes(kw));
    });

    // hide when there's nothing to show
    setShowItemList(filtered.length > 0);

    return filtered;
  }

  const fetchItems = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/All_Masters/api/item/summary/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const resData = await res.json();
    console.log(resData);
    setItems(resData);
  };

  const fetchHeatNumbers = async (code) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/Store/grn/heat-numbers/?item_code=${code}`
      );
      const resData = await res.json();
      setHeatNumbers(resData.heat_numbers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    setInputValue(item.part_no); // Set the input value to the selected item
    setShowItemList(false);
    fetchHeatNumbers(item.part_no); // Pass the part_no instead of the whole item
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // If user clears the input, also clear the selected item
    if (value === "") {
      setSelectedItem(null);
      setHeatNumbers([]);
    }
    
    const fItems = filterItems(items, value);
    setFilteredItems(fItems);
  };

  return (
    <div className="NewStoreFgMoventAdd">
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
                <div className="FgMoventAdd-header">
                  <div className="row flex-nowrap align-items-center">
                    <div className="col-md-2">
                      <h5 className="header-title text-start">FG Movement</h5>
                    </div>
                    <div className="col-md-2 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-2 d-flex flex-wrap justify-content-end">
                          <select>
                            <option>Produlink</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 text-end">
                      <div className="row justify-content-end">
                        <div className="col-md-12 d-flex flex-wrap justify-content-end">
                          <Link className="FGBtn" to="/FGToFGStock">
                            New FG TO FG Movement (ShopFloor)
                          </Link>
                          <Link className="FGBtn" to="/FG-Movement">
                            FG Movement Report
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="FgMoventAdd-main">
                  <div className="container-fluid text-start">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Trn No:</label>
                          </div>
                          <div className="col-md-4">
                            <input />
                          </div>
                          <div className="col-md-4">
                            <Cached />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>FG Item:</label>
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              name="SelectItem"
                              className="form-control"
                              value={inputValue}
                              onChange={handleInputChange}
                              autoComplete="off"
                            />
                            {showItemList && (
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
                                {filteredItems.map((item) => (
                                  <li
                                    key={item.part_no}
                                    className="dropdown-item"
                                    style={{
                                      padding: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      handleSelectItem(item);
                                    }}
                                  >
                                    {item.part_no} - {item.Part_Code} -{" "}
                                    {item.Name_Description}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="col-md-4">
                            <button type="button" className="pobtn">
                              Select
                            </button>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Operation:</label>
                          </div>
                          <div className="col-md-8">
                            <input />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Ok Qty:</label>
                          </div>
                          <div className="col-md-8">
                            <input />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Rework Qty:</label>
                          </div>
                          <div className="col-md-8">
                            <input />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Reject Qty:</label>
                          </div>
                          <div className="col-md-8">
                            <input />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Remark:</label>
                          </div>
                          <div className="col-md-8">
                            <textarea></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Date:</label>
                          </div>
                          <div className="col-md-8">
                            <input type="date" />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>...</label>
                          </div>
                          <div className="col-md-8">
                            <select>
                              <option></option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Stock View:</label>
                          </div>
                          <div className="col-md-8">
                            <select>
                              <option>All</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <label>Heat Code:</label>
                          </div>
                          <div className="col-md-8">
                            <select>
                              <option value="">Select Heat Code</option>
                              {heatNumbers.length > 0 && 
                                heatNumbers.map((heat, index) => (
                                  <option key={index} value={heat.heat_no}>
                                    {heat.heat_no}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-end mt-4">
                      <div className="col-md-12">
                        <button type="submit" className="pobtn">
                          Save
                        </button>
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

export default AddNewFGMovent;