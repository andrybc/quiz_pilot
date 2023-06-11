// Import dependencies and middlewares 

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("../DB-models/DB"); // Import the MongoDB connection
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const User = require('../DB-models/User'); // Import your user model
const savedflashCard = require('../DB-models/FlashCards');

// Set up the server ////////////

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up OpenAI endpoint

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
// CHATBOT_KEY is key name in .env file. .env file should be in project root directory - format is below
// CHATBOT_KEY="YOR-API-KEY"

const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const { newPrompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: newPrompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});
// 'prompt' is coming from axios post - from react js state - its input field value or query or question 





// Registration route
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extract registration data from request body

    // Check if username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    // Create a new user object
    const newUser = new User({ username, email, password });
    await newUser.save(); // Save the user object to the database

    // Return success status
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user in server:', error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
});



// Login route
app.post("/api/loginAuth", async (req, res) => {
  console.log("reach here");
  try {
    const { username, password } = req.body; // Extract login data from request body

    console.log("inside the try and catch");
    // Find the user in the database by username
    const user = await User.findOne({ username });

    if (user) {
      console.log("found the user!!");
      console.log(user.username);
    }

    // If user not found, return error
    if (!user) {
      console.log("no one has this username");
      // res.json({ success: false });
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    // Verify password
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      console.log("Incorrect password");
      //res.json({ success: false });
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    if (isPasswordValid) {

      console.log("this is the correct credentials");
    }

    // Return success status
    const token = jwt.sign({ userId: user.userID }, "secretKey", { expiresIn: "1h" });
    const userID = user.userID;
    const flashCardSet = await savedflashCard.find({ userID });
    const flashcardsetIDs = flashCardSet.map(flashCardSet => flashCardSet.flashCardID);
    const response = {
      status: 'success',
      token: token,
      userName: user.username,
      userID: user.userID,
      flashcardsetIDs: flashcardsetIDs
    };
    console.log(response);
    res.status(200).json(response);

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Failed to log in user' });
  }
});



app.post("/api/saveCard", async (req, res) => {
  try {
    const { userID, cards ,nextReviewTime} = req.body;


    const user = await User.findOne({ userID });

    // Create a new user object
    const newSaveset = new savedflashCard({ userID: user.userID, cards: cards, nextReviewTime: nextReviewTime });
    await newSaveset.save(); // Save the user object to the database

    if (newSaveset) {
      const flashCardID = newSaveset.flashCardID;
      console.log(flashCardID);
      const response = {
        status: 'success',
        data: flashCardID
      };
      res.status(200).json(response);

      // Return success status
      // res.json({ success: true, message: 'User flashcard saved successfully' },{flashCardID});

      // res.status(200).json({flashCardID}); // Send the extracted 'cardID' field as the response
    }

  } catch (error) {
    console.error('Error registering user in server:', error);
    res.status(500).json({ success: false, message: 'Failed to save flashcard' });
  }
});


app.get('/api/:flashsetID', async (req, res) => {
  try {
    // Get the flashsetID parameter from the request URL
    const flashsetID  = req.params.flashsetID;
    console.log(flashsetID);
    const flashCardID = flashsetID;
    // Retrieve flashcard data based on flashsetID
    // For example, assuming you have a Flashcard model/schema, you can use a library like Mongoose to perform the database query
    // Replace this line with your own implementation to retrieve flashcard data
    const flashCardData = await savedflashCard.findOne({ flashCardID });
    console.log(flashCardData);
    // If flashcard data is found, extract the cards field and send it as a response
    if (flashCardData) {
      console.log("found it");
      const { cards } = flashCardData; // Extract the 'cards' field from flashCardData
      const {nextReviewTime} = flashCardData;
      const response = {
        status: 'success',
        cards: { cards },
        nextReviewTime: {nextReviewTime}
      };
      res.status(200).json(response); // Send the extracted 'cards' field as the response
    } else {
      // If flashcard data is not found, send an error response
      console.log("nah couldnt find it");
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error retrieving flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/user/:userID', async (req, res) => {
  console.log("in here");
  try {
    // Get the flashsetID parameter from the request URL
    const userID = req.params.userID;
    console.log(userID);
    // Retrieve flashcard data based on flashsetID
    // For example, assuming you have a Flashcard model/schema, you can use a library like Mongoose to perform the database query
    // Replace this line with your own implementation to retrieve flashcard data
    const user = await User.findOne({ userID })
    const flashCardSet = await savedflashCard.find({ userID });

    // If flashcard data is found, extract the cards field and send it as a response
    if (user && flashCardSet) {
      const flashcardsetIDs = flashCardSet.map(flashCardSet => flashCardSet.flashCardID);
      const response = {
        status: 'success',
        token: token,
        userName: user.username,
        userID: user.userID,
        data: flashcardsetIDs
      };
      res.status(200).json(response); // Send the extracted 'cards' field as the response
    } else {
      // If flashcard data is not found, send an error response
      res.status(404).json({ error: 'Flashcard not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error retrieving flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/saveCard/:currentSetID', async (req, res) => {
  console.log("in here");
  try {
    const { cards ,nextReviewTime} = req.body;

    const updatedflashsetID  = req.params.currentSetID;
    console.log(updatedflashsetID );
    const flashCardID = updatedflashsetID;
    const oldflashcardset = await savedflashCard.findOne({ flashCardID });
    console.log(oldflashcardset);
    oldflashcardset.replaceOne({cards: cards, nextReviewTime: nextReviewTime});


    if (oldflashcardset) {
      const sameflashCardID = oldflashcardset.flashCardID;
      console.log(sameflashCardID);
      const response = {
        status: 'success',
        data: sameflashCardID
      };
      res.status(200).json(response);

      // Return success status
      // res.json({ success: true, message: 'User flashcard saved successfully' },{flashCardID});

      // res.status(200).json({flashCardID}); // Send the extracted 'cardID' field as the response
    }

  } catch (error) {
    console.error('Error registering user in server:', error);
    res.status(500).json({ success: false, message: 'Failed to save flashcard' });
  }
});


// Start the server ////////////////////

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});