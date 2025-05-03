"use client"

import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const BuyerContactDetail = ({ buyerContacts, setBuyerContacts }) => {
  const [formData, setFormData] = useState({
    Person_Name: "",
    Contact_No: "",
    Email: "",
    Department: "",
    Designation: "",
    Birth_Date: "",
  })
  const [errors, setErrors] = useState({})

  // Function to capitalize first letter of error messages
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Update localStorage when buyer contacts change
  useEffect(() => {
    if (buyerContacts && buyerContacts.length > 0) {
      localStorage.setItem("buyerContacts", JSON.stringify(buyerContacts))
    }
  }, [buyerContacts])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.Person_Name) {
      newErrors.Person_Name = "person name is required"
    }
    if (!formData.Contact_No) {
      newErrors.Contact_No = "contact number is required"
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.Contact_No)) {
      newErrors.Contact_No = "invalid contact number format"
    }
    if (!formData.Email) {
      newErrors.Email = "email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "invalid email format"
    }
    if (!formData.Department) {
      newErrors.Department = "department is required"
    }
    if (!formData.Designation) {
      newErrors.Designation = "designation is required"
    }
    if (!formData.Birth_Date) {
      newErrors.Birth_Date = "birth date is required"
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

  const handleAddBuyerContact = () => {
    if (!validateForm()) return

    if (formData.id) {
      // Update existing contact
      const updatedContacts = buyerContacts.map((contact) => (contact.id === formData.id ? { ...formData } : contact))
      setBuyerContacts(updatedContacts)
      toast.success("Contact updated successfully")
    } else {
      // Add new contact
      const newContact = {
        ...formData,
        id: Date.now(), // Use timestamp as temporary ID
      }
      setBuyerContacts([...buyerContacts, newContact])
      toast.success("Contact added successfully")
    }

    // Reset form
    setFormData({
      Person_Name: "",
      Contact_No: "",
      Email: "",
      Department: "",
      Designation: "",
      Birth_Date: "",
    })
    setErrors({})
  }

  const handleDeleteBuyerContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const filteredContacts = buyerContacts.filter((contact) => contact.id !== id)
      setBuyerContacts(filteredContacts)
      toast.success("Contact deleted successfully")
    }
  }

  const handleEditBuyerContact = (contact) => {
    setFormData({
      ...contact,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="Buyer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-start">
            <h5 style={{ color: "blue" }}>Contact Person Information</h5>
          </div>
        </div>
        <div className="Buyertable">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="blue-th" scope="col">
                        Person Name<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th" scope="col">
                        Contact No<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th" scope="col">
                        Email<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th" scope="col">
                        Department<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th" scope="col">
                        Designation<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th" scope="col">
                        Birth Date<span className="text-danger">*</span>
                      </th>
                      <th className="blue-th" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="Person_Name"
                          value={formData.Person_Name}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter name"
                        />
                        {errors.Person_Name && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Person_Name)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Contact_No"
                          value={formData.Contact_No}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter contact"
                        />
                        {errors.Contact_No && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Contact_No)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Email"
                          value={formData.Email}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter email"
                        />
                        {errors.Email && <small className="text-danger">{capitalizeFirstLetter(errors.Email)}</small>}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Department"
                          value={formData.Department}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter department"
                        />
                        {errors.Department && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Department)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Designation"
                          value={formData.Designation}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Enter designation"
                        />
                        {errors.Designation && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Designation)}</small>
                        )}
                      </td>
                      <td>
                        <input
                          type="date"
                          name="Birth_Date"
                          value={formData.Birth_Date}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        {errors.Birth_Date && (
                          <small className="text-danger">{capitalizeFirstLetter(errors.Birth_Date)}</small>
                        )}
                      </td>
                      <td>
                        <button className="bankbtn" onClick={handleAddBuyerContact}>
                          {formData.id ? (
                            <>
                              <i className="fas fa-save"></i> Save
                            </>
                          ) : (
                            <>
                              <i className="fas fa-plus"></i> Add
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="Buyertable1">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="blue-th" scope="col">
                        Name
                      </th>
                      <th className="blue-th" scope="col">
                        Contact
                      </th>
                      <th className="blue-th" scope="col">
                        Email
                      </th>
                      <th className="blue-th" scope="col">
                        Department
                      </th>
                      <th className="blue-th" scope="col">
                        Designation
                      </th>
                      <th className="blue-th" scope="col">
                        Birth Date
                      </th>
                      <th className="blue-th" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyerContacts && buyerContacts.length > 0 ? (
                      buyerContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.Person_Name}</td>
                          <td>{contact.Contact_No}</td>
                          <td>{contact.Email}</td>
                          <td>{contact.Department}</td>
                          <td>{contact.Designation}</td>
                          <td>{contact.Birth_Date}</td>
                          <td>
                            <button className="bankbtn me-2" onClick={() => handleEditBuyerContact(contact)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="bankbtn" onClick={() => handleDeleteBuyerContact(contact.id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No contacts added yet
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

export default BuyerContactDetail
