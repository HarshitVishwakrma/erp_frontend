  import { useState, useEffect ,useCallback} from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.min";
  import NavBar from "../../NavBar/NavBar.js";
  import SideNav from "../../SideNav/SideNav.js";

  import "./ProductionEntry.css";
  import { FaPlus, FaTrash } from "react-icons/fa";
  import Cached from "@mui/icons-material/Cached.js";

  import {
    fetchShifts,
    fetchContractors,
    fetchUnitMachines,
    fetchOperators,
    fetchSupervisors,
    createProductionEntry,
    getProductionNumber,
    fetchHelpers,
    getProductionId,
    updateProduction
  } from "../../Service/Production.jsx";
  import { Link, useParams, useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";


  // ProductionEntry Component
  const ProductionEntry = () => {
    // Side Navigation State
    const { id } = useParams() // Get the ID from the URL
    const navigate = useNavigate() // For navigation after save
    const [isEditMode, setIsEditMode] = useState(false)
    const [sideNavOpen, setSideNavOpen] = useState(false);

    const toggleSideNav = () => {
      setSideNavOpen((prevState) => !prevState);
    };

    useEffect(() => {
      if (sideNavOpen) {
        document.body.classList.add("side-nav-open");
      } else {
        document.body.classList.remove("side-nav-open");
      }
    }, [sideNavOpen]);

    // Function to get current date & time in the required format
    const getCurrentDateTime = () => {
      const now = new Date();

      // Get current date in YYYY-MM-DD format
      const currentDate = now.toISOString().split("T")[0];

      // Get current time in HH:MM format
      const currentTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
      });

      return { currentDate, currentTime };
    };

    // Set default date & time when the component loads
    useEffect(() => {
      const { currentDate, currentTime } = getCurrentDateTime();
      setFormData((prev) => ({
        ...prev,
        Date: currentDate,
        Time: currentTime,
      }));
    }, []);

      // Load existing production entry data when in edit mode
  useEffect(() => {
    const fetchProductionData = async () => {
      if (id) {
        try {
          setIsEditMode(true)
          const data = await getProductionId(id)
          console.log("Fetched production entry data:", data)

          // Set form data with the fetched data
          setFormData({
            ...formData,
            Series: data.Series || "DP",
            General: data.General || "General info about production",
            MachineDowntime: data.MachineDowntime || "No downtime",
            contractor: data.contractor || "",
            unit_machine: data.unit_machine || "",
            item: data.item || "",
            operation: data.operation || "",
            prod_qty: data.prod_qty || "",
            Date: data.Date || "",
            Time: data.Time || "",
            Supervisor: data.Supervisor || "",
            machine_speed: data.machine_speed || "",
            Helper: data.Helper || "",
            ParentOperation: data.ParentOperation || "",
            ProdTime: data.ProdTime || "",
            shift: data.shift || "",
            operator: data.operator || "",
            lot_no: data.lot_no || "",
            rework_qty: data.rework_qty || "",
            reject_qty: data.reject_qty || "",
            shift_from: data.shift_from || "",
            shift_to: data.shift_to || "",
            break_from: data.break_from || "",
            break_to: data.break_to || "",
            break_total: data.break_total || "",
            shift_time: data.shift_time || "",
            avail_time: data.avail_time || "",
            prod_time: data.prod_time || "",
            cycle_time: data.cycle_time || "",
            op_time: data.op_time || "",
            lu_time: data.lu_time || "",
            mo_time: data.mo_time || "",
            total_time: data.total_time || "",
            electricity_start_unit: data.electricity_start_unit || "",
            electricity_end_unit: data.electricity_end_unit || "",
            electricity_total_unit: data.electricity_total_unit || "",
            scrap_end_piece_qty: data.scrap_end_piece_qty || "",
            scrap_qty: data.scrap_qty || "",
            scrap_end_remark: data.scrap_end_remark || "",
            mill_name: data.mill_name || "",
            remark: data.remark || "",
            target_qty: data.target_qty || "",
            production_hours: data.production_hours || "",
            idle_hours: data.idle_hours || "",
            actual_hours: data.actual_hours || "",
            Rework_Description: data.Rework_Description || "",
            ReworkQty: data.ReworkQty || "",
            Reject_Description: data.Reject_Description || "",
            Reject_Quantity: data.Reject_Quantity || "",
            ItemCode: data.ItemCode || "",
            ItemDescription: data.ItemDescription || "",
          })

          // Set other form fields
          setProdNo(data.Prod_no || "")
          setSeries(data.Series || "DP")

          // Set search terms for dropdowns
          if (data.contractor) setSearchTermContractor(data.contractor)
          if (data.unit_machine) setSearchTermUnitMachine(data.unit_machine)
          if (data.operator) setSearchTermOperator(data.operator)
          if (data.Supervisor) setSearchTermSupervisor(data.Supervisor)
          if (data.shift) setSearchTermShift(data.shift)
          if (data.Helper) setSearchTermHelper(data.Helper)

          // Set idle time records if available
          if (data.MachineIdleTime_Detail_Enter && Array.isArray(data.MachineIdleTime_Detail_Enter)) {
            setIdleTimeRecords(data.MachineIdleTime_Detail_Enter)
          }
        } catch (error) {
          console.error("Error fetching production entry:", error)
          toast.error("Failed to load production entry data")
        }
      }
    }

    fetchProductionData()
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ id])


    const [series, setSeries] = useState("");
    const [prodNo, setProdNo] = useState("");

    // Retrieve the shortYear from local storage
    const shortYear = localStorage.getItem("Shortyear");

    // useEffect hook to call the API whenever the selected series changes to "DP"
    useEffect(() => {
      if (series === "DP" && shortYear) {
          console.log("🔄 Fetching production number...");
          getProductionNumber(series, shortYear)
              .then((data) => {
                  console.log("🆕 Received Production Number:", data.prod_no);
                  setProdNo(data.prod_no);
              })
              .catch((error) => {
                  console.error("❌ Error fetching production number:", error);
              });
      } else {
          console.warn("⚠️ Series is not DP or shortYear is missing. Clearing prodNo.");
          setProdNo("");
      }
  }, [series, shortYear]);


    const [helpers, setHelpers] = useState([]);
    const [filteredHelpers, setFilteredHelpers] = useState([]);
    const [searchTermHelper, setSearchTermHelper] = useState("");
    const [dropdownVisibleHelper, setDropdownVisibleHelper] = useState(false);

    useEffect(() => {
      const loadHelpers = async () => {
        const data = await fetchHelpers();
        setHelpers(data);
        setFilteredHelpers(data);
      };
      loadHelpers();
    }, []);

    const handleSearchChangeHelper = (event) => {
      const value = event.target.value;
      setSearchTermHelper(value);
      setDropdownVisibleHelper(true);

      const filtered = helpers.filter(
        (helper) =>
          helper.Name.toLowerCase().includes(value.toLowerCase()) ||
          (helper.Code && helper.Code.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredHelpers(filtered);
    };

    const handleSelectHelper = (helper) => {
      setSearchTermHelper(`${helper.Name} (${helper.Code})`);
      setDropdownVisibleHelper(false);
    };

    // Unit Machine
    const [unitMachines, setUnitMachines] = useState([]);
    const [filteredUnitMachines, setFilteredUnitMachines] = useState([]);
    const [searchTermUnitMachine, setSearchTermUnitMachine] = useState("");
    const [dropdownVisibleUnitMachine, setDropdownVisibleUnitMachine] =
      useState(false);

    useEffect(() => {
      const loadUnitMachines = async () => {
        const data = await fetchUnitMachines();
        setUnitMachines(data);
        setFilteredUnitMachines(data);
      };
      loadUnitMachines();
    }, []);

    const handleSearchChangeUnitMachine = (event) => {
      const value = event.target.value;
      setSearchTermUnitMachine(value);
      setDropdownVisibleUnitMachine(true);

      const filtered = unitMachines.filter(
        (unit) =>
          unit.WorkCenterName.toLowerCase().includes(value.toLowerCase()) ||
          unit.WorkCenterCode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUnitMachines(filtered);
    };

    const handleSelectUnitMachine = (unit) => {
      setSearchTermUnitMachine(`${unit.WorkCenterName} (${unit.WorkCenterCode})`);
      setFormData((prev) => ({ ...prev, unit_machine: unit.WorkCenterCode }));
      setDropdownVisibleUnitMachine(false);
    };

    // Contractoer
    const [contractors, setContractors] = useState([]);
    const [filteredContractors, setFilteredContractors] = useState([]);
    const [searchTermContractor, setSearchTermContractor] = useState("");
    const [dropdownVisibleContractor, setDropdownVisibleContractor] =
      useState(false);
    useEffect(() => {
      const loadContractors = async () => {
        const data = await fetchContractors();
        setContractors(data);
        setFilteredContractors(data);
      };
      loadContractors();
    }, []);
    const handleSearchChangeContractor = (event) => {
      const value = event.target.value;
      setSearchTermContractor(value);
      setDropdownVisibleContractor(true);

      const filtered = contractors.filter((contractor) =>
        contractor.ContractorName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContractors(filtered);
    };

    const handleSelectContractor = (contractor) => {
      setSearchTermContractor(contractor.ContractorName);
      setFormData((prev) => ({ ...prev, contractor: contractor.ContractorName }));
      setDropdownVisibleContractor(false);
    };

    // Operator
    const [operators, setOperators] = useState([]);
    const [filteredOperators, setFilteredOperators] = useState([]);
    const [searchTermOperator, setSearchTermOperator] = useState("");
    const [dropdownVisibleOperator, setDropdownVisibleOperator] = useState(false);

    useEffect(() => {
      const loadOperators = async () => {
        const data = await fetchOperators();
        setOperators(data);
        setFilteredOperators(data);
      };
      loadOperators();
    }, []);

    const handleSearchChangeOperator = (event) => {
      const value = event.target.value;
      setSearchTermOperator(value);
      setDropdownVisibleOperator(true);

      const filtered = operators.filter(
        (operator) =>
          operator.Name.toLowerCase().includes(value.toLowerCase()) ||
          operator.Code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOperators(filtered);
    };

    const handleSelectOperator = (operator) => {
      setSearchTermOperator(`${operator.Name} (${operator.Code})`);
      setFormData((prev) => ({ ...prev, operator: operator.Code }));
      setDropdownVisibleOperator(false);
    };

    // supervissor

    const [supervisors, setSupervisors] = useState([]);
    const [filteredSupervisors, setFilteredSupervisors] = useState([]);
    const [searchTermSupervisor, setSearchTermSupervisor] = useState("");
    const [dropdownVisibleSupervisor, setDropdownVisibleSupervisor] =
      useState(false);
    useEffect(() => {
      const loadSupervisors = async () => {
        const data = await fetchSupervisors();
        setSupervisors(data);
        setFilteredSupervisors(data);
      };
      loadSupervisors();
    }, []);

    const handleSearchChangeSupervisor = (event) => {
      const value = event.target.value;
      setSearchTermSupervisor(value);
      setDropdownVisibleSupervisor(true);

      const filtered = supervisors.filter(
        (supervisor) =>
          supervisor.Name.toLowerCase().includes(value.toLowerCase()) ||
          supervisor.Code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSupervisors(filtered);
    };

    const handleSelectSupervisor = (supervisor) => {
      setSearchTermSupervisor(`${supervisor.Name} (${supervisor.Code})`);
      setFormData((prev) => ({ ...prev, Supervisor: supervisor.Name }));
      setDropdownVisibleSupervisor(false);
    };

    // shift
    const [shifts, setShifts] = useState([]);
    const [filteredShifts, setFilteredShifts] = useState([]);
    const [searchTermShift, setSearchTermShift] = useState("");
    const [dropdownVisibleShift, setDropdownVisibleShift] = useState(false);
    const [, setSelectedShift] = useState(null);

    useEffect(() => {
      const loadShifts = async () => {
        const data = await fetchShifts();
        setShifts(data);
        setFilteredShifts(data);
      };
      loadShifts();
    }, []);
    const handleSearchChangeShift = (event) => {
      const value = event.target.value;
      setSearchTermShift(value);
      setDropdownVisibleShift(true);

      const filtered = shifts.filter(
        (shift) =>
          shift.Shift_Name.toLowerCase().includes(value.toLowerCase()) ||
          shift.Shift_From.toLowerCase().includes(value.toLowerCase()) ||
          shift.Shift_Till.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredShifts(filtered);
    };

    const handleSelectShift = (shift) => {
      setSearchTermShift(
        `${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`
      );
      setSelectedShift(shift);
      setFormData((prev) => ({ ...prev, shift: shift.Shift_Name }));
      setDropdownVisibleShift(false);

      // Update form data with the selected shift's information
      setFormData({
        shift_from: shift.Shift_From,
        shift_to: shift.Shift_Till,
        break_from: shift.Break_Name, // Assuming Break_Name is what you want here
        break_to: shift.Break_Till, // Assuming Break_Till is what you want here
        break_total: shift.Break_Time,
        shift_time: shift.Total_Hours, // Assuming Total_Hours as shift_time
        prod_qty: "", // Add any other fields if necessary
        avail_time: "",
        cycle_time: "",
        op_time: "",
        lu_time: "",
        mo_time: "",
        total_time: "",
      });
    };

    const [formData, setFormData] = useState({
      Series: "DP",
      General: "General info about production",
      MachineDowntime: "No downtime",
      // Prod_no: "DP 252600002",
      contractor: "",
      unit_machine: "",
      item: "",
      operation: "",
      prod_qty: "",
      Date: "",
      Time: "",
      Supervisor: "",
      machine_speed: "",
      Helper: "",
      ParentOperation: "",
      ProdTime: "",
      shift: "",
      operator: "",
      lot_no: "",
      rework_qty: "",
      reject_qty: "",
      shift_from: "",
      shift_to: "",
      break_from: "",
      break_to: "",
      break_total: "",
      shift_time: "",
      avail_time: "",
      prod_time: "",
      cycle_time: "",
      op_time: "",
      lu_time: "",
      mo_time: "",
      total_time: "",
      electricity_start_unit: "",
      electricity_end_unit: "",
      electricity_total_unit: "",
      scrap_end_piece_qty: "",
      scrap_qty: "",
      scrap_end_remark: "",
      mill_name: "",
      remark: "",
      target_qty: "",
      production_hours: "",
      idle_hours: "",
      actual_hours: "",
      Rework_Description: "",
      ReworkQty: "",
      Reject_Description: "",
      Reject_Quantity: "",
      ItemCode: "",
      ItemDescription: "",
      MachineIdleTime_Detail_Enter: [],
    });

    const [idleTimeForm, setIdleTimeForm] = useState({
      idle_reason: "",
      from_time: "",
      to_time: "",
      total_time: "",
      supervisor_operator: "",
      setting_part: "",
      remark: "",
    });

    const [idleTimeRecords, setIdleTimeRecords] = useState([]);

    // Auto-calculate total time
    useEffect(() => {
      if (idleTimeForm.from_time && idleTimeForm.to_time) {
        const from = new Date(`1970-01-01T${idleTimeForm.from_time}`);
        const to = new Date(`1970-01-01T${idleTimeForm.to_time}`);
        const diff = (to - from) / 1000 / 60 / 60;
        setIdleTimeForm((prev) => ({
          ...prev,
          total_time: diff.toFixed(2) + " hrs",
        }));
      }
    }, [idleTimeForm.from_time, idleTimeForm.to_time]);

    const handleAddIdleTime = () => {
      if (
        !idleTimeForm.idle_reason ||
        !idleTimeForm.from_time ||
        !idleTimeForm.to_time
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      setIdleTimeRecords((prev) => [...prev, idleTimeForm]);

      // Reset form fields after adding a record
      setIdleTimeForm({
        idle_reason: "",
        from_time: "",
        to_time: "",
        total_time: "",
        supervisor_operator: "",
        setting_part: "",
        remark: "",
      });
    };

    const handleDeleteIdleTime = (index) => {
      setIdleTimeRecords(idleTimeRecords.filter((_, i) => i !== index));
    };

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
      console.log("Updated Idle Time Records:", idleTimeRecords);
    }, [idleTimeRecords]);

    const fetchNextProductionNumber = useCallback(async () => {
      if (!series || !shortYear) {
          console.warn("⚠️ Missing series or shortYear, skipping next production number fetch.");
          return;
      }

      console.log("🔄 Fetching next production number for series:", series, "and year:", shortYear);

      try {
          const nextProdData = await getProductionNumber(series, shortYear);
          console.log("🆕 Next Production Number Response:", nextProdData);

          if (nextProdData?.prod_no) {
              setProdNo(nextProdData.prod_no);
              console.log("✅ Updated Production Number:", nextProdData.prod_no);
          } else {
              toast.error("⚠️ Failed to fetch the next production number.");
          }
      } catch (error) {
          console.error("❌ Error fetching next production number:", error);
          toast.error("❌ Failed to get the next production number.");
      }
  }, [series, shortYear]); // ✅ Dependencies added correctly

  useEffect(() => {
    if (series === "DP" && shortYear) {
        fetchNextProductionNumber();
    }
  }, [series, shortYear, fetchNextProductionNumber]); // ✅ No ESLint warnings



    // Handle form submission
  
     const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("🚀 Form submission started...")

    const postData = {
      ...formData,
      Prod_no: prodNo || "",
      contractor: formData.contractor || "N/A",
      unit_machine: formData.unit_machine || "N/A",
      item: formData.item || "N/A",
      operation: formData.operation || "N/A",
      prod_qty: formData.prod_qty || "0",
      Date: formData.Date || new Date().toISOString().split("T")[0],
      Time: formData.Time || new Date().toLocaleTimeString("en-GB"),
      Supervisor: formData.Supervisor || "N/A",
      shift: formData.shift || "Morning",
      operator: formData.operator || "N/A",
      lot_no: formData.lot_no || "N/A",
      rework_qty: formData.rework_qty || "0",
      MachineIdleTime_Detail_Enter: idleTimeRecords,
    }

    console.log("📤 Sending Data:", postData)

    try {
      let response

      if (isEditMode) {
        // Update existing production entry
        response = await updateProduction(id, postData)
        console.log("✅ Update Response:", response)

        if (!response || response.error) {
          throw new Error(`Error: ${response.error || "Unknown error occurred"}`)
        }

        toast.success("✅ Production entry updated successfully!")
        // Navigate back to the list after successful update
        navigate("/ProductionEntryList")
      } else {
        // Create new production entry
        response = await createProductionEntry(postData)
        console.log("✅ API Response:", response)

        if (!response || response.error) {
          throw new Error(`Error: ${response.error || "Unknown error occurred"}`)
        }

        toast.success("✅ Production entry submitted successfully!")

        // Clear form fields for new entry
        setFormData({
          Prod_no: "",
          contractor: "",
          unit_machine: "",
          item: "",
          operation: "",
          prod_qty: "",
          Date: getCurrentDateTime().currentDate,
          Time: getCurrentDateTime().currentTime,
          Supervisor: "",
          machine_speed: "",
          Helper: "",
          ParentOperation: "",
          shift: "",
          operator: "",
          lot_no: "",
          rework_qty: "",
          reject_qty: "",
          MachineIdleTime_Detail_Enter: [],
        })

        // Fetch next production number after clearing the form
        await fetchNextProductionNumber()
      }
    } catch (error) {
      console.error("❌ Submission Error:", error)
      toast.error(`❌ Submission failed: ${error.message}`)
    }
  }
    



    return (
      // ProductionEntry Component UI
      <div className="ProductionEntryMaster">
        <ToastContainer/>
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
                  <div className="ProductionEntry mt-5">
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="ProductionEntry-header mb-4 text-start">
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <h5 className="header-title">Production Entry</h5>
                          </div>
                          <div className="col-md-1">Series</div>
                          <div className="col-md-1">
                            <select
                              value={series}
                              id="series"
                              name="series"
                              onChange={(e) => setSeries(e.target.value)}
                              className="form-control"
                            >
                              <option value="">Select</option>
                              <option value="DP">Daily Production</option>
                            </select>
                          </div>
                          <div className="col-md-1">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                id="general"
                                name="General"
                                value={formData.General}
                                onChange={handleChange}
                              />
                              General
                            </label>
                          </div>
                          <div className="col-md-1">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                id="downtime"
                                name="MachineDowntime"
                                value={formData.MachineDowntime}
                                onChange={handleChange}
                              />
                              Downtime
                            </label>
                          </div>

                          <div className="col-md-6 text-end">
                            <Link to="/ProductionEntryList" type="button" className="btn">
                              Production List
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="ProductionEntry-main mt-5">
                        <div className="row text-start">
                          {/* First Column */}
                          <div className="col-md-4">
                            {/* Prod. No */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="prod-no">Prod. No :</label>
                              </div>
                              <div className="col-8 d-flex align-items-center">
                                <input
                                  id="prod_no"
                                  placeholder="232400001"
                                  className="form-control"
                                  value={prodNo}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary ml-2"
                                >
                                  <Cached />
                                </button>
                              </div>
                            </div>

                            {/* Contractor */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="contractor">Contractor :</label>
                              </div>
                              <div className="col-8 position-relative">
                                <input
                                  id="contractor"
                                  className="form-control"
                                  placeholder="Search by contractor name"
                                  value={searchTermContractor}
                                  onChange={handleSearchChangeContractor}
                                  onFocus={() =>
                                    setDropdownVisibleContractor(true)
                                  } // Show dropdown on focus
                                />
                                {dropdownVisibleContractor && (
                                  <ul
                                    className="dropdown-menu show mt-2"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredContractors.length > 0 ? (
                                      filteredContractors.map(
                                        (contractor, index) => (
                                          <li
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleSelectContractor(contractor)
                                            }
                                            style={{ cursor: "pointer" }}
                                          >
                                            {contractor.ContractorName}
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li className="dropdown-item">
                                        No results found
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* UNIT/Machine */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="unit-machine">
                                  UNIT/Machine :
                                </label>
                              </div>
                              <div className="col-8 position-relative">
                                <input
                                  id="unit-machine"
                                  className="form-control"
                                  placeholder="Search by name or code"
                                  value={searchTermUnitMachine}
                                  onChange={handleSearchChangeUnitMachine}
                                  onFocus={() =>
                                    setDropdownVisibleUnitMachine(true)
                                  } // Show dropdown on focus
                                />
                                {dropdownVisibleUnitMachine && (
                                  <ul
                                    className="dropdown-menu show mt-2"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredUnitMachines.length > 0 ? (
                                      filteredUnitMachines.map((unit, index) => (
                                        <li
                                          key={index}
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleSelectUnitMachine(unit)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          {`${unit.WorkCenterName} (${unit.WorkCenterCode})`}
                                        </li>
                                      ))
                                    ) : (
                                      <li className="dropdown-item">
                                        No results found
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Item */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="item">Item :</label>
                              </div>
                              <div className="col-8 d-flex align-items-center">
                                <select
                                  className="form-control flex-grow-1"
                                  value={formData.item}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      item: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="1">One</option>
                                </select>

                                <button
                                  type="button"
                                  className="btn btn-outline-secondary ml-2"
                                >
                                  <Cached />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary ml-2"
                                >
                                  📋
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary ml-2"
                                >
                                  📝
                                </button>
                              </div>
                            </div>

                            {/* Operation */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="operation">Operation :</label>
                              </div>
                              <div className="col-8">
                                <input
                                  id="operation"
                                  name="operation"
                                  className="form-control"
                                  placeholder="Operation Type"
                                  value={formData.operation}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            {/* Prod. Qty */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="prod_qty">Prod. Qty :</label>
                              </div>
                              <div className="col-8">
                                <input
                                  id="prod-qty"
                                  name="prod_qty"
                                  type="text"
                                  className="form-control"
                                  value={formData.prod_qty}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Second Column */}
                          <div className="col-md-4">
                            {/* Date & Time */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="date">Date & Time :</label>
                              </div>
                              <div className="col-md-4">
                                <input
                                  id="date"
                                  type="date"
                                  name="Date"
                                  className="form-control"
                                  value={formData.Date}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="col-md-4">
                                <input
                                  id="time"
                                  type="time"
                                  name="Time"
                                  className="form-control"
                                  value={formData.Time}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            {/* Supervisor */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="supervisor">Supervisor:</label>
                              </div>
                              <div className="col-8 position-relative">
                                <input
                                  id="supervisor"
                                  name="Supervisor"
                                  className="form-control"
                                  placeholder="Search by name or code"
                                  value={searchTermSupervisor}
                                  onChange={handleSearchChangeSupervisor}
                                  onFocus={() =>
                                    setDropdownVisibleSupervisor(true)
                                  } // Show dropdown on focus
                                />
                                {dropdownVisibleSupervisor && (
                                  <ul
                                    className="dropdown-menu show mt-2"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredSupervisors.length > 0 ? (
                                      filteredSupervisors.map(
                                        (supervisor, index) => (
                                          <li
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleSelectSupervisor(supervisor)
                                            }
                                            style={{ cursor: "pointer" }}
                                          >
                                            {`${supervisor.Name} (${supervisor.Code})`}
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li className="dropdown-item">
                                        No results found
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Machine Speed */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="machine-speed">
                                  Machine Speed:
                                </label>
                              </div>
                              <div className="col-8">
                                <select
                                  id="machine-speed"
                                  name="machine_speed"
                                  className="form-control"
                                  value={formData.machine_speed}
                                  onChange={handleChange}
                                >
                                  <option value="Not Applicable">
                                    Not Applicable
                                  </option>
                                  <option value="High Speed">High Speed</option>
                                  <option value="Medium Speed">
                                    Medium Speed
                                  </option>
                                  <option value="Low Speed">Low Speed</option>
                                </select>
                              </div>
                            </div>

                            {/* Lot No */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="lot-no">Lot No :</label>
                              </div>
                              <div className="col-8">
                                <select
                                  name="lot_no"
                                  className="form-control"
                                  value={formData.lot_no}
                                  onChange={handleChange}
                                >
                                  <option>Select</option>
                                  <option value="One">One</option>
                                </select>
                              </div>
                            </div>

                            {/* Prod Time */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="prod-text">Prod Time :</label>
                              </div>
                              <div className="col-8 d-flex">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="ProdTime"
                                  value={formData.ProdTime}
                                  onChange={handleChange}
                                />
                                <input
                                  type="text"
                                  name="ParentOperation"
                                  className="form-control ml-2"
                                  value={formData.ParentOperation}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Third Column */}
                          <div className="col-md-4">
                            {/* Shift */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="shift">Shift :</label>
                              </div>
                              <div className="col-8 position-relative">
                                <input
                                  id="shift"
                                  name="shift"
                                  className="form-control"
                                  placeholder="Search shift by name or time"
                                  value={searchTermShift}
                                  onChange={handleSearchChangeShift}
                                  onFocus={() => setDropdownVisibleShift(true)} // Show dropdown on focus
                                />
                                {dropdownVisibleShift && (
                                  <ul
                                    className="dropdown-menu show mt-2"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredShifts.length > 0 ? (
                                      filteredShifts.map((shift, index) => (
                                        <li
                                          key={index}
                                          className="dropdown-item"
                                          onClick={() => handleSelectShift(shift)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {`${shift.Shift_Name} From: ${shift.Shift_From} To: ${shift.Shift_Till}`}
                                        </li>
                                      ))
                                    ) : (
                                      <li className="dropdown-item">
                                        No results found
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Operator */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="operator">Operator :</label>
                              </div>
                              <div className="col-8 position-relative">
                                <input
                                  id="operator"
                                  name="operator"
                                  className="form-control"
                                  placeholder="Search by name or code"
                                  value={searchTermOperator}
                                  onChange={handleSearchChangeOperator}
                                  onFocus={() => setDropdownVisibleOperator(true)} // Show dropdown on focus
                                />
                                {dropdownVisibleOperator && (
                                  <ul
                                    className="dropdown-menu show mt-2"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredOperators.length > 0 ? (
                                      filteredOperators.map((operator, index) => (
                                        <li
                                          key={index}
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleSelectOperator(operator)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          {`${operator.Name} (${operator.Code})`}
                                        </li>
                                      ))
                                    ) : (
                                      <li className="dropdown-item">
                                        No results found
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Helper */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="helper">Helper :</label>
                              </div>
                              <div className="col-8 position-relative">
                                <input
                                  id="helper"
                                  name="Helper"
                                  className="form-control"
                                  placeholder="Search by name or code"
                                  value={searchTermHelper}
                                  onChange={handleSearchChangeHelper}
                                  onFocus={() => setDropdownVisibleHelper(true)} // Show dropdown on focus
                                />
                                {dropdownVisibleHelper && (
                                  <ul
                                    className="dropdown-menu show mt-2"
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                      zIndex: 1000,
                                    }}
                                  >
                                    {filteredHelpers.length > 0 ? (
                                      filteredHelpers.map((helper, index) => (
                                        <li
                                          key={index}
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleSelectHelper(helper)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          {`${helper.Name} (${helper.Code})`}
                                        </li>
                                      ))
                                    ) : (
                                      <li className="dropdown-item">
                                        No results found
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            </div>

                            {/* Rework and Reject Qty */}
                            <div className="row mb-2">
                              <div className="col-4">
                                <label htmlFor="rework-qty">Rework Qty :</label>
                              </div>
                              <div className="col-8 d-flex">
                                <input
                                  id="rework-qty"
                                  name="rework_qty"
                                  type="text"
                                  className="form-control"
                                  value={formData.rework_qty}
                                  onChange={handleChange}
                                />
                                <label htmlFor="reject-qty" className="ml-2">
                                  Reject Qty :
                                </label>
                                <input
                                  id="reject-qty"
                                  name="reject_qty"
                                  type="text"
                                  className="form-control ml-2"
                                  value={formData.reject_qty}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="ProductionEntry-second">
                          <ul
                            className="nav nav-tabs"
                            id="productionEntryTabs"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="shift-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#shifttabs"
                                type="button"
                                role="tab"
                              >
                                Shift / Cycle Time
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="machine-idle-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#machineIdle"
                                type="button"
                                role="tab"
                              >
                                Machine Idle Time
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="rework-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#rework"
                                type="button"
                                role="tab"
                              >
                                Rework / Reject Reason
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="tool-die-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#toolDie"
                                type="button"
                                role="tab"
                              >
                                Tool and Die Details
                              </button>
                            </li>
                          </ul>
                          <div
                            className="tab-content mt-4"
                            id="productionEntryTabsContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="shifttabs"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="table table-bordered table-responsive">
                                  <table>
                                    <thead>
                                      <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-2">
                                          Shift From
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          To
                                        </th>

                                        <th className="border border-gray-300 p-2">
                                          Break From
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          To
                                        </th>

                                        <th className="border border-gray-300 p-2">
                                          Break Total
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          Shift Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          Prod Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          Avl. Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          Cycle Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          OP Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          L/U Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          MO Time
                                        </th>
                                        <th className="border border-gray-300 p-2">
                                          Total Time
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="shift_from"
                                            className="form-control"
                                            value={formData.shift_from}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="shift_to"
                                            className="form-control"
                                            value={formData.shift_to}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="break_from"
                                            className="form-control"
                                            value={formData.break_from}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="break_to"
                                            className="form-control"
                                            value={formData.break_to}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="break_total"
                                            className="form-control"
                                            value={formData.break_total}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="shift_time"
                                            className="form-control"
                                            value={formData.shift_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="prod_time"
                                            className="form-control"
                                            value={formData.prod_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="avail_time"
                                            className="form-control"
                                            value={formData.avail_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="cycle_time"
                                            className="form-control"
                                            value={formData.cycle_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="op_time"
                                            className="form-control"
                                            value={formData.op_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="lu_time"
                                            className="form-control"
                                            value={formData.lu_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="mo_time"
                                            className="form-control"
                                            value={formData.mo_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                          <input
                                            type="text"
                                            name="total_time"
                                            className="form-control"
                                            value={formData.total_time}
                                            onChange={handleChange}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div className="row">
                                  <div className="table table-responsive">
                                    <table>
                                      <thead>
                                        <tr className="bg-gray-100">
                                          <th className="border border-gray-300 p-2">
                                            Electricity
                                          </th>
                                          <th className="border border-gray-300 p-2">
                                            Start Unit:
                                          </th>
                                          <th className="border border-gray-300 p-2">
                                            Edit Unit:
                                          </th>
                                          <th className="border border-gray-300 p-2">
                                            Total Unit:
                                          </th>
                                          <th className="border border-gray-300 p-2">
                                            Scrap / End Piece Code:0
                                          </th>
                                          <th className="border border-gray-300 p-2">
                                            Scrap /End Qty :
                                          </th>
                                          <th className="border border-gray-300 p-2">
                                            Scrap /End Remark :
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="border border-gray-300 p-2">
                                            <label>Consumption:</label>
                                            <br />
                                            <label>Mill name:</label>
                                          </td>
                                          <td className="border border-gray-300 p-2">
                                            <input
                                              type="text"
                                              name="electricity_start_unit"
                                              className="form-control"
                                              value={
                                                formData.electricity_start_unit
                                              }
                                              onChange={handleChange}
                                            />
                                            <br />
                                            <input
                                              type="text"
                                              name="mill_name"
                                              className="form-control"
                                              value={formData.mill_name}
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td className="border border-gray-300 p-2">
                                            <input
                                              type="text"
                                              name="electricity_end_unit"
                                              className="form-control"
                                              value={
                                                formData.electricity_end_unit
                                              }
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td className="border border-gray-300 p-2">
                                            <input
                                              type="text"
                                              name="electricity_total_unit"
                                              className="form-control"
                                              value={
                                                formData.electricity_total_unit
                                              }
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td className="border border-gray-300 p-2">
                                            <input
                                              type="text"
                                              name="scrap_end_piece_qty"
                                              className="form-control"
                                              value={formData.scrap_end_piece_qty}
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td className="border border-gray-300 p-2">
                                            <input
                                              type="text"
                                              name="scrap_qty"
                                              className="form-control"
                                              value={formData.scrap_qty}
                                              onChange={handleChange}
                                            />
                                          </td>
                                          <td className="border border-gray-300 p-2">
                                            <input
                                              type="text"
                                              name="scrap_end_remark"
                                              className="form-control"
                                              value={formData.scrap_end_remark}
                                              onChange={handleChange}
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="machineIdle"
                              role="tabpanel"
                            >
                              <div className="table table-bordered table-responsive">
                                <table>
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="border border-gray-300 p-2">
                                        Idle Reason:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        From:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        To:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Total Time:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Supervisor /Operators:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Setting Part:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Remark:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Add:
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border border-gray-300 p-2">
                                        <div className="flex">
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="idle_reason"
                                            value={idleTimeForm.idle_reason}
                                            onChange={(e) =>
                                              setIdleTimeForm({
                                                ...idleTimeForm,
                                                idle_reason: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <div className="flex">
                                          <input
                                            type="time"
                                            className="form-control"
                                            name="from_time"
                                            value={idleTimeForm.from_time}
                                            onChange={(e) =>
                                              setIdleTimeForm({
                                                ...idleTimeForm,
                                                from_time: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="time"
                                          className="form-control"
                                          name="to_time"
                                          value={idleTimeForm.to_time}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              to_time: e.target.value,
                                            })
                                          }
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="time"
                                          className="form-control"
                                          name="total_time"
                                          value={idleTimeForm.total_time}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              total_time: e.target.value,
                                            })
                                          }
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="supervisor_operator"
                                          value={idleTimeForm.supervisor_operator}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              supervisor_operator: e.target.value,
                                            })
                                          }
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="setting_part"
                                          value={idleTimeForm.setting_part}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              setting_part: e.target.value,
                                            })
                                          }
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="remark"
                                          value={idleTimeForm.remark}
                                          onChange={(e) =>
                                            setIdleTimeForm({
                                              ...idleTimeForm,
                                              remark: e.target.value,
                                            })
                                          }
                                        />
                                      </td>
                                      <td className="border border-gray-300 p-2">
                                        <button
                                          type="button"
                                          className="btn"
                                          onClick={handleAddIdleTime}
                                        >
                                          Add
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="table table-bordered table-responsive">
                                <table>
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="border border-gray-300 p-2">
                                        S no.:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Reason:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        From Time:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        To Time:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Idle Time:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Operator Name:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Setting Part:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Remark:
                                      </th>
                                      <th className="border border-gray-300 p-2">
                                        Delete:
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {idleTimeRecords.map((record, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{record.idle_reason}</td>
                                        <td>{record.from_time}</td>
                                        <td>{record.to_time}</td>
                                        <td>{record.total_time}</td>
                                        <td>{record.supervisor_operator}</td>
                                        <td>{record.setting_part}</td>
                                        <td>{record.remark}</td>
                                        <td>
                                          <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                              handleDeleteIdleTime(index)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="rework"
                              role="tabpanel"
                            >
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-2">
                                      <label>Rework</label>
                                    </div>
                                    <div className="col-md-2">
                                      <select style={{marginTop:"2px"}}>
                                        <option>Select</option>
                                      </select>
                                    </div>
                                    {/* <div className="col-md-1">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </div> */}
                                    {/* <div className="col-md-1">
                                      <button type="button" className="btn">
                                        Add
                                      </button>
                                    </div> */}
                                    <div className="col-md-1">
                                      <button type="button" className="btn">
                                        <FaPlus />
                                      </button>
                                    </div>
                                    <div className="col-md-1">
                                      <button type="button" className="btn">
                                        <Cached />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="table table-bordered table-responsive">
                                      <table>
                                        <thead>
                                          <tr>
                                            <th>Sr no.</th>
                                            <th>Description</th>
                                            <th>Qty</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </td>
                                            <td>
                                              <input
                                                className="form-control"
                                                type="text"
                                                name="Rework_Description"
                                                value={
                                                  formData.Rework_Description
                                                }
                                                onChange={handleChange}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                className="form-control"
                                                type="text"
                                                name="ReworkQty"
                                                value={formData.ReworkQty}
                                                onChange={handleChange}
                                              />
                                            </td>

                                            <td>
                                              <FaTrash />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-2">
                                      <label>Reject</label>
                                    </div>
                                    <div className="col-md-2">
                                      <select style={{marginTop:"2px"}}>
                                        <option>Select</option>
                                      </select>
                                    </div>
                                    {/* <div className="col-md-1">
                                      <input
                                        type="text"
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="col-md-1">
                                      <button type="button" className="btn">
                                        Add
                                      </button>
                                    </div> */}
                                    <div className="col-md-1">
                                      <button type="button" className="btn">
                                        <FaPlus />
                                      </button>
                                    </div>
                                    <div className="col-md-1">
                                      <button type="button" className="btn">
                                        <Cached />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="row mt-5">
                                    <div className="table table-bordered table-responsive">
                                      <table>
                                        <thead>
                                          <tr>
                                            <th>Sr no.</th>
                                            <th>Description</th>
                                            <th>Qty</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <input
                                                className="form-control"
                                                type="text"
                                              />
                                            </td>
                                            <td>
                                              <input
                                                className="form-control"
                                                type="text"
                                                name="Reject_Description"
                                                value={
                                                  formData.Reject_Description
                                                }
                                                onChange={handleChange}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                className="form-control"
                                                type="text"
                                                name="Reject_Quantity"
                                                value={formData.Reject_Quantity}
                                                onChange={handleChange}
                                              />
                                            </td>

                                            <td>
                                              <FaTrash />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="toolDie"
                              role="tabpanel"
                            >
                              <div className="Container-fluid">
                                <div className="row">
                                  <div className="col-md-1">
                                    <label>Die Name</label>
                                  </div>
                                  <div className="col-md-2">
                                    <input type="text" className="form-control" style={{marginTop:"-2px"}} />
                                  </div>
                                  <div className="col-md-1">
                                    <button type="button" className="btn">
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-4">
                                <div className="table table-bordered table-responsive">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Sr no.</th>
                                        <th>Item Code</th>
                                        <th>Item Description</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <input
                                            className="form-control"
                                            type="text"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="ItemCode"
                                            value={formData.ItemCode}
                                            onChange={handleChange}
                                          />
                                        </td>
                                        <td>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="ItemDescription"
                                            value={formData.ItemDescription}
                                            onChange={handleChange}
                                          />
                                        </td>

                                        <td>
                                          <FaTrash />
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
                      <div className="productionbottom mt-5">
                        <div className="row align-items-center text-start g-2 mt-2">
                          {/* Remark */}
                          <div className="col-md-2">
                            <label>Remark:</label>
                            <textarea
                              className="form-control"
                              name="remark"
                              value={formData.remark}
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          {/* Target Qty */}
                          <div className="col-md-2">
                            <label>Target Qty:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="target_qty"
                              value={formData.target_qty}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Prod */}
                          <div className="col-md-2">
                            <label>Prod:</label>
                            <select className="form-control" name="prod_type">
                              <option>Regular</option>
                            </select>
                          </div>

                          {/* Production Hours */}
                          <div className="col-md-2">
                            <label>Production Hours:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="production_hours"
                              value={formData.production_hours}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Idle Hours */}
                          <div className="col-md-2">
                            <label>Idle Hours:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="idle_hours"
                              value={formData.idle_hours}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Actual Hours */}
                          <div className="col-md-2">
                            <label>Actual Hours:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="actual_hours"
                              value={formData.actual_hours}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Save Button */}
                          <div className="col-md-12 d-flex justify-content-end mt-3">
                            <button type="submit" className="btn">
                              Save Entry
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductionEntry;
