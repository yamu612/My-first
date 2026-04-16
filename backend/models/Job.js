import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
