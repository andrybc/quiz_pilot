import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalState';
import Flashcards from '../flashcardcmpnts/flashcard';
import ContentGenerator from '../AI+Functions/genericAIGen';
import './DefaultPage.css';
import Navbar from './Navbar';
import Showcase from './Showcase';
import LaptopGirlImage from './laptopgirl.jpg';
import GroupStudyImage from './group studying.jpg';

function DefaultPage() {
  const { defaultCards } = useContext(GlobalContext);

  return (
    <div className="backgrounds-default">
      <Navbar />
      <img src={LaptopGirlImage} className="girlStudy-default" />
      <img src={GroupStudyImage} className="groupStudy-default" />
      <div className='default-container'>
        <div className="showCasecontainer-default">
          <Showcase />
        </div>
        <div className="cardsContainer-default">
          <Flashcards />
        </div>
        <div className="GenAI-default">
          <ContentGenerator />
        </div>
      </div>
    </div>
  );
}

export default DefaultPage;
