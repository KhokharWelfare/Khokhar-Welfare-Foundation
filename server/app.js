const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donation');
const adminRoutes = require('./routes/admin');
const transactionRoutes = require('./routes/transaction');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({ origin: 'https://khokhar-welfarefoundation.vercel.app', credentials: true })); // Allow frontend origin
app.use(express.json()); // Parse JSON request bodies

mongoose.set('strictQuery', true);
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Define APIs
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api/donation', donationRoutes); // Donation routes (add, view)
app.use('/api/transaction', transactionRoutes); // Transaction routes (track fund usage)
app.use('/api/admin', adminRoutes); // Admin routes (manage donations, users)

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send('Family Welfare Website Running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
