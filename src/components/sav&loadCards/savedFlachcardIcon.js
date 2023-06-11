import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../GlobalState';
import axios from 'axios';
import icon from './savedFlashcard.png';
import './flashcardIcon.css'; // Import the CSS file


const FlashcardIcon = ({ flashsetID }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { terms, defs } = useContext(GlobalContext);
  const {cards, setCards, nextReviewTime, setNextReviewTime} = useContext(GlobalContext);
  //alert(flashsetID);
 // console.log(flashsetID);

  const handleClick = async () => {
    alert(flashsetID);
    try {
      const response = await axios.get(`http://localhost:5555/api/${flashsetID}`);
      // Assuming the response contains the flashcard data in response.data
      if(response.data.status == 'success'){

        
        console.log('Flashcard data:', response.data.cards, response.data.nextReviewTime);
        const newCards = [];
        const newReviewTime = [];
        for (let i = 0; i < response.data.cards.cards.length; i++) {
          newCards.push({ front: response.data.cards.cards.front[i], back: response.data.cards.cards.back[i] });
          newReviewTime.push((response.data.nextReviewTime.newReviewTime[i]));
        }
       setCards(newCards);
       setNextReviewTime(newReviewTime);
        console.log(response.data.cards.cards[0].front);
        // Set the isClicked state to true to indicate that the icon has been clicked
        //setIsClicked(true);
      }
      else{
        console.log("something bad happend");

      }

    } catch (error) {
      console.error('Error retrieving flashcard:', error);
    }
  };

  return (
  <div>
    <div className="flashcard-icon-container" onClick={handleClick}>
      <img
        src={icon}
        alt="Flashcard Icon"
        className="flashcard-icon-image"
      />
    </div>
    <label> {flashsetID}</label>
  </div>
  );
};

export default FlashcardIcon;