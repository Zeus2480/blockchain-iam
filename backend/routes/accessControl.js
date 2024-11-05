const express = require('express');
const router = express.Router();
const accessControl = require('../index').accessControl;

// Grant access
router.post('/grant', async (req, res) => {
    const { patientAddress } = req.body;
    try {
        const tx = await accessControl.grantAccess(patientAddress);
        await tx.wait();
        res.status(200).json({ message: 'Access granted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Revoke access
router.post('/revoke', async (req, res) => {
    const { patientAddress } = req.body;
    try {
        const tx = await accessControl.revokeAccess(patientAddress);
        await tx.wait();
        res.status(200).json({ message: 'Access revoked successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Check access
router.get('/hasAccess/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const hasAccess = await accessControl.hasAccess(address);
        res.status(200).json({ hasAccess });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
