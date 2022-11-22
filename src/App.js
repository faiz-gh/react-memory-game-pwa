import React, { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);

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

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two card have been clicked
    if (pickOne && pickTwo){
      if (pickOne.image === pickTwo.image){
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
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
  }, [cards, pickOne, pickTwo]);

  // If player has found all matches
  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log("You Win!");
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins])

  return (
    <div>
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return ( 
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
