import express from "express";
import {
  fetchDepartments,
  getEmployee,
  generateVisitorPass,
  fetchPreviousPass,
  getVisitorPassDetails,
} from "../controllers/visitor/visitorPass.js";
import {
  visitorIn,
  visitorOut,
  getVisitorLogs,
} from "../controllers/visitor/visitorInOut.js";
import {
  fetchVisitors,
  sendVisitorReport,
} from "../controllers/visitor/reports.js";
import { visitors } from "../controllers/visitor/visitors.js";
import { getDashboardStats } from "../controllers/visitor/dashboard.js";
import {
  getAllVisitors,
  getVisitorDetails,
} from "../controllers/visitor/visitorHistoryController.js";

const router = express.Router();

// -----------------> Visitor Pass Routes
router.get("/departments", fetchDepartments);
router.get("/employees", getEmployee);
router.post("/generate-pass", generateVisitorPass);
router.get("/fetch-previous-pass", fetchPreviousPass);
router.get("/pass-details/:passId", getVisitorPassDetails);

// -----------------> Visitor In Out Routes
router.post("/in", visitorIn);
router.post("/out", visitorOut);
router.get("/logs", getVisitorLogs);
router.get("/reprint/:passId", getVisitorPassDetails);

// -----------------> Visitor Reports Routes
router.get("/repot", fetchVisitors);
router.post("/send-report", sendVisitorReport);
router.get("/visitors", visitors);
// -----------------> Visitor Dashboard Routes
router.get("/dashboard-stats", getDashboardStats);
// -----------------> Visitor History Routes
router.get("/history", getAllVisitors);
router.get("/details/:visitorId", getVisitorDetails);

export default router;
