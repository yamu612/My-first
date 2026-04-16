import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
