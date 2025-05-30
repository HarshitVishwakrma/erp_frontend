"use client"

import { useState, useEffect } from "react"
import "./JobWorkitemdetail.css"
import { FaTrash, FaEdit } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import { fetchItemFields ,addTransaction, getTransaction} from "../../../Service/Api"

const JobWorkitemdetail = ({ data, updateData, supplierCode, updateGstData, updateScheduleData }) => {
  const [items, setItems] = useState([])
  const [formData, setFormData] = useState({
    SelectItem: "",
    ItemDescription: "",
    Out: "",
    In: "",
    Rate: "",
    RType: "",
    Disc: "",
    PoQty: "",
    Unit: "",
    Particular_Process: "",
    SAC: "",
  })
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bomItems, setBomItems] = useState([])

  // Sync with parent data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setItems(data)
    }
  }, [data])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSearch = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim().length < 2) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setLoading(true)
    try {
      const results = await fetchItemFields(query)
      setSearchResults(results || [])
      setShowDropdown(true)
    } catch (error) {
      console.error("Error searching items:", error)
      toast.error("Error searching items")
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectItem = (item) => {
    // Extract BOM items if available
    const bomItemsList = item.bom_items || []
    setBomItems(bomItemsList)

    // Update form data with selected item details
    setFormData({
      ...formData,
      SelectItem: item.part_no || "",
      ItemDescription: item.Name_Description || "",
      Unit: item.Unit_Code || "",
      SAC: item.SAC || "",
      // Set other fields as needed
    })

    // Hide dropdown
    setShowDropdown(false)
    setSearchQuery(item.part_no)
  }

  const handleAdd = async () => {
    if (validate()) {
      try {
        // Prepare data for the add transaction API
        const transactionData = {
          supplier_id: Number.parseInt(supplierCode) || 5, // Use supplier code from parent or default
          part_no: formData.SelectItem,
          ItemDescription: formData.ItemDescription,
          PartCode: formData.SelectItem, // Using SelectItem as PartCode
          Out: Number.parseInt(formData.Out) || 0,
          Inn: Number.parseInt(formData.In) || 0,
          Rate: formData.Rate,
          RType: formData.RType,
          Disc: Number.parseInt(formData.Disc) || 0,
          PoQty: formData.PoQty,
          Unit: formData.Unit,
          ParticularProcess: formData.Particular_Process,
          SAC: formData.SAC,
        }

        console.log("Adding transaction:", transactionData)

        // Call add transaction API
        const addResponse = await addTransaction(transactionData)
        console.log("Add response:", addResponse)

        if (addResponse && addResponse.id) {
          // Use the returned ID to get complete transaction data
          const getResponse = await getTransaction(addResponse.id)
          console.log("Get response:", getResponse)

          if (getResponse && getResponse.data) {
            const transactionData = getResponse.data

            // Add the item to local state with the transaction ID
            const newItem = {
              ...formData,
              id: addResponse.id,
              transactionId: addResponse.id,
            }
            const updatedItems = [...items, newItem]
            setItems(updatedItems)
            updateData(updatedItems)

            // Update GST Details tab with the fetched data
            if (transactionData.GST_Details && updateGstData) {
              const gstDetails = {
                ItemCode: transactionData.Part_Code || "",
                SAC: transactionData.GST_Details.SAC || "",
                Rate: transactionData.GST_Details.Rate?.toString() || "",
                Qty: transactionData.GST_Details.Qty?.toString() || "",
                SubTotal: transactionData.GST_Details.SubTotal?.toString() || "",
                Discount: transactionData.GST_Details.Discount?.toString() || "",
                DiscountAmt: transactionData.GST_Details.DiscountAmt?.toString() || "",
                Packing: transactionData.GST_Details.Packing || "",
                Transport: transactionData.GST_Details.Transport || "",
                AssValue: transactionData.GST_Details.Assvalue?.toString() || "",
                CGST: transactionData.GST_Details.CGST || "",
                CGSTAmt: transactionData.GST_Details.CGSTAmt || "",
                SGST: transactionData.GST_Details.SGST || "",
                SGSTAmt: transactionData.GST_Details.SGSTAmt || "",
                IGST: transactionData.GST_Details.IGST || "",
                IGSTAmt: transactionData.GST_Details.IGSTAmt || "",
                UTGST: transactionData.GST_Details.UTGST || "",
                UTGSTAmt: transactionData.GST_Details.UTGSTAmt || "",
                Total: transactionData.GST_Details.Total?.toString() || "",
              }
              console.log("Updating GST data:", gstDetails)
              updateGstData([gstDetails])
            }

            // Update Schedule Line tab with the fetched data
            if (transactionData.Schedule_Line && transactionData.Schedule_Line.length > 0 && updateScheduleData) {
              const scheduleData = transactionData.Schedule_Line[0] || {}
              const scheduleDetails = {
                ItemCode: scheduleData.Part_Code || "",
                Description: scheduleData.ItemDescription || "",
                TotalQty: scheduleData.PoQty?.toString() || "",
                Date1: "",
                Qty1: "",
                Date2: "",
                Qty2: "",
                Date3: "",
                Qty3: "",
                Date4: "",
                Qty4: "",
                Date5: "",
                Qty5: "",
                Date6: "",
                Qty6: "",
              }
              console.log("Updating Schedule data:", scheduleDetails)
              updateScheduleData([scheduleDetails])
            }

            toast.success("Item added successfully!")
            clearForm()
          }
        }
      } catch (error) {
        console.error("Error adding transaction:", error)
        toast.error("Error adding item. Please try again.")
      }
    } else {
      toast.error("Please fill in all required fields.")
    }
  }

  const handleEdit = (item) => {
    setFormData(item)
    setEditingItem(item.id)
  }

  const handleUpdate = () => {
    if (validate()) {
      const updatedItems = items.map((item) => (item.id === editingItem ? { ...formData, id: editingItem } : item))
      setItems(updatedItems)
      updateData(updatedItems) // Update parent state
      toast.success("Item updated successfully!")
      clearForm()
      setEditingItem(null)
    } else {
      toast.error("Please fill in all required fields.")
    }
  }

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
    updateData(updatedItems) // Update parent state
    toast.success("Item deleted successfully!")
  }

  const validate = () => {
    return Object.values(formData).every((value) =>
      typeof value === "string" ? value.trim() !== "" : value != null && value !== "",
    )
  }

  const clearForm = () => {
    setFormData({
      SelectItem: "",
      ItemDescription: "",
      Out: "",
      In: "",
      Rate: "",
      RType: "",
      Disc: "",
      PoQty: "",
      Unit: "",
      Particular_Process: "",
      SAC: "",
    })
    setSearchQuery("")
    setBomItems([])
  }

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        <div className="JobWorkitemdetailsMain">
          <div className="JobWorkitem-details">
            <div className="table-container">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>
                      Select Item:{" "}
                      <label>
                        <input
                          type="checkbox"
                          name="SelectItem"
                          value="RM"
                          checked={formData.SelectItem === "RM"}
                          onChange={handleChange}
                        />{" "}
                        RM
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="SelectItem"
                          value="FG"
                          checked={formData.SelectItem === "FG"}
                          onChange={handleChange}
                        />{" "}
                        FG
                      </label>
                    </th>
                    <th>Item Description:</th>
                    <th>
                      Part Code:{" "}
                      <label>
                        <input
                          type="checkbox"
                          name="RType"
                          value="default"
                          checked={formData.RType === "default"}
                          onChange={handleChange}
                        />{" "}
                        default
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="RType"
                          value="change FG"
                          checked={formData.RType === "change FG"}
                          onChange={handleChange}
                        />{" "}
                        change FG
                      </label>
                    </th>
                    <th>SAC</th>
                    <th>Rate:</th>
                    <th>RType</th>
                    <th>Disc %:</th>
                    <th>PO QTY:</th>
                    <th>Unit:</th>
                    <th>Particular/Process:</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="searchQuery"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
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
                        className="form-control"
                        name="ItemDescription"
                        value={formData.ItemDescription}
                        onChange={handleChange}
                        rows="2"
                      ></textarea>
                    </td>
                    <td>
                      Out:
                      <select className="form-control" name="Out" value={formData.Out} onChange={handleChange}>
                        <option value="">Select</option>
                        {bomItems.length > 0 ? (
                          bomItems.map((item) => (
                            <option key={item.id} value={item.PartCode}>
                              {item.PartCode}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="unit1">Unit 1</option>
                            <option value="unit2">Unit 2</option>
                          </>
                        )}
                      </select>
                      Inn:
                      <select className="form-control" name="In" value={formData.In} onChange={handleChange}>
                        <option value="">Select</option>
                        {bomItems.length > 0 ? (
                          bomItems.map((item) => (
                            <option key={item.id} value={item.BomPartCode}>
                              {item.BomPartCode}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="unit1">Unit 1</option>
                            <option value="unit2">Unit 2</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="SAC"
                        value={formData.SAC}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Rate"
                        value={formData.Rate}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="RType"
                        value={formData.RType}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Disc"
                        value={formData.Disc}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="PoQty"
                        value={formData.PoQty}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Unit"
                        value={formData.Unit}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        name="Particular_Process"
                        value={formData.Particular_Process}
                        onChange={handleChange}
                        rows="2"
                      ></textarea>
                    </td>
                    <td>
                      {editingItem ? (
                        <button className="btnpurchase" onClick={handleUpdate} style={{ textAlign: "end" }}>
                          Update
                        </button>
                      ) : (
                        <button className="btnpurchase" onClick={handleAdd} style={{ textAlign: "end" }}>
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="JobWorkitem-table">
            <div className="table table-responsive table-striped">
              <table>
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Item Name</th>
                    <th>Item Description</th>
                    <th>Out Part - In Part</th>
                    <th>SAC</th>
                    <th>Rate</th>
                    <th>RType</th>
                    <th>Disc %</th>
                    <th>QTY</th>
                    <th>Unit</th>
                    <th>Particular</th>
                    <th>Version</th>
                    <th>ItemStatus</th>
                    <th>CS Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.SelectItem}</td>
                      <td>{item.ItemDescription}</td>
                      <td>
                        {item.Out} - {item.In}
                      </td>
                      <td>{item.SAC}</td>
                      <td>{item.Rate}</td>
                      <td>{item.RType}</td>
                      <td>{item.Disc}</td>
                      <td>{item.PoQty}</td>
                      <td>{item.Unit}</td>
                      <td>{item.Particular_Process}</td>
                      <td>{item.Version}</td>
                      <td>{item.ItemStatus}</td>
                      <td>{item.CSCode}</td>
                      <td>
                        <button className="btnpurchase" onClick={() => handleEdit(item)}>
                          <FaEdit />
                        </button>
                        <button className="btnpurchase" onClick={() => handleDelete(item.id)}>
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
  )
}

export default JobWorkitemdetail
