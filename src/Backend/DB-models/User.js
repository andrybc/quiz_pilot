const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
// Define the user schema
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: false,
    
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  membership: {
    type: String,
    required: false
  },
  maxNumSet: {
    type: String,
    required: false
  },

});

if(userSchema.membership== "free"){
  maxNumSet = 3;
}

userSchema.methods.checkPassword = function(password) {
  return (password === this.password);
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // Use bcrypt.compare to compare entered password with hashed password
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    console.log("does not match");
  }
};

// Define a pre-save hook to assign a unique userID value
userSchema.pre("save", function (next) {
  // If userID is not set, generate a unique value for it
  if (!this.userID) {
    // Example of generating a unique value (e.g., using a timestamp)
    this.userID = new Date().getTime().toString();
  }
  next();
});

// Create and export the User model based on the user schema
module.exports = mongoose.model("Users", userSchema);