import React, { useState, useEffect } from "react";
import "./JobWorkitemdetail.css";
import { FaTrash ,FaEdit} from "react-icons/fa";
import { jobgetItems, jobaddItem, jobupdateItem, deleteItemjob } from "../../../Service/PurchaseApi";
import { toast, ToastContainer } from "react-toastify"; // Import toaster


const JobWorkitemdetail = () => {
  const [items, setItems] = useState([]);
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
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await jobgetItems();
    setItems(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (validate()) {
      const result = await jobaddItem(formData);
      if (result) {
        toast.success("Item added successfully!");
        fetchItems();
        clearForm();
      } else {
        toast.error("Failed to add item.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleEdit = async (item) => {
    setFormData(item);
    setEditingItem(item.id);
  };

  const handleUpdate = async () => {
    if (validate()) {
      const result = await jobupdateItem(editingItem, formData);
      if (result) {
        toast.success("Item updated successfully!");
        fetchItems();
        clearForm();
        setEditingItem(null);
      } else {
        toast.error("Failed to update item.");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

 // In JobWorkitemdetail.jsx
 const handleDelete = async (id) => {
 
    try {
      const result = await deleteItemjob(id);
      if (result) {
        toast.success("Item deleted successfully!");
        fetchItems(); // Refresh the item list
      } else {
        toast.error("Failed to delete item.");
      }
    } catch (error) {
      toast.error("Failed to delete item.");
    }
  
};



  const validate = () => {
    return Object.values(formData).every(value => typeof value === 'string' ? value.trim() !== "" : value != null && value !== "");
  };

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
    });
  };
  return (

      <div className="container-fluid">
        <ToastContainer/>
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
                        <input type="checkbox" name="SelectItem" value="RM" checked={formData.SelectItem === "RM"} onChange={handleChange} /> RM
                      </label>
                      <label>
                        <input type="checkbox" name="SelectItem" value="FG" checked={formData.SelectItem === "FG"} onChange={handleChange} /> FG
                      </label>
                      </th>
                      <th>Item Description:</th>
                      <th>Part Code:   <label>
                        <input type="checkbox" name="RType" value="default" checked={formData.RType === "default"} onChange={handleChange} /> default
                      </label>
                      <label>
                        <input type="checkbox" name="RType" value="change FG" checked={formData.RType === "change FG"} onChange={handleChange} /> change FG
                      </label></th>
                      <th>Rate:</th>
                      <th>RType</th>
                      <th>Disc %:</th>
                      <th>PO QTY:</th>
                      <th>Unit:</th>
                      <th>Particular/Process:</th>
                     
                      <th>
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                      <input
                        type="text"
                        className="form-control"
                        name="SelectItem"
                        value={formData.SelectItem}
                        onChange={handleChange}
                        placeholder="Search"
                      />
                        <button type="button" className="btn">Search</button>
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
                        <select
                        className="form-control"
                        name="Out"
                        value={formData.Out}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="unit1">Unit 1</option>
                        <option value="unit2">Unit 2</option>
                      </select>
                        Inn:
                        <select
                        className="form-control"
                        name="In"
                        value={formData.In}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="unit1">Unit 1</option>
                        <option value="unit2">Unit 2</option>
                      </select>
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
                      <td>  <input
                        type="text"
                        className="form-control"
                        name="RType"
                        value={formData.RType}
                        onChange={handleChange}
                      /></td>
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
                      <select
                        className="form-control"
                        name="Unit"
                        value={formData.Unit}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="unit1">Unit 1</option>
                        <option value="unit2">Unit 2</option>
                      </select>
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
                        <button
                          className="btnpurchase"
                          onClick={handleUpdate}
                          style={{ textAlign: "end" }}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="btnpurchase"
                          onClick={handleAdd}
                          style={{ textAlign: "end" }}
                        >
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
              <div className="table-container">
                <table className="table table-responsive table-striped">
                  <thead>
                    <tr>
                      <th>Sr</th>
                      <th>Item Name</th>
                      <th>Item Description</th>
                      <th>Out Part - In Part</th>
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
                      <td>{item.Out} - {item.In}</td>
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
                        <button
                          className="btnpurchase"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit/>
                        </button>
                        <button
                          className="btnpurchase"
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

export default JobWorkitemdetail;
