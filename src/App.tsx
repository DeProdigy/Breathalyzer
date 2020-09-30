import React, { useState } from 'react';
import moment from 'moment';

interface Drink {
  type: string,
  time: Date,
}

const newDrink = () => {
  return (
    {
      type: 'beer',
      time: new Date(),
    }
  )
}

const App: React.FC = () => {
  type InitialState = Drink[];
  const initialState: InitialState = [];
  const [drinks, setDrinks] = useState(initialState);

  return (
    <div>
      Drinks: {drinks.length}

      <ul>
        { drinks.map((drink) => <li key={drink.time.toString()}>{moment(drink.time).format('LTS')}</li>) }
      </ul>

      <div>
        <button onClick={() => setDrinks(drinks => [...drinks, newDrink()])}>ADD</button>
        <button onClick={() => setDrinks(initialState)}>Reset</button>
      </div>
    </div>
  );
};

export default App;
