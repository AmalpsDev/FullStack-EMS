import Attendence from "../models/Attendence.js";
import Employee from "../models/Employee.js";

/* clock in/out, for employee attendance tracking 
    methods : post
    endpoint : /api/attendence
*/
export const ClockInOut = async (req, res) => {
    try {   
        const session = req.session;
        const employee = await Employee.findOne({userId : session.userId})
        if(!employee) return  res.status(404).json({error: "Employee not found"});
        if(employee?.isDeleted) return res.status(403).json({
            error: "Your account is deactivated. You cannot clock in/out"
        })
        const today = new Date();
        today.setHours(0,0,0,0)
        const existing =await Attendence.findOne({
            employeeId : employee._id,
            date : today
        })

        const now = new Date();

        if(!existing){
            // Mark as late if checking in after 9:00 AM
            const isLate = now.getHours() >= 9;
            const attendence = await Attendence.create({
                employeeId: employee._id,
                date : today,
                checkIn : now,
                status : isLate ? "LATE" : "PRESENT"
            });

            return res.json({ success: true, type: "CHECK IN" , data : attendence})
        }else if(!existing.checkOut){
            const checkInTime = new Date (existing.checkIn).getTime();
            const checkOutTime = now.getTime();
            
            // Calculate working hours
            const workingHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
            
            // Determine Day Type based on hours
            let dayType = "Half Day";
            if (workingHours >= 8) dayType = "Full Day";
            else if (workingHours >= 6) dayType = "Three Quarter Day";
            else if (workingHours >= 4) dayType = "half Day";
            else dayType = "Short day"

            existing.workingHours = workingHours;
            existing.dayType = dayType;
            
            await existing.save();

            return res.json({ success: true, type: "CHECK OUT", data: existing });
        } else {
            return res.json({ success: true, type: "CHECK_OUT" , date: existing});
        }
    } catch (error) {
        console.error("Attendance Error:", error);
        return res.status(500).json({ error: "Internal server error during clock in/out" });
    }
}

/* Get attence for employee, 
    methods : get
    endpoint : /api/attendence
*/
export const getAttendence = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId })
        if (!employee) return res.status(404).json({ error: "Employee not found" });
        if (employee?.isDeleted) return res.status(403).json({
            error: "Your account is deactivated. You cannot clock in/out"
        })
        const limit = parseInt(req.query.limit || 30);
        const history = await Attendence.find({
            employeeId: employee._id
        }).sort({ date: -1 }).limit(limit);

        return res.json({
            data: history,
            employee: { isDeleted: employee.isDeleted }
        })

    } catch (error) {
        return res.status(500).json({ error: "Failed to get attendence" });
    }
}