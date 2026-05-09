import { Router } from "express";
import { CreateEmployee, DeleteEmployee, getEmployees, UpdateEmployee } from "../controller/employeeController.js";
import { protect, protectAdmin } from "../middleware/auth.js";


const employeeRouter = Router();

employeeRouter.get("/", protect, protectAdmin, getEmployees);
employeeRouter.post("/", protect, protectAdmin, CreateEmployee);
employeeRouter.put("/:id", protect, protectAdmin, UpdateEmployee);
employeeRouter.delete("/:id", protect, protectAdmin, DeleteEmployee);

export default employeeRouter;