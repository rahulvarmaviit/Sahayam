const mongoose = require('mongoose');

const causeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Orphanage', 'Charity', 'Education', 'Medical', 'Emergency']
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0
  },
  raisedAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  donorCount: {
    type: Number,
    default: 0,
    min: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: String,
    default: ''
  },
  beneficiaryName: {
    type: String,
    default: ''
  },
  beneficiaryAge: {
    type: Number,
    min: 0
  },
  documents: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for better query performance
causeSchema.index({ category: 1, isActive: 1 });
causeSchema.index({ isUrgent: 1, isActive: 1 });
causeSchema.index({ createdAt: -1 });

// Virtual for progress percentage
causeSchema.virtual('progressPercentage').get(function() {
  return this.targetAmount > 0 ? (this.raisedAmount / this.targetAmount) * 100 : 0;
});

// Update raised amount and donor count
causeSchema.methods.updateDonationStats = async function(donationAmount) {
  this.raisedAmount += donationAmount;
  this.donorCount += 1;
  return this.save();
};

module.exports = mongoose.model('Cause', causeSchema);
