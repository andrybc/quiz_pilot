import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [terms, setTerms] = useState([]);
  const [defs, setDefs] = useState([]);
  const [defaultCards, setdefaultCards] = useState(Array(10).fill({ front: 'Try here ⬇️', back: 'back of card' }));

  const [cards, setCards] = useState(Array(10).fill({ 
   front: 'default',
   back: 'blank', 
   responseHistory: [
    {
      quality: null,
      responseTime: null,
      interval: null,
      easeFactor: null
    }
   ]
  }));

  const [nextReviewTime, setNextReviewTime] = useState(Array(cards.length).fill(new Date()));
  let savedCardSets;
  let token;

  return (
    <GlobalContext.Provider value={{ setNextReviewTime, nextReviewTime,
                                      token, terms, setTerms, defs, setDefs, 
                                      cards, setCards, savedCardSets, defaultCards, setdefaultCards }}>
      {children}
    </GlobalContext.Provider>
  );
};