import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

export const addJob = async (req, res) => {
  try {
    const { title, budget, category } = req.body;
    
    if (!title || !budget || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = new Job({
      title,
      budget,
      category
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};