import React, { useState, useContext, useEffect } from 'react';
import './flashcard.css';

import { GlobalContext } from '../../GlobalState';





const Flashcards = () => {
  // ...

  const { defaultCards } = useContext(GlobalContext);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
 




  const flipCard = () => {
    setShowFront(!showFront);
  };

  const nextCard = () => {
    if (currentCardIndex === defaultCards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    setShowFront(true);
  };
  const prevCard = () => {
    if (currentCardIndex === 0) {
      setCurrentCardIndex(defaultCards.length - 1);
    } else {
      setCurrentCardIndex(currentCardIndex - 1);
    }
    setShowFront(true);
  };


  return (
    <div className="flashcards-container-default">

      <div className="back-buttons-default" >
        <button  onClick={prevCard}>Back</button>
      </div>
      {defaultCards &&(
        <div className="flashcards-card-default">
          
          <button  onClick={flipCard}>
            {showFront ? defaultCards[currentCardIndex].front : defaultCards[currentCardIndex].back}    
          </button>
        </div>
      )}
      <div className="next-buttons-default" >
        <button  onClick={nextCard}>Next</button>
      </div>

    </div>
  );
};

export default Flashcards;