import React, { useContext, useState, useEffect, Suspense } from 'react';
import { GlobalContext } from '../../GlobalState';
//import Flashcards from '../flashcardcmpnts/flashcard';
import ContentGenerator from '../AI+Functions/genericAIGen';
import './UsersPage.css'
import userIcon from '../App/usericon.png'
import axios from "axios";
import { useHistory } from "react-router-dom";
import '../sav&loadCards/flashcardIcon.css';
import { useParams } from 'react-router-dom';

import UserNavbar from './UserNavbar';

const FlashcardIcon = React.lazy(() => import('../sav&loadCards/savedFlachcardIcon'));
const Userflashcards = React.lazy(() => import('../flashcardcmpnts/Usersflashcard'));
const UsersPage = () => {
 

  const [user, setUser] = useState(null);
  const { userID } = useParams();
  const [loadedSets, setloadedSets] = useState([]);
  const [userName, setUsername] = useState('');
  const { cards, nextReviewTime, setNextReviewTime } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    
 //   console.log(localStorage.getItem('loadedSets'));
    const cachedUserID = localStorage.getItem('userID');
    const cachedFlashcardSets = JSON.parse(localStorage.getItem('loadedSets'));
   // console.log(cachedFlashcardSets);
    const cachedUserName = localStorage.getItem('userName');
    if (cachedUserID && cachedFlashcardSets && cachedUserName) {
     // console.log(cachedFlashcardSets, cachedUserID, cachedUserName);
      setUser(cachedUserID);
      setloadedSets(cachedFlashcardSets);
      setUsername(cachedUserName);
    } else {
      axios
        .get(`/api/user/${userID}`)
        .then((response) => {
          localStorage.setItem('userID', JSON.stringify(response.data.userID));
          localStorage.setItem('userName', JSON.stringify(response.data.userName));
          localStorage.setItem('loadededSets', JSON.stringify(response.data.flashcardsetIDs));
          setUser(response.data.user);
          setloadedSets(response.data.flashcardSets);
          setUsername(response.data.username);
        })
        .catch((error) => console.log(error));
    }
  }, [userID]);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const saveFlashcard = async () => {
    const currentSetID = localStorage.getItem('currentFlashCardsetID');
    if (currentSetID) {
      const result = window.confirm(
        'The current set is already saved. Do you want to save as a new set or replace the existing one?'
      );
      if (result) {
        // Save as a new set
        localStorage.removeItem('currentFlashCardsetID');
      } else {
        // Replace the existing set
        try {
          const userID = localStorage.getItem('userID');
          const response = await axios.put(`http://localhost:5555/api/saveCard/\${currentSetID}`, {
            userID,
            cards,
            nextReviewTime
          });
          if (response.data.status === 'success') {
            console.log('Saved flashcard successfully');
          } else {
            alert('Couldnt save flashcard');
          }
        } catch (error) {
          console.error('Error saving flashcard:', error);
        }
        return;
      }
    }
  
    // Save the current set
    try {
      const userID = localStorage.getItem('userID');
      const response = await axios.post('http://localhost:5555/api/saveCard', {
        userID,
        cards,
        nextReviewTime
      });
      if (response.data.status === 'success') {
        localStorage.setItem('currentFlashCardsetID', response.data.data);
        console.log('Saved flashcard successfully');
        setloadedSets(prevLoadedSets => [...prevLoadedSets, response.data.data]);
        localStorage.setItem('loadededSets', loadedSets);
      } else {
        alert('Couldnt save flashcard');
      }
    } catch (error) {
      console.error('Error saving flashcard:', error);
    }
  };


  return (
    <div className="backgrounds-user">
      <UserNavbar />
      {user ? (
       <>
        <div>
          <div className="user-icon-dropdown">
            {/* User icon */}
            <img src={userIcon} alt="User Icon" className="user-icon" />
            {/* Dropdown menu */}
            <div className="dropdown-menu">
              <label className="username-label" > {userName}</label>
              
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item" onClick={handleLogout}>
                Logout
                </div>
            </div>
          </div>
  
          {<Suspense fallback={<div>Loading...</div>} key={cards._id}>
            <div className="cardsContainerUser">
             {cards && <Userflashcards />}
             </div>
           </Suspense>}
          
          {/* Save button */}
          <button className="save-button" onClick={saveFlashcard}
            style={{ position: 'fixed', right: 200, bottom: 100 }}>
            Save Set
          </button>
          <div className="saved-flashcards-container">
            <button className="flashcard-icons-wrapper">
                {console.log('loadedSets:', loadedSets)}
                {loadedSets.map((flashCardsIDs) => (
                  <Suspense fallback={<div>Loading...</div>} key={flashCardsIDs._id}>
                    {loadedSets &&<FlashcardIcon flashsetID={flashCardsIDs} />}
                  </Suspense>
                ))}
             </button>
          </div>
        </div>
      </>
        ) : (<div>Loading...</div>
          
      )}     
                
          <div className="GenAIUser ">
            <ContentGenerator />
          </div>
   </div>
  );
};

export default UsersPage;