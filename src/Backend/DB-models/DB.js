const mongoose = require("mongoose");

// Set up MongoDB connection
mongoose.connect("MONGODB URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

module.exports = mongoose;