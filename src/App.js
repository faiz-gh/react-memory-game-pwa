import React, { useState } from 'react';
import shuffle from './utilities/shuffle';

function App() {
  const [cards, setCards] = useState(shuffle);
  

  return (
    <div>
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return ( 
            <Card
              key={id}
              image={image}
              selected={false}
              onClick={() => {}}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
