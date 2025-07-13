const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Cause = require('../models/Cause');

// Get platform statistics
router.get('/', async (req, res) => {
  try {
    // Get total raised amount
    const totalRaisedResult = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalRaised = totalRaisedResult.length > 0 ? totalRaisedResult[0].total : 0;
    
    // Get total causes supported
    const causesSupported = await Cause.countDocuments({ isActive: true });
    
    // Get unique donor count
    const uniqueDonorsResult = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: '$donorEmail' } },
      { $count: 'uniqueDonors' }
    ]);
    
    const donors = uniqueDonorsResult.length > 0 ? uniqueDonorsResult[0].uniqueDonors : 0;
    
    // Static value for states reached (can be made dynamic based on cause locations)
    const statesReached = 18;
    
    // Additional stats
    const totalDonations = await Donation.countDocuments({ paymentStatus: 'completed' });
    const averageDonation = totalDonations > 0 ? Math.round(totalRaised / totalDonations) : 0;
    
    // Emergency cases count
    const emergencyCases = await Cause.countDocuments({
      isActive: true,
      $or: [{ category: 'Emergency' }, { isUrgent: true }]
    });
    
    // Success rate (causes that reached their target)
    const successfulCauses = await Cause.countDocuments({
      isActive: true,
      $expr: { $gte: ['$raisedAmount', '$targetAmount'] }
    });
    
    const successRate = causesSupported > 0 ? Math.round((successfulCauses / causesSupported) * 100) : 0;
    
    res.json({
      success: true,
      data: {
        totalRaised,
        causesSupported,
        donors,
        statesReached,
        totalDonations,
        averageDonation,
        emergencyCases,
        successfulCauses,
        successRate
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// Get monthly donation trends
router.get('/trends', async (req, res) => {
  try {
    const trends = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalAmount: { $sum: '$amount' },
          donationCount: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      },
      { $limit: 12 }
    ]);
    
    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching trends'
    });
  }
});

// Get category-wise donation distribution
router.get('/categories', async (req, res) => {
  try {
    const categoryStats = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $lookup: {
          from: 'causes',
          localField: 'causeId',
          foreignField: '_id',
          as: 'cause'
        }
      },
      { $unwind: '$cause' },
      {
        $group: {
          _id: '$cause.category',
          totalAmount: { $sum: '$amount' },
          donationCount: { $sum: 1 },
          causesCount: { $addToSet: '$causeId' }
        }
      },
      {
        $project: {
          category: '$_id',
          totalAmount: 1,
          donationCount: 1,
          causesCount: { $size: '$causesCount' }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: categoryStats
    });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category statistics'
    });
  }
});

module.exports = router;
