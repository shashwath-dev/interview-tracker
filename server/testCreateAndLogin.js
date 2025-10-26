// file: testCreateAndLogin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const MONGO_URI = process.env.MONGO_URI; // add your MongoDB connection string in .env

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const username = 'MsgUser';       // change as needed
    const plainPassword = 'MSG@1234'; // change as needed

    // Delete old user if exists
    await User.deleteOne({ username });

    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create user
    const user = await User.create({ username, password: hashedPassword });
    console.log('User created:', user);

    // Attempt login
    const fetchedUser = await User.findOne({ username });
    if (!fetchedUser) throw new Error('User not found');

    const isMatch = await bcrypt.compare(plainPassword, fetchedUser.password);
    console.log('Password match:', isMatch ? '✅ Login successful' : '❌ Login failed');
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    mongoose.connection.close();
  }
}

main();
