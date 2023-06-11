import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import './formGen.css';
import { GlobalContext } from '../../GlobalState';

function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [amountofCards, setAmountofCards] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    terms, setTerms,
    defs, setDefs,
    cards, setCards,
    defaultCards, setdefaultCards,
    nextReviewTime, setNextReviewTime,
  } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    console.log("generating content...");
    e.preventDefault();
    setLoading(true);
    let newPrompt = `Give me a unordered set of ${amountofCards} unique terms that relate to this topic: ${topic}. Terms can only be 3 words max.
       With each term provide a one line definition on the same line that pertains to the topic state: ${topic}. Seperate the term and its definition with a ":" character.
       Make sure to capitalize the first letter in each term.
       Do not number the set when printing it out`;

    axios.post("http://localhost:5555/chat", { newPrompt })
      .then((res) => {
        let termsString = res.data.toString();
        let wsRegex = /^\s+|\s+$/g; 
        let wsRegex2 = /^\.+|\.+$/g;
        termsString = termsString.replace(/(\r\n|\n|\r)/gm, "");
        termsString = termsString.replaceAll(wsRegex, "");
        termsString = termsString.replaceAll(wsRegex2, "");
        termsString = termsString.replace(/\./g, ":");

        let promptText = termsString.split(':');
        const termsG = [];
        for (let i = 0; i < promptText.length; i =i+2) {
          termsG.push(promptText[i]);
        }
        const defsG = [];
        for (let i = 1; i < promptText.length; i =i+ 2) {
          defsG.push(promptText[i]);
        }

        setTerms(termsG);
        setDefs(defsG);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error('err');
      });
  };

  const termsRef = useRef(terms);
const defsRef = useRef(defs);

  useEffect(() => {
    if (terms !== termsRef.current || defs !== defsRef.current) {
    console.log(terms, defs);
    const currentPage = window.location.pathname.toString();
    
    if (currentPage === '/') {
      const newCards = [];
      for (let i = 0; i < terms.length; i++) {
        newCards.push({ front: terms[i], back: defs[i] });
      }
      console.log(newCards);
      setdefaultCards(newCards);
    } else {
      const newCards = [];
      for (let i = 0; i < terms.length; i++) {
        newCards.push({ front: terms[i], back: defs[i] ,responseHistory: []});
      }
      console.log(newCards);
      const newReviewTime = Array(cards.length).fill(new Date());
      setNextReviewTime(newReviewTime);
      setCards(newCards);
    }
  }
  }, [terms, defs]);


  return (
    <div className="form-containers">
      <form onSubmit={handleSubmit} >
        <div className="input-container">
          <input
            className='input-Gen'
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Any topic..."
          />
          <input
            type="number"
            className="spin-button-input"
            value={amountofCards}
            min="1"
            max="50"
            onChange={(e) => setAmountofCards(e.target.value)}
          />
        </div>
        <div className="input-container">
          <button className='button-Gen' >Generate New</button>
        </div>
      </form>
    </div>
  );
}

export default ContentGenerator;
