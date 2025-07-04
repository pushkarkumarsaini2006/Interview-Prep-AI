// Script to update all profileImageUrl fields in MongoDB to use https instead of http
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
  profileImageUrl: String
}, { strict: false });

const User = mongoose.model('User', userSchema, 'users');

async function updateProfileImageUrls() {
  await mongoose.connect(MONGO_URI);
  const result = await User.updateMany(
    { profileImageUrl: { $regex: /^http:\/\// } },
    [
      { $set: { profileImageUrl: { $replaceOne: { input: "$profileImageUrl", find: "http://", replacement: "https://" } } } }
    ]
  );
  console.log(`Updated ${result.modifiedCount} user(s).`);
  await mongoose.disconnect();
}

updateProfileImageUrls().catch(console.error);
