"use client"

import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const BankDetail = ({ bankDetails, setBankDetails }) => {
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    Account_Holder_name: "",
    Bank_Name: "",
    Branch_Name: "",
    Bank_Account: "",
    IFSC_Code: "",
  })
  const [errors, setErrors] = useState({})

  // Function to capitalize first letter of error messages
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Update localStorage when bank details change
  useEffect(() => {
    if (bankDetails && bankDetails.length > 0) {
      localStorage.setItem("bankDetails", JSON.stringify(bankDetails))
    }
  }, [bankDetails])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.Account_Holder_name) {
      newErrors.Account_Holder_name = "account holder name is required"
    }
    if (!formData.Bank_Name) {
      newErrors.Bank_Name = "bank name is required"
    }
    if (!formData.Branch_Name) {
      newErrors.Branch_Name = "branch name is required"
    }
    if (!formData.Bank_Account) {
      newErrors.Bank_Account = "bank account number is required"
    }
    if (!formData.IFSC_Code) {
      newErrors.IFSC_Code = "IFSC code is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddOrUpdateBankDetail = () => {
    if (!validateForm()) return

    if (editingId) {
      // Update existing bank detail
      const updatedBankDetails = bankDetails.map((detail) =>
        detail.id === editingId ? { ...formData, id: editingId } : detail,
      )
      setBankDetails(updatedBankDetails)
      toast.success("Bank detail updated successfully")
      setEditingId(null)
    } else {
      // Add new bank detail
      const newBankDetail = {
        ...formData,
        id: Date.now(), // Use timestamp as temporary ID
      }
      setBankDetails([...bankDetails, newBankDetail])
      toast.success("Bank detail added successfully")
    }

    // Reset form
    setFormData({
      Account_Holder_name: "",
      Bank_Name: "",
      Branch_Name: "",
      Bank_Account: "",
      IFSC_Code: "",
    })
    setErrors({})
  }

  const handleDeleteBankDetail = (id) => {
    if (window.confirm("Are you sure you want to delete this bank detail?")) {
      const filteredBankDetails = bankDetails.filter((detail) => detail.id !== id)
      setBankDetails(filteredBankDetails)
      toast.success("Bank detail deleted successfully")
    }
  }

  const handleEditBankDetail = (detail) => {
    setFormData({
      Account_Holder_name: detail.Account_Holder_name,
      Bank_Name: detail.Bank_Name,
      Branch_Name: detail.Branch_Name,
      Bank_Account: detail.Bank_Account,
      IFSC_Code: detail.IFSC_Code,
    })
    setEditingId(detail.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="Bankdetail">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-start">
            <h5 style={{ color: "blue" }}>Customer Bank Details</h5>
          </div>
        </div>
        <div className="Banktable">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="blue-th">
                        Account Holder Name <span className="text-danger">*</span>:
                      </th>
                      <th className="blue-th">
                        Bank Name<span className="text-danger">*</span>:
                      </th>
                      <th className="blue-th">
                        Branch Name<span className="text-danger">*</span>:
                      </th>
                      <th className="blue-th">
                        Bank A/c No<span className="text-danger">*</span>:
                      </th>
                      <th className="blue-th">
                        IFSC Code<span className="text-danger">*</span>:
                      </th>
                      <th className="blue-th">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="Account_Holder_name"
                          value={formData.Account_Holder_name}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter name"
                        />
                        {errors.Account_Holder_name && (
                          <div className="text-danger">{capitalizeFirstLetter(errors.Account_Holder_name)}</div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Bank_Name"
                          value={formData.Bank_Name}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter bank name"
                        />
                        {errors.Bank_Name && (
                          <div className="text-danger">{capitalizeFirstLetter(errors.Bank_Name)}</div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Branch_Name"
                          value={formData.Branch_Name}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter branch name"
                        />
                        {errors.Branch_Name && (
                          <div className="text-danger">{capitalizeFirstLetter(errors.Branch_Name)}</div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Bank_Account"
                          value={formData.Bank_Account}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter account number"
                        />
                        {errors.Bank_Account && (
                          <div className="text-danger">{capitalizeFirstLetter(errors.Bank_Account)}</div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="IFSC_Code"
                          value={formData.IFSC_Code}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter IFSC code"
                        />
                        {errors.IFSC_Code && (
                          <div className="text-danger">{capitalizeFirstLetter(errors.IFSC_Code)}</div>
                        )}
                      </td>
                      <td>
                        <button className="bankbtn" onClick={handleAddOrUpdateBankDetail}>
                          <i className="fas fa-plus"></i> {editingId ? "Update" : "Add"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="Banktable1">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="blue-th">Account Holder Name</th>
                      <th className="blue-th">Bank Name</th>
                      <th className="blue-th">Branch Name</th>
                      <th className="blue-th">Bank Ac No</th>
                      <th className="blue-th">IFSC Code</th>
                      <th className="blue-th">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankDetails && bankDetails.length > 0 ? (
                      bankDetails.map((detail) => (
                        <tr key={detail.id}>
                          <td>{detail.Account_Holder_name}</td>
                          <td>{detail.Bank_Name}</td>
                          <td>{detail.Branch_Name}</td>
                          <td>{detail.Bank_Account}</td>
                          <td>{detail.IFSC_Code}</td>
                          <td>
                            <button className="bankbtn2 me-2" onClick={() => handleEditBankDetail(detail)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="bankbtn2" onClick={() => handleDeleteBankDetail(detail.id)}>
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No bank details added yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default BankDetail
