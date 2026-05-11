import { Router } from "express";
import { protect } from "../middleware/auth"
import { ClockInOut, getAttendence } from "../controller/attendenceController";

const attendenceRoutes = Router();

attendenceRoutes.post('/', protect, ClockInOut);
attendenceRoutes.get('/', protect, getAttendence);

export default attendenceRoutes;
