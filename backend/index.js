require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Debugging: Check if environment variables are loaded
console.log("GANACHE_URL:", process.env.GANACHE_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);

const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Import Contract ABIs
const accessControlABI = require('../artifacts/contracts/AccessControl.sol/AccessControl.json').abi;
const identityRegistrationABI = require('../artifacts/contracts/IdentityRegistration.sol/IdentityRegistration.json').abi;
const identityVerificationABI = require('../artifacts/contracts/IdentityVerification.sol/IdentityVerification.json').abi;

const accessControl = new ethers.Contract(process.env.CONTRACT_ADDRESS_ACCESS_CONTROL, accessControlABI, wallet);
const identityRegistration = new ethers.Contract(process.env.CONTRACT_ADDRESS_IDENTITY_REGISTRATION, identityRegistrationABI, wallet);
const identityVerification = new ethers.Contract(process.env.CONTRACT_ADDRESS_IDENTITY_VERIFICATION, identityVerificationABI, wallet);

// Export contract instances
module.exports = {
    accessControl,
    identityRegistration,
    identityVerification
};

// Set up routes
const accessControlRoutes = require('./routes/accessControl');
const identityRoutes = require('./routes/identity');
app.use('/accessControl', accessControlRoutes);
app.use('/identity', identityRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
