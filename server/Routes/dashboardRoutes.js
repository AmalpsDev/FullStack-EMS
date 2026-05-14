import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { getDashboard } from "../controller/dashboardController.js";


const dashBoardRouter = Router();

dashBoardRouter.get("/", protect, protectAdmin, getDashboard);

export default dashBoardRouter;