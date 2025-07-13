const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Cause = require('../models/Cause');

// Create new donation
router.post('/', async (req, res) => {
  try {
    const donationData = req.body;
    
    // Verify cause exists
    const cause = await Cause.findById(donationData.causeId);
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }
    
    // Create donation
    const donation = new Donation({
      ...donationData,
      paymentStatus: 'completed', // For demo purposes, setting as completed
      transactionId: `TXN_${Date.now()}`,
      ipAddress: req.ip
    });
    
    await donation.save();
    
    // The post-save hook will automatically update the cause statistics
    
    res.status(201).json({
      success: true,
      data: donation,
      message: 'Donation created successfully'
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating donation',
      error: error.message
    });
  }
});

// Get donations by cause
router.get('/cause/:causeId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const donations = await Donation.find({
      causeId: req.params.causeId,
      paymentStatus: 'completed'
    })
    .select('-donorEmail -donorPhone -ipAddress') // Hide sensitive info
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));
    
    // Hide donor name if anonymous
    const sanitizedDonations = donations.map(donation => {
      if (donation.isAnonymous) {
        donation.donorName = 'Anonymous';
      }
      return donation;
    });
    
    res.json({
      success: true,
      data: sanitizedDonations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await Donation.countDocuments({
          causeId: req.params.causeId,
          paymentStatus: 'completed'
        })
      }
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations'
    });
  }
});

// Get recent donations (for homepage/stats)
router.get('/recent', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const donations = await Donation.find({
      paymentStatus: 'completed'
    })
    .populate('causeId', 'title category')
    .select('-donorEmail -donorPhone -ipAddress')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));
    
    // Hide donor name if anonymous
    const sanitizedDonations = donations.map(donation => {
      if (donation.isAnonymous) {
        donation.donorName = 'Anonymous';
      }
      return donation;
    });
    
    res.json({
      success: true,
      data: sanitizedDonations
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent donations'
    });
  }
});

// Get donation by ID
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('causeId', 'title category targetAmount');
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    res.json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation'
    });
  }
});

module.exports = router;
