const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  causeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cause',
    required: true
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  donorEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  donorPhone: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  message: {
    type: String,
    default: '',
    maxlength: 500
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'upi', 'netbanking', 'wallet']
  },
  paymentId: {
    type: String,
    default: ''
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    default: ''
  },
  receiptUrl: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
donationSchema.index({ causeId: 1, createdAt: -1 });
donationSchema.index({ donorEmail: 1 });
donationSchema.index({ paymentStatus: 1 });
donationSchema.index({ createdAt: -1 });

// Update cause statistics after successful donation
donationSchema.post('save', async function(doc, next) {
  // Check if the document is new or if paymentStatus was modified to 'completed'
  const isCompleted = this.isNew 
    ? this.paymentStatus === 'completed' 
    : this.isModified('paymentStatus') && this.paymentStatus === 'completed';

  if (isCompleted) {
    try {
      const Cause = mongoose.model('Cause');
      await Cause.findByIdAndUpdate(
        this.causeId,
        {
          $inc: {
            raisedAmount: this.amount,
            donorCount: 1
          }
        }
      );
    } catch (error) {
      console.error('Error updating cause stats after donation:', error);
      // Decide how to handle this error. Maybe log it.
    }
  }
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
