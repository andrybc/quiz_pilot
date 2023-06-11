import React, { useState, useContext, useEffect } from 'react';
import './Usersflashcard.css';
import { GlobalContext } from '../../GlobalState';

const Userflashcards = () => {
  const { cards, nextReviewTime, setNextReviewTime } = useContext(GlobalContext);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);


  const flipCard = () => {
    setShowFront(!showFront);
  };

  const nextCard = () => {
    const now = new Date();
    let nextIndex = -1;
    for (let i = 1; i <= cards.length; i++) {
      const cardIndex = (currentCardIndex + i) % cards.length;
      if (now >= nextReviewTime[cardIndex]) {
        nextIndex = cardIndex;
        break;
      }
    }
    setCurrentCardIndex(nextIndex);
    setShowFront(true);
  };


  const prevCard = () => {
    const prevIndex = currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1;
    setCurrentCardIndex(prevIndex);
    setShowFront(true);
  };


  const handleResponse = (quality) => {
    console.log("");
    console.log("");
    console.log(`Handling reponse...the quality was ${quality} for this card`);
    const now = new Date();
    const responseTime = now.getTime() - nextReviewTime[currentCardIndex].getTime();
    console.log(`The time it took to responde to this was ${responseTime / 1000} seconds`);
    const { interval, ef } = calculateInterval(cards[currentCardIndex].responseHistory, quality);

    console.log(`The new interval is ${interval} and the new easefactor is ${ef}`);

    // update response history for current card
    //const newResponseHistory = [...cards[currentCardIndex].responseHistory];
    //newResponseHistory[currentCardIndex].push({ quality, responseTime });
    // setResponseHistory(newResponseHistory);
    cards[currentCardIndex].responseHistory.push({ quality: quality, responseTime: responseTime, interval: interval, easeFactor: ef });
    console.log(`This cards response history is this: ${cards[currentCardIndex].responseHistory[0].easeFactor}`);
    // update next review time for current card
    const newNextReviewTime = [...nextReviewTime];
    newNextReviewTime[currentCardIndex] = new Date(now.getTime() + interval * 60 * 1000);

    console.log(`The next time it will be review is this: ${newNextReviewTime[currentCardIndex]}`);
    setNextReviewTime(newNextReviewTime);

    nextCard();


    
  };

  const calculateInterval = (history, quality) => {
    let repetitions = history.length;
    let ef = 2.5; // initial ease factor
    let interval = 1; // initial interval (in days)

    // Step 1: Retrieve stored values or use defaults
    if (repetitions > 0) {
      console.log("has a history");
      const lastHistory = history[history.length - 1];
      ef = lastHistory.easeFactor;
      interval = lastHistory.interval;
    }

    // Step 2: Update the easiness factor
    ef = Math.max(1.3, ef + 0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02));

    // Step 3: Update repetitions
    if (quality < 3) {
      repetitions = 0;
    } else {
      repetitions += 1;
    }

    // Step 4: Calculate the new interval
    if (repetitions <= 1) {
      interval = 1;
    } else if (repetitions == 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ef);
    }

    // Step 5: Calculate the next practice date is handled in the handleResponse function

    return { interval, ef };
  };

  const goodCard = () => {
    handleResponse(3);
  };

  const okCard = () => {
    handleResponse(2);
  };

  const notGoodCard = () => {
    handleResponse(1);
  };

  const terribleCard = () => {
    handleResponse(0);
  };

  return (
    <div className="flashcards-container-user">

      <div className="back-buttons-user" >
        <button onClick={prevCard}>Back</button>
      </div>
      {currentCardIndex !== -1 ? (
        <div className="flashcards-card-user">
          <button onClick={flipCard}>
            {showFront ? cards[currentCardIndex].front : cards[currentCardIndex].back}
          </button>
        </div>
      ) : (
        <div className="flashcards-card-user">
          <button>Nothing is ready to be reviewed at the moment.</button>
        </div>
      )}
      <div className="next-buttons-user" >
        <button onClick={nextCard}>Next</button>
      </div>
      <div className='SM2-container-user'>
        <button onClick={terribleCard}>Terrible</button>
        <button onClick={notGoodCard}> Fwesh </button>
        <button onClick={okCard}> Kinda</button>
        <button onClick={goodCard}> Know it</button>
      </div>
    </div>
  );
};
export default Userflashcards;