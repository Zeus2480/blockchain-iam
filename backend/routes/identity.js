const express = require('express');
const router = express.Router();
const identityRegistration = require('../index').identityRegistration;

// Register a new identity
router.post('/register', async (req, res) => {
    const { name, dateOfBirth } = req.body;
    try {
        // Call the registerIdentity function and wait for the transaction to complete
        const tx = await identityRegistration.registerIdentity(name, dateOfBirth);
        const receipt = await tx.wait();

        // Capture the IdentityRegistered event from the transaction receipt
        const event = receipt.events.find(event => event.event === "IdentityRegistered");
        const patientAddress = event.args.patientAddress;

        // Return the patientAddress in the response
        res.status(200).json({ message: 'Identity registered successfully', patientAddress });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify an identity
router.post('/verify', async (req, res) => {
    const { patientAddress } = req.body;
    try {
        // Call the updateIdentityVerificationStatus function and wait for the transaction to complete
        const tx = await identityRegistration.updateIdentityVerificationStatus(patientAddress, true);
        await tx.wait();

        res.status(200).json({ message: 'Identity verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get identity details by address
router.get('/:address', async (req, res) => {
    const { address } = req.params;
    try {
        // Retrieve the identity details from the smart contract
        const identity = await identityRegistration.identities(address);

        // Format the response with relevant identity details
        res.status(200).json({
            patientAddress: identity.patientAddress,
            name: identity.name,
            dateOfBirth: identity.dateOfBirth,
            isVerified: identity.isVerified
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
