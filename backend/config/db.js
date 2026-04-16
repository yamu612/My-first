import mongoose from 'mongoose';
import dns from 'dns';

// ── DNS Fix ─────────────────────────────────────────────────────────────────
// Some ISPs/corporate networks block TXT record lookups.
// mongodb+srv:// needs TXT records to auto-discover connection options.
// Forcing Node.js to use Google DNS (8.8.8.8) fixes "queryTxt EREFUSED".
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in backend/.env file');
    }

    // Log masked URI so you can confirm the right URI is loaded
    const maskedURI = mongoURI.replace(/:([^@\/?]+)@/, ':****@');
    console.log(`🔗 Connecting to MongoDB: ${maskedURI}`);

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // Fail fast if Atlas unreachable (10 s)
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);

    if (
      error.message.includes('EREFUSED') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ServerSelectionError') ||
      error.message.includes('ETIMEDOUT')
    ) {
      console.error('👉 Check 1: MongoDB Atlas → Network Access → Add 0.0.0.0/0');
      console.error('👉 Check 2: Make sure username/password in MONGO_URI are correct');
    }

    process.exit(1);
  }
};

// Connection-state listeners for easier debugging
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

export default connectDB;
