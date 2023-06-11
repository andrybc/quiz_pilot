import React from "react";
import { motion } from "framer-motion";
import {
  WelcomeSection,
  ShowcaseSection,
  ShowcaseVideo,
  ShowcaseInfo,
  Tagline,
  Showcasewrapper
} from "./ShowcaseStyles";
import vid from './testquizpilot.mp4'
export default function Showcase() {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
 
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const letterVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: custom * 0.1 },
      color: ['#77d6fc','#fff']
    }),
  };

  return (
    
    <Showcasewrapper {...fadeIn}>
      <WelcomeSection {...fadeIn}>
        <motion.div initial="initial" animate="animate" variants={fadeIn}>
          Welcome to Quiz Pilot
        </motion.div>
      </WelcomeSection>
      
        <motion.div initial="initial" animate="animate" variants={slideUp}>
        <ShowcaseVideo autoPlay loop muted>
            <source src={vid} type="video/mp4" />
            </ShowcaseVideo>
        </motion.div>
        
        <ShowcaseInfo>
        <motion.div initial="initial" animate="animate" variants={slideUp}>
          
        <Tagline>
  {`Getting ahead with active recall innovation`.split('').map((char, index) => (
    <motion.span key={index} custom={index} variants={letterVariant} initial="hidden" animate="visible">
      {char}
    </motion.span>
  ))}
</Tagline>
            <p style={{color:'#fff'}}>
            Introducing our revolutionary flashcard app! With the power of AI, you can generate flashcards from any topic. But that's not all! You can also import flashcards directly from your class notes. Plus, we've got some other cool features that will make studying a breeze. Get ready to take your learning to the next level with our app.
            </p>
         
        </motion.div>
        </ShowcaseInfo>
        <WelcomeSection {...fadeIn}>
        <motion.div initial="initial" animate="animate" variants={fadeIn}>
          Test out the AI feature right here!
        </motion.div>
      </WelcomeSection>
    </Showcasewrapper>
   
  );
}