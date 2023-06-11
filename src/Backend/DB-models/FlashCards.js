const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

// Define a schema for flashcard set
const flashcardSetSchema = new mongoose.Schema({
  flashCardID: {type: String, require: false},
  userID: { type: String, required: false }, // Field for userID tag
  title: { type: String, required: false}, // Field for flashcard set title
  cards: [{ // Field for flashcard set content
    front: { type: String, required: false },
    back: { type: String, required: false },
    responseHistory: [{
      quality: {type: Number, require: false},
      responseTime: {type: Number, require: false},
      interval: {type: Number, require: false},
      easeFactor: {type: Number, require: false}
    }]
  }],

  nextReviewTime: [{ type: Date, require: false}]

});

flashcardSetSchema.pre("save", function (next) {
    // If userID is not set, generate a unique value for it
    if (!this.flashCardID) {
      // Example of generating a unique value (e.g., using a timestamp)
      this.flashCardID = new Date().getTime().toString();
    }
    next();
  });
// Create a model from the schema
module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);