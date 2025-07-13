const express = require('express');
const router = express.Router();
const Cause = require('../models/Cause');
const { auth, adminAuth } = require('../middleware/auth');

// Get all causes (public)
router.get('/', async (req, res) => {
  try {
    const { category, isUrgent, limit = 10, page = 1 } = req.query;
    
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (isUrgent !== undefined) filter.isUrgent = isUrgent === 'true';
    
    const causes = await Cause.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    res.json({
      success: true,
      data: causes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await Cause.countDocuments(filter)
      }
    });
  } catch (error) {
    console.error('Error fetching causes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching causes'
    });
  }
});

// Get emergency causes (public)
router.get('/emergency', async (req, res) => {
  try {
    const emergencyCauses = await Cause.find({
      isActive: true,
      $or: [
        { category: 'Emergency' },
        { isUrgent: true }
      ]
    })
    .sort({ isUrgent: -1, createdAt: -1 })
    .limit(10);
    
    res.json({
      success: true,
      data: emergencyCauses
    });
  } catch (error) {
    console.error('Error fetching emergency causes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching emergency causes'
    });
  }
});

// Get single cause (public)
router.get('/:id', async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }
    
    res.json({
      success: true,
      data: cause
    });
  } catch (error) {
    console.error('Error fetching cause:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cause'
    });
  }
});

// Create new cause (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const causeData = { ...req.body, createdBy: req.user._id };
    
    const cause = new Cause(causeData);
    await cause.save();
    
    res.status(201).json({
      success: true,
      data: cause,
      message: 'Cause created successfully'
    });
  } catch (error) {
    console.error('Error creating cause:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating cause',
      error: error.message
    });
  }
});

// Update cause (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const cause = await Cause.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }
    
    res.json({
      success: true,
      data: cause,
      message: 'Cause updated successfully'
    });
  } catch (error) {
    console.error('Error updating cause:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating cause',
      error: error.message
    });
  }
});

// Delete cause (soft delete, admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const cause = await Cause.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!cause) {
      return res.status(404).json({
        success: false,
        message: 'Cause not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Cause deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting cause:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting cause'
    });
  }
});

module.exports = router;
