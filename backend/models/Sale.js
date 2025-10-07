import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  product: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    enum: {
      values: ['North', 'South', 'East', 'West', 'Central'],
      message: 'Region must be North, South, East, West, or Central'
    }
  },
  salesperson: {
    type: String,
    required: [true, 'Salesperson name is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
saleSchema.index({ date: -1 });
saleSchema.index({ region: 1 });

export default mongoose.model('Sale', saleSchema);