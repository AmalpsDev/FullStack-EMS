import express from 'express';
import cors from 'cors';
import "dotenv/config";
import multer from 'multer';
import connectDB from './config/db.js'
import authRouter from './Routes/authRoutes.js';
import employeeRouter from './Routes/EmployeeRoutes.js';
import profileRouter from './Routes/profileRoutes.js';
import attendenceRoutes from './Routes/attendenceRoutes.js';
import leaveRouter from './Routes/leaveRoutes.js';
import payslipRouter from './Routes/payslipRoutes.js';
import dashBoardRouter from './Routes/dashboardRoutes.js';
import { serve } from "inngest/express";
import { inngest, functions } from "../server/inngest/index.js";

const app  = express();
const PORT = process.env.PORT || 4000;

/** Middleware */
app.use(cors());
app.use(express.json());
app.use(multer().none()); // For parsing multipart/form-data


/** Routes */
app.get('/', (req, res) => {
 res.send('Welcome to the server!');
});
app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/profile', profileRouter);
app.use('/api/attendence', attendenceRoutes);
app.use('/api/leave', leaveRouter);
app.use('/api/payslips',payslipRouter);
app.use('/api/dashboard',dashBoardRouter);

app.use("/api/inngest", serve({ client: inngest, functions }));

/** Start Server */
(async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    console.error('Failed to start server - database connection failed');
    process.exit(1);
  }
})();

