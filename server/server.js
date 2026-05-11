import express from 'express';
import cors from 'cors';
import "dotenv/config";
import multer from 'multer';
import connectDB from './config/db.js'
import authRouter from './Routes/authRoutes.js';
import employeeRouter from './Routes/EmployeeRoutes.js';
import profileRouter from './Routes/profileRoutes.js';

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

