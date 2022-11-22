import React, { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';
import useAppBadge from './hooks/useAppBadge';

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge();

  // Handle Card Selection
  const handleClick = (card) => {
    if (!disabled){
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Start Over
  const handleNewGame = () => {
    setWins(0);
    clearBadge();
    handleTurn();
    setCards(shuffle);
  }

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two card have been clicked
    if (pickOne && pickTwo){
      if (pickOne.image === pickTwo.image){
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // update card property to reflect match
              return {...card, matched: true};
            } else {
              // no match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selection until after delay
        setDisabled(true);
        // Add delay between selections

        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, setBadge, wins]);

  // If player has found all matches
  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log("You Win!");
      setWins(wins + 1);
      setBadge();
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, setBadge, wins]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins}/>

      <div className="grid">
        {cards.map((card) => {
          const { image, matched } = card;

          return ( 
            <Card
              key={image.id}
              card={card}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
