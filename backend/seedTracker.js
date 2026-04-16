import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job.js';
import connectDB from './config/db.js';

dotenv.config();

const jobsToSeed = [
  {
    title: 'Full Stack MERN Developer',
    budget: '₹50000',
    category: 'Development'
  },
  {
    title: 'Senior Frontend React Engineer',
    budget: '₹85000',
    category: 'Development'
  },
  {
    title: 'Creative UI/UX Designer',
    budget: '₹25000',
    category: 'Design'
  },
  {
    title: 'Brand Identity Logo Designer',
    budget: '₹15000',
    category: 'Design'
  },
  {
    title: 'SEO Content Writer',
    budget: '₹8000',
    category: 'Writing'
  },
  {
    title: 'Technical Documentation Expert',
    budget: '₹12000',
    category: 'Writing'
  }
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing old jobs...');
    // Only delete jobs since applications are linked to them? Better to just insert new ones if none exist.
    // For safety of testing, we will just insert them without deleting old ones to avoid destroying user data if they tested.
    await Job.insertMany(jobsToSeed);
    console.log('Successfully seeded jobs!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
