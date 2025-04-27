import express, { json, Router } from 'express';
import { config } from 'dotenv';
import connectDB from './config/dbconnection.js';
import agencyRoutes from './routes/agency.routes.js';
import clientRoutes from './routes/client.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

config();
connectDB();

const app = express();
app.use(json());

app.get('/', (req, res) => {
    res.status(200).send('Server is responding')
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/client', clientRoutes);

// Error Handler
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;