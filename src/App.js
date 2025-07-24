import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Dashboard from "./Dashboard/Dashboard";
// import Home from "./Home/Home";
// import MainPage from "./MainPage/MainPage";
import VendorPage from "./VendorPage/VendorPage";
import Login from "./Login/Login.jsx"


/////////////////////////// Masters ///////////////////////////////

import MasterState from "./components/Master/MasterState";
import MasterCustomers from "./components/Master1/MasterCustomers";
import CustomerState from "./components/Master2/CustomerState";
import ItemMaster from "./components/ItemMasterr/ItemMaster/ItemMaster";
import AddNewItem from "./components/ItemMasterr/AddNewItem/AddNewItem";
import ItemMasterGernal from "./components/ItemMasterr/ItemMasterGernal/ItemMasterGernal";
// import ItemMasterQuery from "./components/ItemMasterr/ItemMasterQuery/ItemMasterQuery.jsx";
import WorkCenterMaster from "./components/WorkCenterMaster/WorkCenterMaster";
import BusinessPartner from "./components/BusinessPartner/BusinessPartner";
import CustomerItemWise from "./components/CustomerItemWise/CustomerItemWise";
import CustomerSupplierLink from "./components/CustomerSupplierLink/CustomerSupplierLink";
import ItemCrossReference from "./components/ItemCrossReference.js/ItemCrossReference";
import GstMaster from "./components/GstMaster/GstMaster";
import CustomerItemGst from "./components/GstMaster/CustomerItem/CustomerItem";
import TaskMaster from "./components/GstMaster/TaskMaster/TaskMaster";
import Cutwise from "./components/GstMaster/Cutwise/Cutwise";
import SupplierCustomerMaster from "./components/SupplierCustomerMaster/SupplierCustomerMaster";
import VenderListSupplier from "./components/SupplierCustomerMaster/VenderList/VenderList";
import BomRouting from "./components/BOMRouting/BomRouting";
import BillMaterial from "./components/BOMRouting/BillMaterial/BillMaterial";
import OperatorSupervisor from "./components/Operator-Supervisor/OperatorSupervisor";
import Supervisor from "./components/Operator-Supervisor/Supervisor/Supervisor";
import DepartmentHead from "./components/Operator-Supervisor/DepartmentHead/DepartmentHead";
import ContractorMaster from "./components/ContractorMaster/ContractorMaster";
import AddContractorMAster from "./components/ContractorMaster/AddContractor/AddContractor";
import ShiftMaster from "./components/ShiftMaster/ShiftMaster";
import UnitConversion from "./components/UnitConversion/UnitConversion";
import PriceListMaster from "./components/PriceListMaster/PriceListMaster";
import PriceEntry from "./components/PriceListMaster/PeiceEntry/PriceEntry";
import CycleTime from "./components/CycleTimeMaster/CycleTime";
import AddCycleTime from "./components/CycleTimeMaster/AddCycleTime/AddCycleTime";
import CommodityMaster from "./components/CommodityMaster/CommodityMaster";
import CostCenterMaster from "./components/CostCenterMaster/CostCenterMaster";
import WorkCenterSchedule from "./components/WorkSchedule/WorkSchedule";
import ProjectManagement from "./components/ProjectManagement/ProjectManagement";
import ProjectInventory from "./components/ProjectManagement/ProjectInventory/ProjectInventory";
import DocumentManagement from "./components/DocumentManagement/DocumentManagement";
import MasterReport from "./components/MasterReport/MasterReport";

import ItemMasterQuery from "./components/ItemMasterr/ItemMasterQuery/ItemMasterQuery.jsx";
import QueryPages from "./components/ItemMasterr/ItemMasterQuery/QueryPages.jsx";
import CustomerQuery from "./components/SupplierCustomerMaster/VenderList/CustomerQuery.jsx";
import BOMQuery from "./components/BOMRouting/BOMQuery.jsx";
import PriceListQueryMaster from "./components/PriceListMaster/PriceListQueryMaster.jsx";
import PriceListQuery from "./components/PriceListMaster/PriceListQuery.jsx";
import CustomerQueryMaster from "./components/SupplierCustomerMaster/VenderList/CustomerQueryMaster.jsx"
import BOMMasterQuery from "./components/BOMRouting/BOMMasterQuery.jsx";
import UploadWIPvalue from "./components/BOMRouting/BOMReport/UploadWIPvalue.jsx";
import UploadOperationSpeci from "./components/BOMRouting/BOMReport/UploadOperationSpeci.jsx";



// /////////////////////////////// Erp Setting /////////////////////////////////////////

import UserConfiguration from "./ERPSetting/UserConfiguration/UserConfiguration.jsx";
import DisableUserList from "./ERPSetting/UserConfiguration/DisableUserList/DisableUserList.jsx";
import ErpSetting from "./ERPSetting/ErpSetting/ErpSetting.jsx";
import UserPermission from "./ERPSetting/UserPermission/UserPermission.jsx";
import UserPermit from "./ERPSetting/UserConfiguration/UserPermit/UserPermit.jsx";
import DashboardPermission from "./ERPSetting/UserConfiguration/DashboardPermission/DashboardPermission.jsx";
import BackDated from "./ERPSetting/UserConfiguration/BackDated/BackDated.jsx";
import UserWiseSeries from "./ERPSetting/UserConfiguration/UserWiseSeries/UserWiseSeries.jsx";
import ChangePassword from "./ERPSetting/ChangePassword/ChangePassword.jsx";
import UserwiseProduction from "./ERPSetting/UserConfiguration/UserwiseProduction/UserwiseProduction.jsx";
import LoginHistory from "./ERPSetting/LoginHistoryReport/LoginHistory.jsx";
import USerwiseAuth from "./ERPSetting/UserConfiguration/UserwiseAuth/USerwiseAuth.jsx";
import DeleteMangement from "./ERPSetting/DeleteMangement/DeleteMangement.jsx";
import OrderList from "./ERPSetting/DeleteMangement/OrderList.jsx";
import ViewStock from "./ERPSetting/DeleteMangement/ViewStock.jsx";
import USerList from "./ERPSetting/DeleteMangement/USerList.jsx";
import DashboardBackup from "./ERPSetting/DashboardBackup/DashboardBackup.jsx";
import DeleteRecord from "./ERPSetting/DeleteRecord/DeleteRecord.jsx";
import ItemDelete from "./ERPSetting/DeleteRecord/ItemDelete/ItemDelete.jsx";
import DeleteReport from "./ERPSetting/DeleteRecord/DeleteReport/DeleteReport.jsx";
import Userplant from "./ERPSetting/UserConfiguration/UserPlant/Userplant.jsx";
import Plantwiseseries from "./ERPSetting/UserConfiguration/PlantwiseSeries/Plantwiseseries.jsx";
import AlertSetting from "./ERPSetting/UserConfiguration/AlertSetting/AlertSetting.jsx";
import Userwisepermission from "./ERPSetting/UserConfiguration/Userwisepermissiom/Userwisepermission.jsx";
import Companysetup from "./ERPSetting/ErpSetting/Companysetup/Companysetup.jsx";
import ErpWebConfig from "./ERPSetting/ErpSetting/ErpWebconfig/ErpWebConfig.jsx";
import ErpFinancialYear from "./ERPSetting/ErpSetting/ErpFinancialYear/ErpFinancialYear.jsx";
import DocumentStart from "./ERPSetting/ErpSetting/ErpFinancialYear/DocumentStart/DocumentStart.jsx";
import FinancialMonth from "./ERPSetting/ErpSetting/FinancialMonth/FinancialMonth.jsx";
import ScheduleMonth from "./ERPSetting/ErpSetting/SeheduleMonth/ScheduleMonth.jsx";
import Weekoff from "./ERPSetting/ErpSetting/Weeklyoff/Weekoff.jsx";
import Settingerp from "./ERPSetting/ErpSetting/Setting/Settingerp.jsx";
import Docseriesgroup from "./ERPSetting/ErpSetting/Docseriesgroup/Docseriesgroup.jsx";
import DocprintFormat from "./ERPSetting/ErpSetting/Docprintformat/DocprintFormat.jsx";
import Docnoeditable from "./ERPSetting/ErpSetting/DocNoEditable/Docnoeditable.jsx";
import Qcisoformat from "./ERPSetting/ErpSetting/Qcisoformat/Qcisoformat.jsx";
import Roundofsetting from "./ERPSetting/ErpSetting/Roundofsetting/Roundofsetting.jsx";
import Customersupplier from "./ERPSetting/ErpSetting/Customersupplier/Customersupplier.jsx";
import Itemmastersetup from "./ERPSetting/ErpSetting/ItemMasterSetup/Itemmastersetup.jsx";
import Emailsms from "./ERPSetting/ErpSetting/Emailsms/Emailsms.jsx";
import Emailsetup from "./ERPSetting/ErpSetting/Emailsetup/Emailsetup.jsx";
import Emailtemplate from "./ERPSetting/ErpSetting/Emailtemplate/Emailtemplate.jsx";
import AddQuater from "./ERPSetting/ErpSetting/FinancialMonth/AddQuater/AddQuater.jsx";
import WeekMaster from "./ERPSetting/ErpSetting/SeheduleMonth/WeekMaster/WeekMaster.jsx";
import MasterData from "./ERPSetting/ErpSetting/Docseriesgroup/MasterData/MasterData.jsx";
import PurchaseErp from "./ERPSetting/ErpSetting/Docseriesgroup/PurchaseOrder/PurchaseErp.jsx";
import PurchaseERPGRN from "./ERPSetting/ErpSetting/Docseriesgroup/PurchaseERPGRN/PurchaseERPGRN.jsx";
import OutwardInward from "./ERPSetting/ErpSetting/Docseriesgroup/OutwardInward/OutwardInward.jsx";
import DebitcreditNote from "./ERPSetting/ErpSetting/Docseriesgroup/Debitcredit/DebitcreditNote.jsx";
import DocAccount from "./ERPSetting/ErpSetting/Docseriesgroup/DocAccount/DocAccount.jsx";
import Docddelivery from "./ERPSetting/ErpSetting/Docseriesgroup/Docdelivery/Docddelivery.jsx";
import DocProduction from "./ERPSetting/ErpSetting/Docseriesgroup/DocProduction/DocProduction.jsx";
import GSTsales from "./ERPSetting/ErpSetting/Docseriesgroup/GSTSales/GSTsales.jsx";
import GstsalesReturn from "./ERPSetting/ErpSetting/Docseriesgroup/GStsalesReturn/GstsalesReturn.jsx";
import Quotation from "./ERPSetting/ErpSetting/Docseriesgroup/Quotation/Quotation.jsx";
import DocCompanySetting from "./ERPSetting/ErpSetting/Docprintformat/CompanySetting/DocCompanySetting.jsx";
import ViewItemMaster from "./ERPSetting/ErpSetting/ItemMasterSetup/ViewItemMaster/ViewItemMaster.jsx";

import SettingHistory from "./ERPSetting/UserPermission/SettingHistory.jsx";
import DefaultSettingsModal from "./ERPSetting/ErpSetting/Emailsetup/DefaultSettingModel/DefaultSettingsModal.jsx";



///////////////////////////////Purchase////////////////////////////////////

import Newindent from "./PurchaseMaster/Newindent/Newindent";
import PoList from "./PurchaseMaster/NewPurchaseOrder/PoList/PoList.jsx";
import NewPurchaseOrder from "./PurchaseMaster/NewPurchaseOrder/NewPurchaseOrder.jsx";
import NewJobworkPurchase from "./PurchaseMaster/NewJobworkPurchase/NewJobworkPurchase.jsx";
import PendingPo from "./PurchaseMaster/PendingPo/PendingPo.jsx";
import PendingIndent from "./PurchaseMaster/PendingIndent/PendingIndent.jsx";
import PurchaseMrn from "./PurchaseMaster/PurchaseMRN/PurchaseMrn.jsx";
import PurchseOrderStatus from "./PurchaseMaster/PurchseOrderStatus/PurchseOrderStatus.jsx";
import Rfo from "./PurchaseMaster/QuotoComparison/RFo/Rfo.jsx";
import QuotoComparisonStatement from "./PurchaseMaster/QuotoComparison/QuotoComparisonStatement/QuotoComparisonStatement.jsx";
import QuotoComparisonPending from "./PurchaseMaster/QuotoComparison/QuotoComparisonPending/QuotoComparisonPending.jsx";
import JobWorkPurchseOrderList from "./PurchaseMaster/Report/JobWorkPurchaseOrderList1/JobWorkPurchseOrderList.jsx";
import PurchseOderList from "./PurchaseMaster/Report/PurchaseOrderList1/PurchseOderList.jsx";
import PurchaseReport from "./PurchaseMaster/Report/PurchaseReport1/PurchaseReport.jsx";
import SupplierWiseList from "./PurchaseMaster/Report/SupplierWiseList1/SupplierWiseList.jsx";
import POEdit from "./PurchaseMaster/NewPurchaseOrder/POEdit/POEdit.jsx";
import PurchaseOrderPDF from "./PurchaseMaster/NewPurchaseOrder/PurcheseOrderPDF/PurchaseOrderPDF.jsx";

import ListIndent from "./PurchaseMaster/Newindent/Indent/ListIndent.jsx";
import IndentStutasReport from "./PurchaseMaster/Newindent/Indent/IndentStutasReport.jsx";
import RecentlyPoApprovalList from "./PurchaseMaster/NewPurchaseOrder/PoList/RecentlyPoApprovalList.jsx"
import AMCPurchaseOrderList from "./PurchaseMaster/NewPurchaseOrder/PoList/AMCPurchaseOrderList.jsx";
import PurchaseQuerySummary from "./PurchaseMaster/NewPurchaseOrder/PoList/QueryList/PurchaseQuerySummary.jsx";
import PurchaseQuery from "./PurchaseMaster/NewPurchaseOrder/PoList/QueryList/PurchaseQuery.jsx";
import RFONew from "./PurchaseMaster/QuotoComparison/RFo/RFONew.jsx";
import QuoteStatementList from "./PurchaseMaster/QuotoComparison/QuotoComparisonStatement/QuoteStatementList.jsx";
import JobworkPOSummary from './PurchaseMaster/Report/JobWorkPurchaseOrderList1/QueryJobworkList/JobworkPOSummary.jsx';
import JobworkQuery from "./PurchaseMaster/Report/JobWorkPurchaseOrderList1/QueryJobworkList/JobworkQuery.jsx";

import Importfile from "./PurchaseMaster/Import/Importfile.jsx";
import ImportPO from "./PurchaseMaster/Import/Transaction/ImportPO/ImportPO.jsx"
import ImportPOList from "./PurchaseMaster/Import/Transaction/ImportPO/ImportPOList.jsx"
import POConsignment from "./PurchaseMaster/Import/Transaction/POConsignment/POConsignment.jsx";
import POConsignmentList from "./PurchaseMaster/Import/Transaction/POConsignment/POConsignmentList.jsx";
import ImportGRN from "./PurchaseMaster/Import/Transaction/ImportGRN/ImportGRN.jsx";
import ImportGRNList from "./PurchaseMaster/Import/Transaction/ImportGRN/ImportGRNList.jsx";


////////////////////////////////Store//////////////////////////////////////////////////////

import GateInwardEntry from "./StoreMaster/GateInwardEntry/GateInwardEntry.jsx";
import NewGateInward from "./StoreMaster/GateInwardEntry/NewGateInward/NewGateInward.jsx";
import PendingAsnList from "./StoreMaster/PendingASNList/PendingAsnList.jsx";
import PDL from "./StoreMaster/PendingASNList/PDL/PDL.jsx";
import VendorBillList from "./StoreMaster/PendingASNList/VendorBillList/VendorBillList.jsx";
import VendorASN from "./StoreMaster/PendingASNList/VendorASN/VendorASN.jsx";
import ASNReport from "./StoreMaster/PendingASNList/ASNReport/ASNReport.jsx";
import NewMrn from "./StoreMaster/NewMRN/NewMrn.jsx";
import ToolMrn from "./StoreMaster/NewMRN/ToolMrn/ToolMrn.jsx";
import PurchaseGrn from "./StoreMaster/PurchseGRN/PurchaseGrn.jsx";
import GrnList from "./StoreMaster/PurchseGRN/GRNList/GrnList.jsx";
import InwardChallan1 from "./StoreMaster/SubconGRN/InwardChallan/InwardChallan1.jsx";
import JobworkInwardChallan from "./StoreMaster/SubconGRN/JobworkInwardChallan/JobworkInwardChallan.jsx";
import VendorScrapInward from "./StoreMaster/SubconGRN/VendorScrapInward/VendorScrapInward.jsx";
import SubconGrn from "./StoreMaster/SubconGRN/SubconGrn.jsx";
import MaterialIssueChallan from "./StoreMaster/MaterialIssueChallan/MaterialIssueChallan.jsx";
import WorkOrderMaterial from "./StoreMaster/MaterialIssueChallan/WorkOrderMaterial/WorkOrderMaterial.jsx";
import MaterialIssue from "./StoreMaster/MaterialIssueChallan/MaterialIssue/MaterialIssue.jsx";
import WorkIssueRepost from "./StoreMaster/MaterialIssueChallan/MaterialIssue/WorkIssueRepost.jsx";
import MaterialIssueGernal from "./StoreMaster/MaterialIssueGernal/MaterialIssueGernal.jsx";
import DeliveryChallan from "./StoreMaster/DeliveryChallan/DeliveryChallan.jsx";
import Dcgrn from "./StoreMaster/DCGRN/Dcgrn.jsx";
import Dcgrnlist from "./StoreMaster/DCGRN/DcgrnLsit/Dcgrnlist.jsx";
import StoreNewindent from "./StoreMaster/Newindent/Newindent.jsx";
import IndentList from "./StoreMaster/Newindent/IndentList/IndentList.jsx";
import StockTransaction from "./StoreMaster/StockTransaction/StockTransaction.jsx";
import OpeningStock from './StoreMaster/StockTransaction/OpeningStock/OpeningStock.jsx';
import FGMovement from "./StoreMaster/StockTransaction/FGMovement/FGMovement.jsx";
import AddNewFGMovent from "./StoreMaster/StockTransaction/FGMovement/AddNewFGMovement/AddNewFGMovent.jsx";
import FGTOFGMovement from "./StoreMaster/StockTransaction/FGMovement/FGTOFGMovement/FGTOFGMovement.jsx";
import FGToFGStock from "./StoreMaster/StockTransaction/FGMovement/FGTOFGStock/FGToFGStock.jsx";
import ScrapMovement from "./StoreMaster/StockTransaction/FGMovement/ScrapMovement/ScrapMovement.jsx";
import RMStockTransaction from "./StoreMaster/StockTransaction/RMStockTransaction/RMStockTransaction.jsx";
import ScrapToFg from "./StoreMaster/StockTransaction/FGMovement/ScrapMovement/ScrapToFg/ScrapToFg.jsx";
import RMToTransaction from "./StoreMaster/StockTransaction/RMStockTransaction/RmToRmTransaction/RMToTransaction.jsx";
import RMTOtherGroup from "./StoreMaster/StockTransaction/RMStockTransaction/RMTOtherGroup/RMTOtherGroup.jsx";
import ShopFloor from "./StoreMaster/StockTransaction/ShopFloor/ShopFloor.jsx";
import ShopFloorStock from "./StoreMaster/StockTransaction/ShopFloorStock/ShopFloorStock.jsx";
import ReportStore from "./StoreMaster/Report/Report.jsx";
import StockReport from "./StoreMaster/StockReport/StorckReport.jsx";
import InwardChallanList from "./StoreMaster/SubconGRN/InwardChallanList/InwardChallanList.jsx";

import GEIQuery from "./StoreMaster/GateInwardEntry/Query/GEIQuery.jsx";
import QueryGate from "./StoreMaster/GateInwardEntry/Query/QueryGate.jsx";
import InwardChallanQuery from "./StoreMaster/SubconGRN/InwardChallanList/InwardChallanQuery.jsx";
import QueryInward from "./StoreMaster/SubconGRN/InwardChallanList/QueryInward.jsx";
import StockTransferQuery from "./StoreMaster/StockTransaction/StockTransferQuery.jsx";
import QueryStock from "./StoreMaster/StockTransaction/QueryStock.jsx";
import DCGRNQuery from "./StoreMaster/DCGRN/DcgrnLsit/DCGRNQuery.jsx";
import QueryDCgrn from "./StoreMaster/DCGRN/DcgrnLsit/QueryDCgrn.jsx";
import PurchaseGRNQuery from "./StoreMaster/PurchseGRN/GRNList/PurchaseGRNQuery.jsx";
import QueryPurchase from "./StoreMaster/PurchseGRN/GRNList/QueryPurchase.jsx";
import ReportQuery from "./StoreMaster/Report/ReportQuery.jsx";
import QueryRep from "./StoreMaster/Report/QueryRep.jsx";
import MRNList from "./StoreMaster/Report/MRNList/MRNList.jsx";
import MRNQuery from "./StoreMaster/Report/MRNList/MRNQuery.jsx";
import QueryMrn from "./StoreMaster/Report/MRNList/QueryMrn.jsx";
import Challaninward from "./StoreMaster/Report/Challan/Challaninward.jsx";
import ChallanQuery from "./StoreMaster/Report/Challan/ChallanQuery.jsx";
import QueryChall from "./StoreMaster/Report/Challan/QueryChall.jsx";
import IssueMaterial from "./StoreMaster/Report/Material/IssueMaterial.jsx";
import MaterialQuery from "./StoreMaster/Report/Material/MaterialQuery.jsx";
import QueryMtrlIssue from "./StoreMaster/Report/Material/QueryMtrlIssue.jsx";
import GeneralMtrlIssue from "./StoreMaster/Report/GeneralMtrl/GeneralMtrlIssue.jsx";
import GeneralQuery from "./StoreMaster/Report/GeneralMtrl/GeneralQuery.jsx";
import QueryGnrl from "./StoreMaster/Report/GeneralMtrl/QueryGnrl.jsx";
import DeliveryChlln from "./StoreMaster/Report/DeliveryChallan/DeliveryChlln.jsx";
import DeliveryQuery from "./StoreMaster/Report/DeliveryChallan/DeliveryQuery.jsx";
import QueryDlvrchln from "./StoreMaster/Report/DeliveryChallan/QueryDlvrchln.jsx";
import GRNDCReport from "./StoreMaster/Report/GRNDCReport/GRNDCReport.jsx";
import DCQuery from "./StoreMaster/Report/GRNDCReport/DCQuery.jsx";
import QueryDC from "./StoreMaster/Report/GRNDCReport/QueryDC.jsx";
import IndentReport from "./StoreMaster/Report/IndentReport/IndentReport.jsx";
import IndentQuery from "./StoreMaster/Report/IndentReport/IndentQuery.jsx";
import QueryIndt from "./StoreMaster/Report/IndentReport/QueryIndt.jsx";
import IndentStatus from "./StoreMaster/Report/IndentStatus/IndentStatus.jsx";
import WIPStock from "./StoreMaster/StockReport/WIPStockReport/WIPStock.jsx";
import RMStock from "./StoreMaster/StockReport/RMStockReport/RMStock.jsx";
import ConsumableStock from "./StoreMaster/StockReport/ConsumableStockReport/ConsumableStock.jsx";
import FGStock from "./StoreMaster/StockReport/FGStockReport/FGStock.jsx";




////////////////////////////// Production /////////////////////////////////

import WorkOrderEntry from "./ProductionMaster/WorkOrderEntry/WorkOrderEntry.jsx";
import WorkOrderList from "./ProductionMaster/WorkOrderList/WorkOrderList.jsx";
import ProductionEntryAss from "./ProductionMaster/ProductionEntryAss/ProductionEntryAss.jsx";
import ProductionPlanList from "./ProductionMaster/ProductionPlanList/ProductionPlanList.jsx";
import ProductionEntry from "./ProductionMaster/ProductionEntry/ProductionEntry.jsx";
import ProductionReport from "./ProductionMaster/ProductionReport/ProductionReport.jsx";
import ReworkProduction from "./ProductionMaster/ReworkProduction/ReworkProduction.jsx";
import ReworkProductionEntry from "./ProductionMaster/ReworkProduction/ReworkProductionEntry/ReworkProductionEntry.jsx";
import ReworkProductionReport from "./ProductionMaster/ReworkProduction/ReworkProductionReport/ReworkProductionReport.jsx";
import ScrapRejection from "./ProductionMaster/ScrapRejection/ScrapRejection.jsx";
import ScrapRejectionReport from "./ProductionMaster/ScrapRejection/ScrapRejectionReport/ScrapRejectionReport.jsx";
import ScrapRejectionEntry from "./ProductionMaster/ScrapRejection/ScrapRejectionEntry/ScrapRejectionEntry.jsx";
import FGScrapRejectionReport from "./ProductionMaster/ScrapRejection/FGScrapRejectionReport/FGScrapRejectionReport.jsx";
import MachineIdleTime from "./ProductionMaster/MachineIdleTime/MachineIdleTime.jsx";
import NewIdleMaster from "./ProductionMaster/MachineIdleTime/NewIdleMaster/NewIdleMaster.jsx";
import BreakdownTimeEntry from "./ProductionMaster/BreakdownTimeEntry/BreakdownTimeEntry.jsx";
import BreakdownTimeReport from "./ProductionMaster/BreakdownTimeReport/BreakdownTimeReport.jsx";
import ContractorReport from "./ProductionMaster/ContractorReport/ContractorReport.jsx";
import ContractirList from "./ProductionMaster/ContractorReport/ContractorList/ContractirList.jsx";
import OperatorReport from "./ProductionMaster/Report/OperatorReport/OperatorReport.jsx";
import ProReport from "./ProductionMaster/Report/ProReport.jsx";
import JobworkList from "./PurchaseMaster/NewJobworkPurchase/JobworkList/JobworkList.jsx";
import CycleTime1 from "./ProductionMaster/Report/CycleTime/CycleTime.jsx";
import BreakdownAnalysis from "./ProductionMaster/Report/BreakdownAnalysis/BreakdownAnalysis.jsx";
import ReworkReport from "./ProductionMaster/Report/ReworkReport/ReworkReport.jsx";
import ProductionEntryList from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionEntryList.jsx";
import MachineDefaultidle from "./ProductionMaster/Report/MachineDefaultIdle/MachineDefaultIdle.jsx"

import MaterialIssueReport from "./ProductionMaster/WorkOrderList/WordOrderReport/MaterialIssueReport.jsx";
import WorkOrderSummaryReport from "./ProductionMaster/WorkOrderList/WordOrderReport/WorkOrderSummaryReport.jsx";
import QueryWorkOrder from "./ProductionMaster/WorkOrderList/WorkOrderListQuery/QueryWorkOrder.jsx";
import QueryMasterWO from "./ProductionMaster/WorkOrderList/WorkOrderListQuery/QueryMasterWO.jsx";
import PlanListWOStatus from "./ProductionMaster/ProductionPlanList/PlanListWOStatus.jsx";
import QueryProdPlanList from "./ProductionMaster/ProductionPlanList/PlanListQuery/QueryProdPlanList.jsx";
import QueryMasterPL from "./ProductionMaster/ProductionPlanList/PlanListQuery/QueryMasterPL.jsx";
import DailyProductionReport from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionReport/DailyProductionReport.jsx";
import MonthlyProductionReport from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionReport/MonthlyProductionReport.jsx";
import ConsumptionReport from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionReport/ConsumptionReport.jsx";
import ProductionSummaryReport from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionReport/ProductionSummaryReport.jsx";
import ToolConsumptionReport from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionReport/ToolConsumptionReport.jsx";
import QueryProdEL from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionQuery/QueryProdEL.jsx";
import QueryMasterProdEL from "./ProductionMaster/ProductionEntry/ProductionEntryList/ProductionQuery/QueryMasterProdEL.jsx";
import QueryScrap from "./ProductionMaster/ScrapRejection/ScrapRejectionReport/ScrapRejQuery/QueryScrap.jsx";
import QueryMasterScrap from "./ProductionMaster/ScrapRejection/ScrapRejectionReport/ScrapRejQuery/QueryMasterScrap.jsx";
import RejectionReport from "./ProductionMaster/ScrapRejection/ScrapRejectionReport/RejectionReport.jsx";
import ItemWiseCR from "./ProductionMaster/ContractorReport/ContractorList/ItemWIseCR.jsx";
import OperationRejectionSummary from "./ProductionMaster/Report/OperationRejectionSummary.jsx";
import QueryReportPro from "./ProductionMaster/Report/QueryReportPro.jsx";
import MachineDefaultBook from "./ProductionMaster/Report/MachineDefaultIdle/MachineDefaultBook.jsx";


///////////////////////////////////////// Quality ////////////////////////////////////////////////

import QualityPlan from "./Quality/QualityPlan/QualityPlan.jsx";
import PandingQCList from "./Quality/Purchase/PandingQCList/PandingQCList.jsx";
import InwardTestCertificate from "./Quality/Purchase/InwardTestCertificate/InwardTestCertificate.jsx";
import PaddingQCInward from "./Quality/SubconJobwork/PaddingQCInward/PaddingQCInward.jsx";
import InwardQCList from "./Quality/SubconJobwork/InwardQCList/InwardQCList.jsx";
import InprocessInspection from "./Quality/InprocessQC/InprocessInspection/InprocessInspection.jsx";
import InprocessInspectionList from "./Quality/InprocessQC/InprocessInspectionList/InprocessInspectionList.jsx";
import PaddingSalesQC from "./Quality/SalesReturnQC/PaddingSalesQC/PaddingSalesQC.jsx";
import SalesQCList from "./Quality/SalesReturnQC/SalesQCList/SalesQCList.jsx";
import HeatCodeRegister from "./Quality/HeatCodeRegister/HeatCodeRegister.jsx";
import TestCertificateList from "./Quality/TestCertificateList/TestCertificateList.jsx";
import PDIList from "./Quality/PDIList/PDIList.jsx";
import PenddingInvoiceListPDI from "./Quality/PDIList/PenddingInvoiceListPDI.jsx";
import NewListPDI from "./Quality/PDIList/NewListPDI.jsx";
import FirstPieceApporval from "./Quality/FirstPieceApporval/FirstPieceApporval.jsx";
import SetUpApproval from "./Quality/FirstPieceApporval/SetUpApproval.jsx";
import NewSetupApproval from "./Quality/NewSetupApproval/NewSetupApproval.jsx";
import SetupList from "./Quality/NewSetupApproval/SetupList/SetupList.jsx";
import HotInspectionList from "./Quality/HotInspectionList/HotInspectionList.jsx";
import NewHotInspection from "./Quality/HotInspectionList/NewHotInspection/NewHotInspection.jsx";
import SamplingPlan from "./Quality/SamplingPlan/SamplingPlan.jsx";
import CustomerComplaintEntry from "./Quality/CustomerComplaint/CustomerComplaintEntry/CustomerComplaintEntry.jsx";
import CustomerComplaintList from "./Quality/CustomerComplaint/CustomerComplaintList/CustomerComplaintList.jsx";
import CustomerComplaintAuth from "./Quality/CustomerComplaint/CustomerComplaintAuth/CustomerComplaintAuth.jsx";
import TestReportList from "./Quality/TestMaster/TestReportList/TestReportList.jsx";
import TestReportNew from "./Quality/TestMaster/TestReportList/TestReportNew.jsx";
import TestMasterNew from "./Quality/TestMaster/TestMasterNew/TestMasterNew.jsx";
import TestMasterList from "./Quality/TestMaster/TestMasterList/TestMasterList.jsx";



/////////////////////////////////////     Sales       ////////////////////////////////////

import GSTsales1 from "./Sales/EInvoicing/GSTsales/GSTsales1.jsx";
import JobWorkSales from "./Sales/EInvoicing/JobWorkSales/JobWorkSales.jsx";
import DebitNote from "./Sales/EInvoicing/DebitNote/DebitNote.jsx";
import CreditNote from "./Sales/EInvoicing/CreditNote/CreditNote.jsx";
import NewSalesOrder from "./Sales/CustomerSalesOrder/NewSalesOrder.jsx";
import OrderLiast from "./Sales/CustomerSalesOrder/OrderLiast/OrderLiast.jsx";
import SalesOrderAmendList from "./Sales/CustomerSalesOrderAmendment/SalesOrderAmendList/SalesOrderAmendList.jsx";
import CustPOAmend from "./Sales/CustomerSalesOrderAmendment/SalesOrderAmendList/SOAmendment/CustPOAmend.jsx";
import SalesOrderItemAdd from "./Sales/CustomerSalesOrderAmendment/SalesOrderAmendList/SalesOrderItemAdd/SalesOrderItemAdd.jsx";
import SacheduleSalesNew from "./Sales/SacheduleSalesNew/SacheduleSalesNew.jsx";
import SalesOrderStatus from "./Sales/SalesOrderStatus/SalesOrderStatus.jsx";
import NewInvoice from "./Sales/GSTInvoice/NewInvoice.jsx";
import NewinvoiceGST from "./Sales/GSTInvoice/NewinvoiceGST/NewinvoiceGST.jsx";
import GSTJobworkInvoice from "./Sales/GSTJobwork/GSTJobworkInvoice/GSTJobworkInvoice.jsx";
import DChallan from "./Sales/GSTJobwork/DC/DChallan.jsx";
import GSTJobworkDCreturn from "./Sales/GSTJobwork/GSTJobworkDCreturn/GSTJobworkDCreturn.jsx";
import OutwardChallan from "./Sales/OutwardChallan/OutwardChallan.jsx";
import PurchaseDabitNote from "./Sales/CraditDabitNote/PurchaseDabitNote/PurchaseDabitNote.jsx";
import DabitNoteList from "./Sales/CraditDabitNote/PurchaseDabitNote/DabitNoteList/DabitNoteList.jsx";
import DN574Fout from "./Sales/CraditDabitNote/PurchaseDabitNote/DN574Fout/DN574Fout.jsx";
import NewDabitNote from "./Sales/CraditDabitNote/SalesDabitNote/NewDabitNote.jsx";
import JobWorkRateDiff from "./Sales/CraditDabitNote/JobWorkRateDiffDebitNote/JobWorkRateDiff.jsx";
import CreditNotie from "./Sales/CraditDabitNote/CreditNotie/CreditNotie.jsx";
import Creditnoteto from "./Sales/CraditDabitNote/CreditNotie/Creditnoteto/Creditnoteto.jsx";
import CreditNoteList from "./Sales/CraditDabitNote/CreditNotie/CreditNoteList/CreditNoteList.jsx";
import GSTSalesReturn from "./Sales/GSTSalesReturn/GSTSalesReturn.jsx";
import GSTSalesReturnList from "./Sales/GSTSalesReturn/GSTSalesReturnList/GSTSalesReturnList.jsx";
import MaterialGatepassNew from "./Sales/MaterialGatepass/MaterialGatepassNew/MaterialGatepassNew.jsx";
import PendingMaterialGatepassList from "./Sales/MaterialGatepass/PendingMaterialGatepassList/PendingMaterialGatepassList.jsx";
import MaterialGatepassList from "./Sales/MaterialGatepass/MaterialGatepassList/MaterialGatepassList.jsx";
import CustSalesOrderList from "./Sales/Reports/CustSalesOrderList/CustSalesOrderList.jsx";
import TaxInvoiceList from "./Sales/Reports/TaxInvoiceList/TaxInvoiceList.jsx";
import BajajTaxInvoiceList from "./Sales/Reports/BajajTaxInvoiceList/BajajTaxInvoiceList.jsx";
import JobworkInvList from "./Sales/Reports/JobworkInvList/JobworkInvList.jsx";
import JobworkDCList from "./Sales/Reports/JobworkDCList/JobworkDCList.jsx";
import OutwardChallanList from "./Sales/Reports/OutwardChallanList/OutwardChallanList.jsx";
import DebitNoteList from "./Sales/Reports/DebitNoteList/DebitNoteList.jsx";
import CreditListNote from "./Sales/Reports/CreditNoteList/CreditListNote.jsx";
import RG1Register from "./Sales/Reports/RG1Register/RG1Register.jsx";
import TransportList from "./Sales/Reports/TransportList/TransportList.jsx";

import ViewStockList from "./Sales/CustomerSalesOrder/OrderLiast/ViewStockList.jsx";
import UserSubList from "./Sales/CustomerSalesOrder/OrderLiast/UserSubList.jsx";

import SalesOrderItemAddTwo from "./Sales/CustomerSalesOrderAmendment/SalesOrderAmendList/SalesOrderItemAdd/SalesOrderItemAddTwo.jsx";
import QueryDebit from "./Sales/CraditDabitNote/PurchaseDabitNote/DabitNoteList/QueryDebit.jsx";
import QueryMasterDebit from "./Sales/CraditDabitNote/PurchaseDabitNote/DabitNoteList/QueryMasterDebit.jsx";
import QueryCreditList from "./Sales/CraditDabitNote/CreditNotie/CreditNoteList/QueryCreditList.jsx";
import QueryMasterCrebitList from "./Sales/CraditDabitNote/CreditNotie/CreditNoteList/QueryMasterCrebitList.jsx";
import QueryMasterGSTSales from "./Sales/GSTSalesReturn/QueryGST/QueryMasterGSTSales.jsx";
import QueryGSTSales from "./Sales/GSTSalesReturn/QueryGST/QueryGSTSales.jsx";
import QuerySales from "./Sales/Reports/CustSalesOrderList/QuerySalesOrder/QuerySales.jsx";
import QueryMasterSales from "./Sales/Reports/CustSalesOrderList/QuerySalesOrder/QueryMasterSales.jsx";
import InvoiceEmailSend from "./Sales/Reports/TaxInvoiceList/QueryTexx/InvoiceEmailSend.jsx"
import VendarFile from "./Sales/Reports/TaxInvoiceList/QueryTexx/VendarFile.jsx"
import InvoiceTransporterReport from "./Sales/Reports/TaxInvoiceList/QueryTexx/InvoiceTransporterReport.jsx"
import SalesPurchaseFile from "./Sales/Reports/TaxInvoiceList/QueryTexx/SalesPurchaseFile.jsx"
import QuerySalesTax from "./Sales/Reports/TaxInvoiceList/QueryTexx/QuerySalesTax.jsx"
import QueryMasterSalesTax from "./Sales/Reports/TaxInvoiceList/QueryTexx/QueryMasterSalesTax.jsx"
import ColumnSetup from "./Sales/Reports/TaxInvoiceList/QueryTexx/ColumnSetup.jsx"
import VendorFileBajaj from "./Sales/Reports/BajajTaxInvoiceList/VendorFileBajaj.jsx";
import JobWorkSalesRegister from "./Sales/Reports/JobworkInvList/JobworkInvReport/JobWorkSalesRegister.jsx";
import QueryJobwork from "./Sales/Reports/JobworkInvList/QueryJobwork/QueryJobwork.jsx";
import QueryMasterJobwork from "./Sales/Reports/JobworkInvList/QueryJobwork/QueryMasterJobwork.jsx";
import QueryOutwardClln from "./Sales/Reports/OutwardChallanList/QueryOutward/QueryOutwardClln.jsx";
import QueryMasterOutwardClln from "./Sales/Reports/OutwardChallanList/QueryOutward/QueryMasterOutwardClln.jsx";
import NewTransportEntry from "./Sales/Reports/TransportList/Transport/NewTransportEntry.jsx";
import TransportReport from "./Sales/Reports/TransportList/Transport/TransportReport.jsx";


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<VendorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />


        {/* /////////////////////////////////// Master ////////////////////////////////////// */}

        <Route path="/masterState" element={<MasterState />} />
        <Route path="/masterCustomer" element={<MasterCustomers />} />
        <Route path="/CustomerState" element={<CustomerState />} />
        <Route path="/item-master" element={<ItemMaster />} />
        <Route path="/add-new-item" element={<AddNewItem />} />
        <Route path="/item-master-gernal" element={<ItemMasterGernal />} />
        {/* <Route path="/item-master-query" element={<ItemMasterQuery />} />  */}
        <Route path="/Work-center-master" element={<WorkCenterMaster />} />
        <Route path="/business-partner" element={<BusinessPartner />} />
        <Route path="/Customer-Item-Wise" element={<CustomerItemWise />} />
        <Route path="/Customer-Supplier-Item-Link" element={<CustomerSupplierLink />} />
        <Route path="/Item-Cross-Reference" element={<ItemCrossReference />} />
        <Route path="/gst-rate-master" element={<GstMaster />} />
        <Route path="/Customer-Item-Wise-Gst" element={<CustomerItemGst />} />
        <Route path="/task-master" element={<TaskMaster />} />
        <Route path="/Cut-wise" element={<Cutwise />} />
        <Route path="/Supplier-Customer-Master" element={<SupplierCustomerMaster />} />
        <Route path="/vender-list" element={<VenderListSupplier />} />
        <Route path="/bom-routing" element={<BomRouting />} />
        <Route path="/bill-material" element={<BillMaterial />} />
        <Route path="/operator-supervisor-master" element={<OperatorSupervisor />} />
        <Route path="/Supervisor" element={<Supervisor />} />
        <Route path="/Department-Head" element={<DepartmentHead />} />
        <Route path="/contractor-master" element={<ContractorMaster />} />
        <Route path="/Addcontractor-master" element={<AddContractorMAster />} />
        <Route path="/shift-master" element={<ShiftMaster />} />
        <Route path="/unit-conversion" element={<UnitConversion />} />
        <Route path="/price-list-master" element={<PriceListMaster />} />
        <Route path="/price-entry-master" element={<PriceEntry />} />
        <Route path="/cycle-time-master" element={<CycleTime />} />
        <Route path="/add-cycle-time" element={<AddCycleTime />} />
        <Route path="/commodity-master" element={<CommodityMaster />} />
        <Route path="/cost-center-master" element={<CostCenterMaster />} />
        <Route path="/work-center-schedule" element={<WorkCenterSchedule />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/project-inventory-status" element={<ProjectInventory />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/master-report" element={<MasterReport />} />

        <Route path="/item-master-query" element={<ItemMasterQuery />} />
        <Route path="/QueryPages" element={<QueryPages />} />
        <Route path="/CustomerQuery" element={<CustomerQuery />} />
        <Route path="/BOMQuery" element={<BOMQuery />} />
        <Route path="/PriceListQuery" element={<PriceListQuery />} />
        <Route path="/PriceListQueryMaster" element={<PriceListQueryMaster />} />
        <Route path="/CustomerQueryMaster" element={<CustomerQueryMaster />} />
        <Route path="/BOMMasterQuery" element={<BOMMasterQuery />} />
        <Route path="/UploadWIPvalue" element={<UploadWIPvalue />} />
        <Route path="/UploadOperationSpeci" element={<UploadOperationSpeci />} />


        {/* ///////////////////////////////////Erp Setting////////////////////////////////////// */}

        <Route path="UserConfiguration" element={<UserConfiguration />} />
        <Route path="/" element={<Navigate replace to="/UserConfiguration" />} />
        <Route path="ErpSetting" element={<ErpSetting />} />
        <Route path="DisableUserList" element={<DisableUserList />} />
        <Route path="UserPermission" element={<UserPermission />} />
        <Route path="/User-Permit" element={<UserPermit />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="login-history" element={<LoginHistory />} />
        <Route path="delete-management" element={<DeleteMangement />} />
        <Route path="dashboard-backup" element={<DashboardBackup />} />
        <Route path="delete-record" element={<DeleteRecord />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/view-stack" element={<ViewStock />} />
        <Route path="/user-List" element={<USerList />} />
        <Route path="/Item-delete" element={<ItemDelete />} />
        <Route path="/delete-report" element={<DeleteReport />} />
        <Route path="/DashboardPermission" element={<DashboardPermission />} />
        <Route path="/BackDated" element={<BackDated />} />
        <Route path="/User-Wise-Series" element={<UserWiseSeries />} />
        <Route path="/UserwiseProduction" element={<UserwiseProduction />} />
        <Route path="/USerwiseAuth" element={<USerwiseAuth />} />
        <Route path="/User-plant" element={<Userplant />} />
        <Route path="/Plantwiseseries" element={<Plantwiseseries />} />
        <Route path="/AlertSetting" element={<AlertSetting />} />
        <Route path="/Userwisepermission" element={<Userwisepermission />} />
        <Route path="/Companysetup" element={<Companysetup />} />
        <Route path="/WebconfigFile" element={<ErpWebConfig />} />{" "}
        <Route path="/ErpFinancialYear" element={<ErpFinancialYear />} />{" "}
        <Route path="/FinancialMonth" element={<FinancialMonth />} />{" "}
        <Route path="/ScheduleMonth" element={<ScheduleMonth />} />{" "}
        <Route path="/Weekoff" element={<Weekoff />} />{" "}
        <Route path="/Settingerp" element={<Settingerp />} />{" "}
        <Route path="/Docseriesgroup" element={<Docseriesgroup />} />{" "}
        <Route path="/DocprintFormat" element={<DocprintFormat />} />{" "}
        <Route path="/Docnoeditable" element={<Docnoeditable />} />{" "}
        <Route path="/Qcisoformat" element={<Qcisoformat />} />{" "}
        <Route path="/Roundofsetting" element={<Roundofsetting />} />{" "}
        <Route path="/Customersupplier" element={<Customersupplier />} />{" "}
        <Route path="/Itemmastersetup" element={<Itemmastersetup />} />{" "}
        <Route path="/Emailsms" element={<Emailsms />} />{" "}
        <Route path="/Emailsetup" element={<Emailsetup />} />
        <Route path="/AddQuater" element={<AddQuater />} />
        <Route path="/WeekMaster" element={<WeekMaster />} />
        <Route path="/MasterData" element={<MasterData />} />
        <Route path="/PurchaseErp" element={<PurchaseErp />} />
        <Route path="/PurchaseERPGRN" element={<PurchaseERPGRN />} />
        <Route path="/OutwardInward" element={<OutwardInward />} />
        <Route path="/Companysetup" element={<Companysetup />} />
        <Route path="/WebconfigFile" element={<ErpWebConfig />} />{" "}
        <Route path="/ErpFinancialYear" element={<ErpFinancialYear />} />{" "}
        <Route path="/Document-start" element={<DocumentStart />} />{" "}
        <Route path="/FinancialMonth" element={<FinancialMonth />} />{" "}
        <Route path="/ScheduleMonth" element={<ScheduleMonth />} />{" "}
        <Route path="/Weekoff" element={<Weekoff />} />{" "}
        <Route path="/Settingerp" element={<Settingerp />} />{" "}
        <Route path="/Docseriesgroup" element={<Docseriesgroup />} />{" "}
        <Route path="/DocprintFormat" element={<DocprintFormat />} />{" "}
        <Route path="/Docnoeditable" element={<Docnoeditable />} />{" "}
        <Route path="/Qcisoformat" element={<Qcisoformat />} />{" "}
        <Route path="/Roundofsetting" element={<Roundofsetting />} />{" "}
        <Route path="/Customersupplier" element={<Customersupplier />} />{" "}
        <Route path="/Itemmastersetup" element={<Itemmastersetup />} />{" "}
        <Route path="/Emailsms" element={<Emailsms />} />{" "}
        <Route path="/Emailsetup" element={<Emailsetup />} />
        <Route path="/Emailtemplate" element={<Emailtemplate />} />
        <Route path="/Quotation" element={<Quotation />} />
        <Route path="/DebitcreditNote" element={<DebitcreditNote />} />
        <Route path="/DocAccount" element={<DocAccount />} />
        <Route path="/Docddelivery" element={<Docddelivery />} />
        <Route path="/DocProduction" element={<DocProduction />} />
        <Route path="/GSTsales" element={<GSTsales />} />
        <Route path="/GstsalesReturn" element={<GstsalesReturn />} />
        <Route path="/DocCompanySetting" element={<DocCompanySetting />} />
        <Route path="/ViewItemMaster" element={<ViewItemMaster />} />

        <Route path="/SettingHistory" element={<SettingHistory />} />
        <Route path="/DefaultSettingsModal" element={<DefaultSettingsModal />} />


        {/* ////////////////////////////////Purchase///////////////////////////// */}

        <Route path="/new-indent" element={<Newindent />} />
        <Route path="/new-purchase-order" element={<NewPurchaseOrder />} />
        <Route path="/new-jobwork-order" element={<NewJobworkPurchase />} />
        <Route path="/pendingpo" element={<PendingPo />} />
        <Route path="/pendingindent" element={<PendingIndent />} />
        <Route path="/Purchse-Mrn" element={<PurchaseMrn />} />
        <Route path="/Purchse-order-status" element={<PurchseOrderStatus />} />
        <Route path="/Rfo" element={<Rfo />} />
        <Route path="/Quoto-Comparison-Statement" element={<QuotoComparisonStatement />} />
        <Route path="/Quoto-Comparison-Pending" element={<QuotoComparisonPending />} />
        <Route path="purchase-order-list" element={<PurchseOderList />} />
        <Route path="jobwork-purchase-order-list" element={<JobWorkPurchseOrderList />} />
        <Route path="supplier-wise-list" element={<SupplierWiseList />} />
        <Route path="purchase-report" element={<PurchaseReport />} />
        <Route path="/EditPo/:id" element={<POEdit />} />
        <Route path="/POpdf/:id" element={<PurchaseOrderPDF />} />

        <Route path="/ListIndent" element={<ListIndent />} />
        <Route path="/IndentStutasReport" element={<IndentStutasReport />} />
        <Route path="/RecentlyPoApprovalList" element={<RecentlyPoApprovalList />} />
        <Route path="/AMCPurchaseOrderList" element={<AMCPurchaseOrderList />} />
        <Route path="/PurchaseQuerySummary" element={<PurchaseQuerySummary />} />
        <Route path="/PurchaseQuery" element={<PurchaseQuery />} />
        <Route path="/RFONew" element={<RFONew />} />
        <Route path="/QuoteStatementList" element={<QuoteStatementList />} />
        <Route path="/JobworkPOSummary" element={<JobworkPOSummary />} />
        <Route path="/JobworkQuery" element={<JobworkQuery />} />

        <Route path="/Importfile" element={<Importfile />} />
        <Route path="/ImportPO" element={<ImportPO />} />
        <Route path="/ImportPOList" element={<ImportPOList />} />
        <Route path="/POConsignment" element={<POConsignment />} />
        <Route path="/POConsignmentList" element={<POConsignmentList />} />
        <Route path="/ImportGRN" element={<ImportGRN />} />
        <Route path="/ImportGRNList" element={<ImportGRNList />} />



        {/* ///////////////////////////////////////Store//////////////////////////////////////// */}

        <Route path="Gate-Inward-Entry" element={<GateInwardEntry />} />
        <Route path="New-Gate-Entry" element={<NewGateInward />} />
        <Route path="Pending-Asn-List" element={<PendingAsnList />} />
        <Route path="PDL-List" element={<PDL />} />
        <Route path="Vendor-Bill-List" element={<VendorBillList />} />
        <Route path="Vendor-Asn-List" element={<VendorASN />} />
        <Route path="ASN-Report" element={<ASNReport />} />
        <Route path="New-Mrn" element={<NewMrn />} />
        <Route path="Tool-MRN" element={<ToolMrn />} />
        <Route path="Purchase-Grn" element={<PurchaseGrn />} />
        <Route path="Grn-List" element={<GrnList />} />
        <Route path="Inward-challan" element={<InwardChallan1 />} />
        <Route path="Jobwork-Inward-Challan" element={<JobworkInwardChallan />} />
        <Route path="Vendor-Scrap-Inward" element={<VendorScrapInward />} />
        <Route path="Subcon-Grn" element={<SubconGrn />} />
        <Route path="Material-Issue-Challan" element={<MaterialIssueChallan />} />
        <Route path="Work-Order-Material" element={<WorkOrderMaterial />} />
        <Route path="Material-Issue" element={<MaterialIssue />} />
        <Route path="Work-Issue-Report" element={<WorkIssueRepost />} />
        <Route path="Material-Issue-Gernal" element={<MaterialIssueGernal />} />
        <Route path="Delivery-Challan" element={<DeliveryChallan />} />
        <Route path="Dcgrn" element={<Dcgrn />} />
        <Route path="Dcgrnlist" element={<Dcgrnlist />} />
        <Route path="Store-New-indent" element={<StoreNewindent />} />
        <Route path="IndentList" element={<IndentList />} />
        <Route path="Stock-Transaction" element={<StockTransaction />} />
        <Route path="Opening-Stock" element={<OpeningStock />} />
        <Route path="RM-Stock-Transaction" element={<RMStockTransaction />} />
        <Route path="FG-Movement" element={<FGMovement />} />
        <Route path="AddNewFGMovent" element={<AddNewFGMovent />} />
        <Route path="FGToFGStock" element={<FGToFGStock />} />
        <Route path="FGTOFGMovement" element={<FGTOFGMovement />} />
        <Route path="ScrapMovement" element={<ScrapMovement />} />
        <Route path="ScrapToFg" element={<ScrapToFg />} />
        <Route path="RMToTransaction" element={<RMToTransaction />} />
        <Route path="RMTOtherGroup" element={<RMTOtherGroup />} />
        <Route path="ShopFloor" element={<ShopFloor />} />
        <Route path="ShopFloorStock" element={<ShopFloorStock />} />
        <Route path="Report-Store" element={<ReportStore />} />
        <Route path="Stock-Report" element={<StockReport />} />
        {/* Inward Challan List */}
        <Route path="Inward-challan-list" element={<InwardChallanList />} />

        <Route path="GEIQuery" element={<GEIQuery />} />
        <Route path="QueryGate" element={<QueryGate />} />
        <Route path="InwardChallanQuery" element={<InwardChallanQuery />} />
        <Route path="QueryInward" element={<QueryInward />} />
        <Route path="StockTransferQuery" element={<StockTransferQuery />} />
        <Route path="QueryStock" element={<QueryStock />} />
        <Route path="DCGRNQuery" element={<DCGRNQuery />} />
        <Route path="QueryDCgrn" element={<QueryDCgrn />} />
        <Route path="PurchaseGRNQuery" element={<PurchaseGRNQuery />} />
        <Route path="QueryPurchase" element={<QueryPurchase />} />
        
        <Route path="ReportQuery" element={<ReportQuery />} />
        <Route path="QueryRep" element={<QueryRep />} />
        <Route path="MRNList" element={<MRNList />} />
        <Route path="MRNQuery" element={<MRNQuery />} />
        <Route path="QueryMrn" element={<QueryMrn />} />
        <Route path="Challaninward" element={<Challaninward />} />
        <Route path="ChallanQuery" element={<ChallanQuery />} />
        <Route path="QueryChall" element={<QueryChall />} />
        <Route path="IssueMaterial" element={<IssueMaterial />} />
        <Route path="MaterialQuery" element={<MaterialQuery />} />
        <Route path="QueryMtrlIssue" element={<QueryMtrlIssue />} />
        <Route path="GeneralMtrlIssue" element={<GeneralMtrlIssue />} />
        <Route path="GeneralQuery" element={<GeneralQuery />} />
        <Route path="QueryGnrl" element={<QueryGnrl />} />
        <Route path="DeliveryChlln" element={<DeliveryChlln />} />
        <Route path="DeliveryQuery" element={<DeliveryQuery />} />
        <Route path="QueryDlvrchln" element={<QueryDlvrchln />} />
        <Route path="GRNDCReport" element={<GRNDCReport />} />
        <Route path="DCQuery" element={<DCQuery />} />
        <Route path="QueryDC" element={<QueryDC />} />
        <Route path="IndentReport" element={<IndentReport />} />
        <Route path="IndentQuery" element={<IndentQuery />} />
        <Route path="QueryIndt" element={<QueryIndt />} />
        <Route path="IndentStatus" element={<IndentStatus />} />
        <Route path="WIPStock" element={<WIPStock />} />
        <Route path="RMStock" element={<RMStock />} />
        <Route path="ConsumableStock" element={<ConsumableStock />} />
        <Route path="FGStock" element={<FGStock />} />




        {/* /////////////////////////////////////Production////////////////////////////////////// */}

        <Route path="/WorkOrderEntry" element={<WorkOrderEntry />} />
        <Route path="/WorkOrderList" element={<WorkOrderList />} />
        <Route path="/ProductionEntry" element={<ProductionEntry />} />
        <Route path="/ProductionEntryAss" element={<ProductionEntryAss />} />
        <Route path="/ProductionPlanList" element={<ProductionPlanList />} />
        <Route path="/ProductionReport" element={<ProductionReport />} />
        <Route path="/MachineIdleTime" element={<MachineIdleTime />} />
        <Route path="/NewIdleMaster" element={<NewIdleMaster />} />
        <Route path="/ReworkProduction" element={<ReworkProduction />} />
        <Route path="/ReworkProductionEntry" element={<ReworkProductionEntry />} />
        <Route path="/ReworkProductionReport" element={<ReworkProductionReport />} />
        <Route path="/ScrapRejection" element={<ScrapRejection />} />
        <Route path="/ScrapRejectionReport" element={<ScrapRejectionReport />} />
        <Route path="/ScrapRejectionEntry" element={<ScrapRejectionEntry />} />
        <Route path="/FGScrapRejectionReport" element={<FGScrapRejectionReport />} />
        <Route path="/PoList" element={<PoList />} />
        <Route path="/JobworkList" element={<JobworkList />} />
        <Route path="/BreakdownTimeEntry" element={<BreakdownTimeEntry />} />
        <Route path="/BreakdownTimeReport" element={<BreakdownTimeReport />} />
        <Route path="/ContractorReport" element={<ContractorReport />} />
        <Route path="/ContractirList" element={<ContractirList />} />
        <Route path="/ProReport" element={<ProReport />} />
        <Route path="/OperatorReport" element={<OperatorReport />} />
        <Route path="/CycleTime1" element={<CycleTime1 />} />
        <Route path="/ReworkReport" element={<ReworkReport />} />
        <Route path="/BreakdownAnalysis" element={<BreakdownAnalysis />} />
        <Route path="/MachineDefaultidle" element={<MachineDefaultidle />} />
        <Route path="/ProductionEntryList" element={<ProductionEntryList />} />

        <Route path="/MaterialIssueReport" element={<MaterialIssueReport />} />
        <Route path="/WorkOrderSummaryReport" element={<WorkOrderSummaryReport />} />
        <Route path="/QueryWorkOrder" element={<QueryWorkOrder />} />
        <Route path="/QueryMasterWO" element={<QueryMasterWO />} />
        <Route path="/PlanListWOStatus" element={<PlanListWOStatus />} />
        <Route path="/QueryProdPlanList" element={<QueryProdPlanList />} />
        <Route path="/QueryMasterPL" element={<QueryMasterPL />} />
        <Route path="/DailyProductionReport" element={<DailyProductionReport />} />
        <Route path="/MonthlyProductionReport" element={<MonthlyProductionReport />} />
        <Route path="/ConsumptionReport" element={<ConsumptionReport />} />
        <Route path="/ProductionSummaryReport" element={<ProductionSummaryReport />} />
        <Route path="/ToolConsumptionReport" element={<ToolConsumptionReport />} />
        <Route path="/QueryProdEL" element={<QueryProdEL />} />
        <Route path="/QueryMasterProdEL" element={<QueryMasterProdEL />} />
        <Route path="/QueryScrap" element={<QueryScrap />} />
        <Route path="/QueryMasterScrap" element={<QueryMasterScrap />} />
        <Route path="/RejectionReport" element={<RejectionReport />} />
        <Route path="/ItemWiseCR" element={<ItemWiseCR />} />
        <Route path="/OperationRejectionSummary" element={<OperationRejectionSummary />} />
        <Route path="/QueryReportPro" element={<QueryReportPro />} />
        <Route path="/MachineDefaultBook" element={<MachineDefaultBook />} />





        {/* //////////////////////////////////  Quality Plan ///////////////////////////////////// */}

        <Route path="QualityPlan" element={<QualityPlan />} />
        <Route path="PandingQCList" element={<PandingQCList />} />
        <Route path="InwardTestCertificate" element={<InwardTestCertificate />} />
        <Route path="PaddingQCInward" element={<PaddingQCInward />} />
        <Route path="InwardQCList" element={<InwardQCList />} />
        <Route path="InprocessInspection" element={<InprocessInspection />} />
        <Route path="InprocessInspectionList" element={<InprocessInspectionList />} />
        <Route path="PaddingSalesQC" element={<PaddingSalesQC />} />
        <Route path="SalesQCList" element={<SalesQCList />} />
        <Route path="HeatCodeRegister" element={<HeatCodeRegister />} />
        <Route path="TestCertificateList" element={<TestCertificateList />} />
        <Route path="PDIList" element={<PDIList />} />
        <Route path="PenddingInvoiceListPDI" element={<PenddingInvoiceListPDI />} />
        <Route path="NewListPDI" element={<NewListPDI />} />
        <Route path="FirstPieceApporval" element={<FirstPieceApporval />} />
        <Route path="SetUpApproval" element={<SetUpApproval />} />
        <Route path="NewSetupApproval" element={<NewSetupApproval />} />
        <Route path="SetupList" element={<SetupList />} />
        <Route path="HotInspectionList" element={<HotInspectionList />} />
        <Route path="NewHotInspection" element={<NewHotInspection />} />
        <Route path="SamplingPlan" element={<SamplingPlan />} />
        <Route path="CustomerComplaintEntry" element={<CustomerComplaintEntry />} />
        <Route path="CustomerComplaintList" element={<CustomerComplaintList />} />
        <Route path="CustomerComplaintAuth" element={<CustomerComplaintAuth />} />
        <Route path="TestReportList" element={<TestReportList />} />
        <Route path="TestReportNew" element={<TestReportNew />} />
        <Route path="TestMasterNew" element={<TestMasterNew />} />
        <Route path="TestMasterList" element={<TestMasterList />} />



        {/* //////////////////////////////     Sales       /////////////////////////// */}

        <Route path="GSTsales1" element={<GSTsales1 />} />
        <Route path="JobWorkSales" element={<JobWorkSales />} />
        <Route path="DebitNote" element={<DebitNote />} />
        <Route path="CreditNote" element={<CreditNote />} />
        <Route path="NewSalesOrder" element={<NewSalesOrder />} />
        <Route path="OrderLiast" element={<OrderLiast />} />
        <Route path="SalesOrderAmendList" element={<SalesOrderAmendList />} />
        <Route path="CustPOAmend" element={<CustPOAmend />} />
        <Route path="SalesOrderItemAdd" element={<SalesOrderItemAdd />} />
        <Route path="SacheduleSalesNew" element={<SacheduleSalesNew />} />
        <Route path="SalesOrderStatus" element={<SalesOrderStatus />} />
        <Route path="NewInvoice" element={<NewInvoice />} />
        <Route path="NewinvoiceGST" element={<NewinvoiceGST />} />
        <Route path="GSTJobworkInvoice" element={<GSTJobworkInvoice />} />
        <Route path="DChallan" element={<DChallan />} />
        <Route path="GSTJobworkDCreturn" element={<GSTJobworkDCreturn />} />
        <Route path="OutwardChallan" element={<OutwardChallan />} />
        <Route path="PurchaseDabitNote" element={<PurchaseDabitNote />} />
        <Route path="DabitNoteList" element={<DabitNoteList />} />
        <Route path="NewDabitNote" element={<NewDabitNote />} />
        <Route path="DN574Fout" element={<DN574Fout />} />
        <Route path="JobWorkRateDiff" element={<JobWorkRateDiff />} />
        <Route path="CreditNotie" element={<CreditNotie />} />
        <Route path="Creditnoteto" element={<Creditnoteto />} />
        <Route path="CreditNoteList" element={<CreditNoteList />} />
        <Route path="GSTSalesReturn1" element={<GSTSalesReturn />} />
        <Route path="GSTSalesReturnList" element={<GSTSalesReturnList />} />
        <Route path="MaterialGatepassNew" element={<MaterialGatepassNew />} />
        <Route path="PendingMaterialGatepassList" element={<PendingMaterialGatepassList />} />
        <Route path="MaterialGatepassList" element={<MaterialGatepassList />} />
        <Route path="CustSalesOrderList" element={<CustSalesOrderList />} />
        <Route path="TaxInvoiceList" element={<TaxInvoiceList />} />
        <Route path="BajajTaxInvoiceList" element={<BajajTaxInvoiceList />} />
        <Route path="JobworkInvList" element={<JobworkInvList />} />
        <Route path="JobworkDCList" element={<JobworkDCList />} />
        <Route path="OutwardChallanList" element={<OutwardChallanList />} />
        <Route path="DebitNoteList" element={<DebitNoteList />} />
        <Route path="CreditListNote" element={<CreditListNote />} />
        <Route path="RG1Register" element={<RG1Register />} />
        <Route path="TransportList" element={<TransportList />} />
        
        <Route path="ViewStockList" element={<ViewStockList />} />
        <Route path="UserSubList" element={<UserSubList />} />

        <Route path="SalesOrderItemAddTwo" element={<SalesOrderItemAddTwo />} />
        <Route path="QueryDebit" element={<QueryDebit />} />
        <Route path="QueryMasterDebit" element={<QueryMasterDebit />} />
        <Route path="QueryCreditList" element={<QueryCreditList />} />
        <Route path="QueryMasterCrebitList" element={<QueryMasterCrebitList />} />
        <Route path="QueryGSTSales" element={<QueryGSTSales />} />
        <Route path="QueryMasterGSTSales" element={<QueryMasterGSTSales />} />
        <Route path="QuerySales" element={<QuerySales />} />
        <Route path="QueryMasterSales" element={<QueryMasterSales />} />

        <Route path="InvoiceEmailSend" element={<InvoiceEmailSend />} />
        <Route path="VendarFile" element={<VendarFile />} />
        <Route path="InvoiceTransporterReport" element={<InvoiceTransporterReport />} />
        <Route path="SalesPurchaseFile" element={<SalesPurchaseFile />} />
        <Route path="QuerySalesTax" element={<QuerySalesTax />} />
        <Route path="QueryMasterSalesTax" element={<QueryMasterSalesTax />} />
        <Route path="ColumnSetup" element={<ColumnSetup />} />
        <Route path="VendorFileBajaj" element={<VendorFileBajaj />} />
        <Route path="JobWorkSalesRegister" element={<JobWorkSalesRegister />} />
        <Route path="QueryJobwork" element={<QueryJobwork/>} />
        <Route path="QueryMasterJobwork" element={<QueryMasterJobwork />} />
        <Route path="QueryOutwardClln" element={<QueryOutwardClln />} />
        <Route path="QueryMasterOutwardClln" element={<QueryMasterOutwardClln />} />
        <Route path="NewTransportEntry" element={<NewTransportEntry />} />
        <Route path="TransportReport" element={<TransportReport />} /> 


      </Routes>
    </div>
  );
}

export default App;