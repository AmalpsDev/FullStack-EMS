import { Router } from "express";
import { protect } from "../middleware/auth.js"
import { ClockInOut, getAttendence } from "../controller/attendenceController.js";

const attendenceRoutes = Router();

attendenceRoutes.post('/', protect, ClockInOut);
attendenceRoutes.get('/', protect, getAttendence);

export default attendenceRoutes;
