const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Cause = require('../models/Cause');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Initiate a new donation (requires authentication)
router.post('/initiate', auth, async (req, res) => {
  try {
    const { causeId, amount, message, isAnonymous, paymentMethod } = req.body;
    
    // Validate cause
    const cause = await Cause.findById(causeId);
    if (!cause || !cause.isActive) {
      return res.status(404).json({ success: false, message: 'Active cause not found' });
    }
    
    // Create a pending donation
    const donation = new Donation({
      causeId,
      donorId: req.user._id,
      donorName: isAnonymous ? 'Anonymous' : req.user.name,
      donorEmail: req.user.email,
      donorPhone: req.user.phone,
      amount,
      message,
      isAnonymous,
      paymentMethod,
      paymentStatus: 'pending',
      transactionId: `TXN_PENDING_${Date.now()}`,
      ipAddress: req.ip,
    });
    
    await donation.save();
    
    // In a real app, you'd now redirect to a payment gateway
    // Here, we just return the pending donation details
    res.status(201).json({
      success: true,
      data: donation,
      message: 'Donation initiated successfully. Awaiting payment confirmation.',
    });
  } catch (error) {
    console.error('Error initiating donation:', error);
    res.status(400).json({ success: false, message: 'Error initiating donation', error: error.message });
  }
});

// Verify a donation (simulates payment gateway callback)
router.post('/verify/:donationId', auth, async (req, res) => {
  try {
    const { donationId } = req.params;
    
    const donation = await Donation.findById(donationId);
    
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    
    // Ensure the user verifying is the one who created it
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to verify this donation.' });
    }
    
    if (donation.paymentStatus === 'completed') {
      return res.status(400).json({ success: false, message: 'This donation has already been completed.' });
    }
    
    // Update donation status to 'completed'
    donation.paymentStatus = 'completed';
    donation.transactionId = `TXN_COMPLETED_${Date.now()}`;
    await donation.save(); // This will trigger the post-save hook to update Cause stats
    
    // Update user's donation history
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalDonated: donation.amount },
      $push: { donationHistory: donation._id },
    });
    
    res.json({
      success: true,
      data: donation,
      message: 'Thank you! Your donation has been successfully processed.',
    });
  } catch (error) {
    console.error('Error verifying donation:', error);
    res.status(500).json({ success: false, message: 'Error verifying donation', error: error.message });
  }
});


// Get donations by cause (public)
router.get('/cause/:causeId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const donations = await Donation.find({
      causeId: req.params.causeId,
      paymentStatus: 'completed'
    })
    .select('-donorEmail -donorPhone -ipAddress')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));
    
    res.json({
      success: true,
      data: donations,
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

// Get recent donations (public)
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
    
    res.json({
      success: true,
      data: donations
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent donations'
    });
  }
});

module.exports = router;
