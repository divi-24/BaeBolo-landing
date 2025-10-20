import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
  },
  position: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-increment position
WaitlistSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.models.Waitlist.countDocuments();
    this.position = count + 1;
  }
  next();
});

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
