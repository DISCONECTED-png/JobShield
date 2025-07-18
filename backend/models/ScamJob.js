import mongoose from 'mongoose';

const ScamJobSchema = new mongoose.Schema({
  title: String,
  company: String,
  score: Number,
  source: String,
  tags: [String],
  description: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ScamJob = mongoose.model('ScamJob', ScamJobSchema);
export default ScamJob;

