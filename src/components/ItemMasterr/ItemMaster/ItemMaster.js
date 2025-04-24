import React, { useEffect, useState } from "react";
import "./ItemMaster.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavBar from "../../../NavBar/NavBar";
import SideNav from "../../../SideNav/SideNav";
import { Link} from "react-router-dom";
import { fetchItems } from "../../../Service/Api.jsx";
import { fetchMainGroupData } from "../../../Service/Api.jsx";
const ItemMaster = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  // const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  // const handleAddNewItemClick = () => {
  //   navigate("/add-new-item");
  // };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const [mainGroups, setMainGroups] = useState([]);

  useEffect(() => {
    // Fetch the main group data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchMainGroupData(); // Call API to fetch main group data
        setMainGroups(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching main group data:", error);
      }
    };

    fetchData();
  }, []);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainGroup, setMainGroup] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [itemGrade, setItemGrade] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Fetch items from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchItems();  // Fetch data using the API function
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle search
  const handleSearch = () => {
    const filtered = items.filter(item => {
      const matchesMainGroup = mainGroup ? item.main_group === mainGroup : true;
      const matchesItemGroup = itemGroup ? item.item_group === itemGroup : true;
      const matchesItemGrade = itemGrade ? item.Unit_Code === itemGrade : true;
      const matchesSearchQuery =
        item.part_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Name_Description.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesMainGroup && matchesItemGroup && matchesItemGrade && matchesSearchQuery;
    });
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Reset and view all items
  const handleViewAll = () => {
    setFilteredItems(items);
    setSearchQuery('');
    setMainGroup('');
    setItemGroup('');
    setItemGrade('');
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredItems.length / recordsPerPage);

  return (
    <div className="itemaa">
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
                <div className="itemaamain mt-5">
                <div className="itemaamain-header mb-4 text-start">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="header-title">Item List</h5>
                      </div>
                      <div className="col-md-6 col-12 text-end text-md-end text-center">
                        {/* <button
                          className="btn12 me-2"
                          onClick={handleAddNewItemClick}
                        >
                          Add New Item
                        </button> */}
                        <Link to={"/item-master-gernal"} className="btn12">
                          Add New Item
                        </Link>
                        <Link to={"/item-master-query"} className="btn12">
                          Item Query
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="search-row mt-5">
                    <div className="row align-items-center">
                      {/* <div className="col-md-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="itemCheckbox"
                        />
                      </div> */}
                      <div className="col-md-1" >
                        <label htmlFor="itemSearch">Item Search</label>
                      </div>
                      <div className="col-md-2">
                        <input
                         type="text"
                         className="form-control"
                         id="itemSearch"
                         placeholder="Search by SE_Item / Description"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-md-1" style={{ marginLeft: "-20px" }}>
                        <label htmlFor="mainGroup">Main Group</label>
                      </div>
                      <div className="col-md-1">
                        <select className="form-select"
                id="mainGroup"
                value={mainGroup}
                onChange={(e) => setMainGroup(e.target.value)}>
                  <option selected>ALL</option>
                          {mainGroups.map((group) => (
                            <option key={group.id} value={group.name}>
                              {group.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-1">
                        <label htmlFor="itemGroup">Item Group</label>
                      </div>
                      <div className="col-md-1">
                        <select   className="form-select"
                id="itemGroup"
                value={itemGroup}
                onChange={(e) => setItemGroup(e.target.value)}>
                          <option selected>ALL</option>
                          <option value="BEARING">BEARING</option>
                          <option value="BELTS">BELTS</option>
                          <option value="CAMS">CAMS</option>
                          <option value="COLLETS">COLLETS & HOLDERS</option>
                          <option value="COMPUTER">COMPUTER</option>
                          <option value="CUTTING">CUTTING TOOL</option>
                          <option value="ELECTRICS">ELECTRICS PARTS</option>
                          <option value="END PIECE">END PIECE</option>
                          <option value="FIXCTURE">FIXCTURE</option>
                        </select>
                      </div>
                      <div className="col-md-1">
                        <label htmlFor="itemGrade">Item Grade</label>
                      </div>
                      <div className="col-md-1">
                        <select  className="form-select"
                id="itemGrade"
                value={itemGrade}
                onChange={(e) => setItemGrade(e.target.value)}>
                          <option>All</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-2 text-end">
                        <button className="ser-btn m-2" onClick={handleSearch}>
                          Search
                        </button>
                        <button className="ser-btn" onClick={handleViewAll}>
                          All Items
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="search-table mt-5">
                    <div className="container-fluid">
                    <div className="row">
  <div className="table-responsive">
    <table className="table table-striped mt-4">

                            <thead>
                              <tr>
                                <th>Sr</th>
                                <th>Item No</th>
                                <th>Name_Description</th>
                                <th>Item Code</th>
                                <th>Item Size</th>
                                <th>Main Group</th>
                                <th>Item Group</th>
                                <th>Store Location</th>
                                <th>Unit Code</th>
                                <th>HSN_SAC_Code</th>
                                <th>Auth</th>
                                <th>User</th>
                                <th>Edit</th>
                                <th>Rev</th>
                                <th>Act</th>
                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.map((item) => (
                                <tr key={item.id}>
                                  <td>{item.id}</td>
                                  <td>{item.part_no}</td>
                                  <td>{item.Name_Description}</td>
                                  <td>{item.Part_Code}</td>
                                  <td>{item.Item_Size}</td>
                                  <td>{item.main_group}</td>
                                  <td>{item.item_group}</td>
                                  <td>{item.Store_Location}</td>
                                  <td>{item.Unit_Code}</td>
                                  <td>{item.HSN_SAC_Code}</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
        <div className="col-md-6 text-start" style={{ color: 'blue' }}>
          <label>Total Records: {filteredItems.length}</label>
        </div>
        <div className="col-md-6 text-end" style={{ color: 'blue' }}>
          <label>Total Pending BOM FG=8 SFG=2</label>
        </div>
      </div>

                  <div className="pagination-container">
          <div className="row text-end">
            <div className="col-md-12 text-end">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
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

export default ItemMaster;
