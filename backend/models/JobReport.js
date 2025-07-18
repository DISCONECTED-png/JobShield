import mongoose from 'mongoose';

const jobReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  company: { type: String },
  description: { type: String, required: true },
  link: { type: String },
  scamScore: { type: Number, default: 0 },
  scamReasons: [String],
  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      vote: { type: Number, enum: [1, -1] }
    }
  ],  
}, { timestamps: true });

const JobReport = mongoose.model('JobReport', jobReportSchema);
export default JobReport;
