import { Inngest } from "inngest";
import Attendence from "../models/Attendence.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "fullstack-ems" });

// Auto check-out for employee
const autoCheckOut = inngest.createFunction(
    { id: "auto-check-out" },
    { event: "employee/check-out" },
    async ({ event, step }) => {
        const { employeeId, attendenceId } = event.data;

        /*Wait for 9 hours */
        await step.sleepUntil("wait-for-9-hours", new Date(new Date().getTime() + 9 * 60 * 60 * 1000))
        /*Get attendence data */
        let attendence = await Attendence.findById(attendenceId);

        if (!attendence?.checkOut) {
            /**Get employee data */
            const employee = await Employee.findById(employeeId);

            /**Send Email reminder */

            /** After 10 hours, mark attendence as check out with status "LATE"  */
            await step.sleepUntil("wait-for-the-1-hour", new Date(new Date().getTime() + 1 * 60 * 60 * 1000))

            attendence = await Attendence.findById(attendenceId)
            if (!attendence?.checkOut) {
                attendence.checkOut = new Date(attendence.checkIn).getTime() + 4 * 60 * 60 * 1000;
                attendence.workingHours = 4;
                attendence.dayType = "Half Day";
                attendence.status = "LATE";
                await attendence.save();
            }
        }
    },
);

/**Send Email to admin ,If admin doesn't take action on leave application within 24 hours */
const leaveApplicationReminder = inngest.createFunction(
    { id: "leave-application-reminder" },
    { event: "leave/pending" },
    async ({ event, step }) => {
        const { leaveApplicationId } = event.data;

        /**Wait for 24 hours */
        await step.sleepUntil("wait-for=the-24-hours", new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
        const leaveApplication = await LeaveApplication.findById(leaveApplicationId);

        if (leaveApplication?.status === "PENDING") {
            const employee = await Employee.findById(leaveApplication?.employeeId);

            /**Send reminder email to admin to take action on leave application */
        }
    },
);

/**Cron : Check attendence at 11:30 AM  IST (06:00 UTC) and email absent employees  */

const attendenceReminderCron = inngest.createFunction(
    { id: "attendence-reminder-cron" },
    { cron: "0 0 6 * * *" },/** 06:00 UTC = 11.30 AM IST*/
    async ({ step }) => {
        const today = await step.run("get-today-date", () => {

            /**step 1 : Get today's date range */
            const startUTC = new Date(new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkate" }) + "T00:00:00 + 05:30");
            const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
            return {
                startUTC: startUTC.toISOString(),
                endUTC: endUTC.toISOString()
            }

        })

        /**step 2 : Get all active, non-deleted employees */
        const activeEmployees = await step.run("get-active-employees", async () => {
            const employees = await Employee.find({
                isDeleted: false,
                employmentStatus: "ACTIVE"
            }).lean();

            return employees.map((e) => ({
                _id: e._id.toString(),
                firstName: e.firstName,
                lastName: e.lastName,
                email: e.email,
                department: e.department
            }));
        })

        /**step 3 : Get employee Ids on approve leave today */
        const onLeaveIds = await step.run("get-on-leave-ids", async () => {
            const leaves = await LeaveApplication.find({
                status: "APPROVED",
                startDate: { $lt: new Date(today.endUTC) },
                endData: { $gte: new Date(today.startUTC) },
            }).lean();

            return leaves.map((l) => l.employeeId.toString());
        })

        /**step 4 : Get employee Ids who already checked in today */
        const checkInIds = await step.run("get-checked-in-ids", async () => {
            const attendances = await Attendence.find({
                date: {
                    $gte: new Date(today.startUTC),
                    $lt: new Date(today.endUTC)
                }
            }).lean();

            return attendances.map((a) => a.employeeId.toString());
        })

        /**step 5 : Filter absent employees (not on leave & not checked in) */
        const absentEmployees = activeEmployees.filter((emp) =>
            !onLeaveIds.includes(emp._id) && !checkInIds.includes(emp._id)
        )

        /**send reminder emails */
        if (absentEmployees.length > 0) {
            await step.run("send-reminder-emails", async () => {
                const emailPromises = absentEmployees.map((emp) => {
                    /**Send email */
                })
            })
        }

        return {
            totalActive: activeEmployees.length,
            onLeave: onLeaveIds.length,
            checkedIn: checkInIds.length,
            absent: absentEmployees.length
        }
    },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [autoCheckOut, leaveApplicationReminder, attendenceReminderCron];