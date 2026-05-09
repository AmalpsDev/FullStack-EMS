import Employee from "../models/Employee";



/*Get profile information 
    method - GET
    endpoint - /api/profile
*/

export const getProfile = async(req, res) => {
    try {
        const session = req.session; // ← Retrieved from auth middleware
        const employee = await Employee.findOne({ userId: session.userId });

        if (!employee) {
            return res.json({
                firstName : "Admin",
                lastName : "",
                email : session.email,
            })
        }
        return res.json(employee);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch profile" });
    }
}

/*Update profile information
    method - PUT
    endpoint - /api/profile
*/

export const updateProfile = async (req, res) =>{
    try {
        const session = req.session; // ← Retrieved from auth middleware
        const employee = await Employee.findOne({ userId: session.userId });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        if(employee.isDeleted) {
            return res.status(404).json({ success: false, message: "Your profile is deactivated. you cannot update your profile" });
        }
        await Employee.findOneAndUpdate({ userId: session.userId }, {
            bio : req.body.bio
        });
        return res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, message: "Failed to update profile" });
    }
}