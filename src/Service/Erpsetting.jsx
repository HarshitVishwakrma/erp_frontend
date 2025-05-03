import axios from "axios";

// const BASE_URL = "http://3.7.91.234:8000/Settings/";
const BASE_URL = "api/Settings/";

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}User_RUD/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}User_RUD/users/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}User_RUD/users/${id}/`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

  
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}api/register/`, userData);
      return response.data; // return the response data if needed
    } catch (error) {
      console.error("Error registering user:", error);
      throw error; // Re-throw the error to be handled by the calling component
    }
  };


  //Login


// Login API integration
export const 
loginUser = async (username, password,year) => {
  try {
    const response = await axios.post(`${BASE_URL}api/login/`, {
      username,
      password,
      year,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors and rethrow them for the calling function to manage
    console.error("Error logging in:", error);
    throw error.response?.data || error.message || "Error logging in.";
  }
};

  
  // user client
  export const fetchUsersDropdown = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/users-dropdown/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Let the caller handle the error
    }
  };
  
  // Assign permissions
  export const assignPermissions = async (userId, modulesToSubmit) => {
    try {
      const response = await axios.post(`${BASE_URL}api/assign-permission/`, {
        id: userId,
        modules: modulesToSubmit,
      });
      return response.data; // Ensure only `response.data` is returned
    } catch (error) {
      console.error("Error in assignPermissions API:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };
  

  // Financial Year
  // Function to create a new financial year
export const createFinancialYear = async (financialYearData) => {
  try {
    const response = await axios.post(`${BASE_URL}financial_years/`, financialYearData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating financial year:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

// Function to fetch all financial years
export const getFinancialYears = async () => {
  try {
    const response = await axios.get(`${BASE_URL}financial_years/`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching financial years:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

