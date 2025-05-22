"use client"

import { useState, useEffect } from "react"
import { fetchTransactionById } from "../../../Service/PurchaseApi"
import { toast, ToastContainer } from "react-toastify"
import { fetchItemFields } from "../../../Service/Api"
import "./ItemDetails.css"

const ItemDetails = ({ updateFormData, supplierCode, existingItems = [], isEditMode = false }) => {
  const [itemDetails, setItemDetails] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
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
    PartCode: "",
    CGST: "",
    IGST: "",
    SGST: "",
    UTGST: "",
  })
  const [bomItems, setBomItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentItemId,] = useState(null)

  // Load existing items when in edit mode
  useEffect(() => {
    if (isEditMode && existingItems && existingItems.length > 0) {
      setItemDetails(existingItems)
      updateFormData("Item_Detail_Enter", existingItems)
    }
  }, [isEditMode, existingItems, updateFormData])

  // Load transaction data if ID is provided
  useEffect(() => {
    if (currentItemId) {
      const loadTransactionData = async () => {
        setLoading(true)
        try {
          const response = await fetchTransactionById(currentItemId)
          console.log("Fetched Transaction Data:", response)

          if (response && response.data) {
            const { data } = response

            // Create an item from the transaction data
            const item = {
              id: data.id,
              Item: data.part_no,
              PartCode: data.Part_Code,
              ItemDescription: data.ItemDescription,
              ItemSize: data.ItemSize || "",
              Rate: data.Rate,
              HSN_SAC_Code: data.HSN_SAC_Code,
              Disc: data.Disc,
              Qty: data.Qty,
              Unit: data.Unit,
              Particular: data.Particular,
              Mill_Name: data.Mill_Name,
              DeliveryDt: data.DeliveryDt,
              GST_Details: data.GST_Details,
              Schedule_Line: data.Schedule_Line,
              CGST: data.CGST,
              SGST: data.SGST,
              IGST: data.IGST,
              UTGST: data.UTGST,
            }

            // Update the item details
            setItemDetails([item])
            updateFormData("Item_Detail_Enter", [item])
            toast.success("Transaction data loaded successfully")
          } else {
            toast.error("No transaction data found")
          }
        } catch (error) {
          console.error("Error fetching transaction:", error)
          toast.error("Error loading transaction data")
        } finally {
          setLoading(false)
        }
      }

      loadTransactionData()
    }
  }, [currentItemId, updateFormData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "Rate" || name === "Qty" || name === "Disc" ? Number(value) || 0 : value,
    }))
  }

  useEffect(() => {
    setCurrentItem((prev) => ({
      ...prev,
      Number: supplierCode || "",
    }))
  }, [supplierCode])

  const handleSearch = async (e) => {
    const value = e.target.value
    setCurrentItem({ ...currentItem, Item: value })

    if (!value.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setLoading(true)
    try {
      const data = await fetchItemFields(value)
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data)
        setShowDropdown(true)
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    } catch (error) {
      console.error("Error fetching item details:", error)
      setSearchResults([])
      setShowDropdown(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectItem = (item) => {
    setCurrentItem({
      ...currentItem,
      Item: item.part_no || "",
      PartCode: item.Part_Code || "",
      ItemDescription: item.Name_Description || "",
      ItemSize: item.Item_Size || "",
      Rate: item.Rate || "",
      HSN_SAC_Code: item.HSN_SAC_Code || "",
      Unit: item.Unit_Code || "",
    })

    // Set BOM items if available
    if (item.bom_items && item.bom_items.length > 0) {
      setBomItems(item.bom_items)
    } else {
      setBomItems([])
    }

    setShowDropdown(false)
  }

  const handleSelectPartCode = (e) => {
    setCurrentItem({ ...currentItem, PartCode: e.target.value })
  }

  // Add this effect to sync with parent component data
  useEffect(() => {
    // Only update if we have items from parent and our local state is empty or different
    if (
      existingItems &&
      existingItems.length > 0 &&
      (itemDetails.length === 0 || JSON.stringify(existingItems) !== JSON.stringify(itemDetails))
    ) {
      console.log("Syncing item details with parent data:", existingItems)
      setItemDetails(existingItems)
    }
  }, [existingItems, itemDetails])

  const addItem = async () => {
    if (!currentItem.Item || !currentItem.ItemDescription) {
      toast.error("Item and Item Description are required.")
      return
    }

    setLoading(true)
    try {
      // Prepare data for API submission
      const itemData = {
        supplier_id: Number(supplierCode) || 40, // Default to 40 if not provided
        part_no: currentItem.Item,
        ItemDescription: currentItem.ItemDescription,
        ItemSize: currentItem.ItemSize || "",
        Rate: currentItem.Rate || "0",
        Disc: currentItem.Disc || "0",
        Qty: currentItem.Qty || "1",
        Unit: currentItem.Unit || "pcs",
        Particular: currentItem.Particular || "",
        MakeMillName: currentItem.Mill_Name || "",
        DeliveryDate: currentItem.DeliveryDt || new Date().toISOString().split("T")[0],
        PartCode: currentItem.PartCode || "",
        HSN_SAC_Code: currentItem.HSN_SAC_Code || "",
        CGST:currentItem.CGST || "",
          SGST: currentItem.SGST || "",
          IGST: currentItem.IGST || "",
          UTGST:currentItem.UTGST || ""
      }

      // Uncomment to actually submit to API
      // const result = await createTransaction(itemData)
      // console.log("Item added to API:", result)

      // For now, just log the data that would be sent
      console.log("Item data to be sent to API:", itemData)

      // Add to local state
      const newItem = {
        ...currentItem,
        id: Date.now(), // Use timestamp for unique ID
        GST_Details: {
          HSN: currentItem.HSN_SAC_Code,
          CGST:currentItem.CGST,
          SGST: currentItem.SGST,
          IGST: currentItem.IGST,
          UTGST:currentItem.UTGST
        },
        Schedule_Line: [
          {
            Item: currentItem.Item,
            ItemDescription: currentItem.ItemDescription,
            Qty: currentItem.Qty,
          },
        ],
      }

      const updatedItems = [...itemDetails, newItem]
      setItemDetails(updatedItems)

      // Important: Update parent component with the new data
      updateFormData("Item_Detail_Enter", updatedItems)

      toast.success("Item added successfully")

      // Reset form
      setCurrentItem({
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
        PartCode: "",
      })
      setBomItems([])
    } catch (error) {
      console.error("Error adding item:", error)
      toast.error("Failed to add item")
    } finally {
      setLoading(false)
    }
  }

  // Function to remove an item
  const removeItem = (index) => {
    const updatedItems = [...itemDetails]
    updatedItems.splice(index, 1)
    setItemDetails(updatedItems)

    // Make sure to update parent component
    updateFormData("Item_Detail_Enter", updatedItems)

    // Show confirmation toast
    toast.info("Item removed")
  }



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
                    {/* <th>HSN Code</th>
                    <th>Number</th> */}
                    <th>Disc %</th>
                    <th>QTY</th>
                    <th>Unit</th>
                    <th>Particular</th>
                    <th>Make / Mill Name</th>
                    <th>Delivery Date</th>
                    <th>Part Code</th>
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
                        disabled={loading}
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
                              {item.part_no} - {item.Part_Code} - {item.Name_Description}
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
                        disabled={loading}
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ItemSize"
                        className="form-control"
                        value={currentItem.ItemSize}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Rate"
                        className="form-control"
                        value={currentItem.Rate}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </td>
                    {/* <td>
                      <input
                        type="text"
                        name="HSN_SAC_Code"
                        className="form-control"
                        value={currentItem.HSN_SAC_Code}
                        onChange={handleChange}
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </td> */}
                    <td>
                      <input
                        type="text"
                        name="Disc"
                        className="form-control"
                        value={currentItem.Disc}
                        onChange={handleChange}
                        disabled={loading}
                      /> 
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Qty"
                        className="form-control"
                        value={currentItem.Qty}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Unit"
                        className="form-control"
                        value={currentItem.Unit}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <textarea
                        name="Particular"
                        className="form-control"
                        rows="2"
                        value={currentItem.Particular}
                        onChange={handleChange}
                        disabled={loading}
                      ></textarea>
                    </td>
                    <td>
                      <textarea
                        name="Mill_Name"
                        className="form-control"
                        rows="2"
                        value={currentItem.Mill_Name}
                        onChange={handleChange}
                        disabled={loading}
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="date"
                        name="DeliveryDt"
                        className="form-control"
                        value={currentItem.DeliveryDt}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <select
                        id="PartCode"
                        className="form-select"
                        value={currentItem.PartCode}
                        onChange={handleSelectPartCode}
                        disabled={loading || bomItems.length === 0}
                      >
                        <option value="">Select Part Code</option>
                        {bomItems.map((bom) => (
                          <option key={bom.id} value={bom.PartCode}>
                            {bom.PartCode} - {bom.BOMPartType}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button type="button" className="btn" onClick={addItem} disabled={loading}>
                        {loading ? "Adding..." : "Add Item"}
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
                    <th>Part Code</th>
                    <th>Item Description</th>
                    <th>Item Size</th>
                    <th>Rate</th>
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
                  {itemDetails.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.Item}</td>
                      <td>{item.PartCode}</td>

                      <td>
                        {item.ItemDescription}
                        <br />
                        HSN: {item.HSN_SAC_Code || ""}
                        <br />
                        CGST: {item.CGST || "0"}%<br />
                        SGST: {item.SGST || "0"}%<br />
                        IGST: {item.IGST || "0"}%<br />
                        UTGST: {item.UTGST || "0"}%
                      </td>
                      <td>{item.ItemSize}</td>
                      <td>{item.Rate}</td>
                      <td>{item.Disc}</td>
                      <td>{item.Qty}</td>
                      <td>{item.Unit}</td>
                      <td>{item.Particular}</td>
                      <td>{item.Mill_Name}</td>
                      <td>{item.DeliveryDt}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeItem(index)}
                          disabled={loading}
                        >
                          Remove
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
  )
}

export default ItemDetails
