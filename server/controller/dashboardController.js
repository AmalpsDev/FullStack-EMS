/*Get dashboard for employee and admin */
/* Get api/dashboard */

import { DEPARTMENTS } from "../constants/departments.js";
import Attendence from "../models/Attendence.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/Paysllip.js";

export const getDashboard = async (req, res) => {
    try {
        const session = req.session;
        if(session.role === "ADMIN"){
            const  [totalEmployees, totalAttendence, pendingLeaves] = await 
            Promise.all([
                Employee.countDocuments({ isDeleted: { $ne: true } }),
                Attendence.countDocuments({
                    date : {
                        $gte :new Date(new Date().setHours(0,0,0,0)),
                        $lt  : new Date(new Date().setHours(24,0,0,0)),
                    }
                }),
                LeaveApplication.countDocuments({status : "PENDING"})
            ])

            return res.json({
                role: "ADMIN",
                totalEmployees,
                totalDepartments : DEPARTMENTS.length,
                totalAttendence,
                pendingLeaves
            })
        }else{
            const employee = await Employee.findOne({
                userId : session.userId
            }).lean();

            if(!employee) return res.status(400).json({ error: "Employee Not Found"});

            const today = new Date();
            const [currentMonthAttendence, pendingLeaves, latestPaySlip] = await Promise.all([
                Attendence.countDocuments({
                    employeeId : employee._id,
                    date : {
                        $gte: new Date(today.getFullYear(), today.getMonth(), 1),
                        $lt: new Date(today.getFullYear(), today.getMonth() + 1 , 1),
                    }
                }),
                LeaveApplication.countDocuments({
                    employeeId: employee._id,
                    status: "PENDING",
                }),
                Payslip.findOne({ employeeId: employee._id}).sort({
                    createdAt: -1
                }).lean()
            ])

            return res.json({
                role : "EMPLOYEE",
                employee: {...employee,
                    id: employee._id.toString(),
                },
                currentMonthAttendence,
                pendingLeaves,
                latestPaySlip : latestPaySlip ? {...latestPaySlip, id:
                latestPaySlip._id.toString()} : null
            })

                
        }
    } catch (error) {
        console.error("Dashboard error" , error)
        return res.status(500).json({error : "Failed"})
    }
}