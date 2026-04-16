import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, message } = req.body;
    
    if (!jobId || !name || !email) {
      return res.status(400).json({ message: 'Please provide job ID, name, and email' });
    }

    // Verify job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const application = new Application({
      jobId,
      name,
      email,
      message
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
};
