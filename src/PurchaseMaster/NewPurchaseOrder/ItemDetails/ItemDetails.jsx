import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteItem, fetchItemFields, fetchItemDetails } from "../../../Service/PurchaseApi";
import { toast, ToastContainer } from "react-toastify";
import { getUnitCode } from "../../../Service/Api";
import "./ItemDetails.css";

const ItemDetails = ({ updateFormData, supplierCode }) => {
  const [itemDetails, setItemDetails] = useState([]); // Store item details
  const [searchResults, setSearchResults] = useState([]); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [currentItem, setCurrentItem] = useState({
    Item: "",
    ItemDescription: "",
    ItemSize: "",
    Rate: "",
    HSN_SAC_Code: "",
    Number: supplierCode || "",
    Disc: "",
    Qty: "",
    Unit: "",
    Particular: "",
    Mill_Name: "",
    DeliveryDt: "",
  });
  
  const [unitCodes, setUnitCodes] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null); // Store current item ID dynamically

  useEffect(() => {
    console.log("Current Item ID:", currentItemId);
    const loadItems = async () => {
      if (currentItemId) {
        try {
          const response = await fetchItemDetails(currentItemId);
          console.log("Fetched Data:", response);
    
          if (response && response.data) {
            setItemDetails([response.data]); // wrap in array to match expected structure
          } else {
            toast.error("No item details found.");
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            toast.error("Item not found. Please check the ID.");
          } else {
            toast.error("Error fetching item details.");
          }
          console.error("Error fetching item details:", error);
        }
      }
    };
    
    loadItems();
  }, [currentItemId]);
  
  // Fetch unit codes on mount
  useEffect(() => {
    const fetchUnitCodes = async () => {
      try {
        const data = await getUnitCode();
        setUnitCodes(data);
      } catch (error) {
        console.error("Error fetching unit codes:", error);
      }
    };
    fetchUnitCodes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]:
        name === "Rate" || name === "Qty" || name === "Disc"
          ? Number(value) || 0
          : value,
    }));
  };

  useEffect(() => {
    setCurrentItem((prev) => ({
      ...prev,
      Number: supplierCode || "",
    }));
  }, [supplierCode]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setCurrentItem({ ...currentItem, Item: value });

    if (!value.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
    
      return;
    }

    try {
      const data = await fetchItemFields(value);
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectItem = (item) => {
    setCurrentItem({
      ...currentItem,
      Item: item.part_no || "",
      PartCode: item.Part_Code || "",
      ItemDescription: item.Name_Description || "",
      ItemSize: item.Item_Size || "",
      Rate: item.Rate || "",
      HSN_SAC_Code: item.HSN_SAC_Code || "",
    });
    setShowDropdown(false);
  };

  const handleSelectChange = (e) => {
    setCurrentItem({ ...currentItem, Unit: e.target.value });
  };


  useEffect(() => {
    if (currentItemId) {
      const item = itemDetails.find(item => item.id === currentItemId);
      if (item) {
        setCurrentItem(item);
      }
    }
  }, [currentItemId, itemDetails]);

  
  // Add item and update item details dynamically
  const addItem = () => {
    if (currentItem.Item && currentItem.ItemDescription) {
      const newItem = {
        ...currentItem,
        id: itemDetails.length + 1,
        GST_Details: {
          HSN: currentItem.HSN_SAC_Code,
          CGST: { Rate: 0, Amt: 0 },
          SGST: { Rate: 0, Amt: 0 },
          IGST: { Rate: 0, Amt: 0 },
        },
        Schedule_Line: [
          {
            Item: currentItem.Item,
            ItemDescription: currentItem.ItemDescription,
            Qty: currentItem.Qty,
          },
        ],
      };
      const updatedItems = [...itemDetails, newItem];
      setItemDetails(updatedItems);
      updateFormData("Item_Detail_Enter", updatedItems);

      // Dynamically update the current item ID after adding an item
      setCurrentItemId(newItem.id);

      setCurrentItem({
        Item: "",
        ItemDescription: "",
        ItemSize: "",
        Rate: "",
        HSN_SAC_Code: "",
        Number: "",
        Disc: "",
        Qty: "",
        Unit: "",
        Particular: "",
        Mill_Name: "",
        DeliveryDt: "",
        Schedule_Line: [
          {
            Item: "",
            ItemDescription: "",
            Qty: "",
          },
        ],
      });
    } else {
      toast.error("Item and Item Description are required.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        setItemDetails((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      } catch (error) {
        toast.error("Failed to delete item. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        <div className="itemdetailsMain">
          <div className="item-details">
            <div className="table-container">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>SE Item</th>
                    <th>Item Description</th>
                    <th>Item Size</th>
                    <th>Rate</th>
                    <th>HSN Code</th>
                    <th>Number</th>
                    <th>Disc %</th>
                    <th>QTY</th>
                    <th>Unit</th>
                    <th>Particular</th>
                    <th>Make / Mill Name</th>
                    <th>Delivery Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="Item"
                        className="form-control"
                        placeholder="Search"
                        value={currentItem.Item}
                        onChange={handleSearch}
                      />
                      {showDropdown && searchResults.length > 0 && (
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
                          {searchResults.map((item) => (
                            <li
                              key={item.part_no}
                              className="dropdown-item"
                              onClick={() => handleSelectItem(item)}
                              style={{ padding: "5px", cursor: "pointer" }}
                            >
                              {item.part_no}- {item.Part_Code} - {item.Name_Description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td>
                      <textarea
                        name="ItemDescription"
                        className="form-control"
                        rows="2"
                        value={currentItem.ItemDescription}
                        onChange={handleChange}
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ItemSize"
                        className="form-control"
                        value={currentItem.ItemSize}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Rate"
                        className="form-control"
                        value={currentItem.Rate}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="HSN_SAC_Code"
                        className="form-control"
                        value={currentItem.HSN_SAC_Code}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Number"
                        className="form-control"
                        value={currentItem.Number}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            Number: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Disc"
                        className="form-control"
                        value={currentItem.Disc}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Qty"
                        className="form-control"
                        value={currentItem.Qty}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        id="unitCode"
                        className="form-select"
                        value={currentItem.Unit}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select ..</option>
                        {unitCodes.map((unit, index) => (
                          <option key={index} value={unit.name}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <textarea
                        name="Particular"
                        className="form-control"
                        rows="2"
                        value={currentItem.Particular}
                        onChange={handleChange}
                      ></textarea>
                    </td>
                    <td>
                      <textarea
                        name="Mill_Name"
                        className="form-control"
                        rows="2"
                        value={currentItem.Mill_Name}
                        onChange={handleChange}
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="date"
                        name="DeliveryDt"
                        className="form-control"
                        value={currentItem.DeliveryDt}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button type="button" className="btn" onClick={addItem}>
                        Add Item
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="item-table">
            <div className="table-container table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Item Code</th>
                    <th>Item Description</th>
                    <th>Item Size</th>
                    <th>Rate</th>
                    <th>Disc %</th>
                    <th>QTY</th>
                    <th>Unit</th>
                    <th>Particular</th>
                    <th>Make / Mill Name</th>
                    <th>Delivery Date</th>
                    <th>Schedule Line</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {itemDetails.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.Item}</td>
                      <td>{item.ItemDescription}</td>
                      <td>{item.ItemSize}</td>
                      <td>{item.Rate}</td>
                      <td>{item.Disc}</td>
                      <td>{item.Qty}</td>
                      <td>{item.Unit}</td>
                      <td>{item.Particular}</td>
                      <td>{item.Mill_Name}</td>
                      <td>{item.DeliveryDt}</td>
                      <td>Schedule Line</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
