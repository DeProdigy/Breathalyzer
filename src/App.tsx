import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Chartjs from "chart.js";

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

const Chart = (drinks) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const mappedDrinks = drinks.drinks.map(drink => {return {t: drink.time, y: 1} });

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    // @ts-ignore
    chartInstance.data.datasets[datasetIndex].data = newData;
    // @ts-ignore
    chartInstance.update();
  };

  const onButtonClick = () => {
    updateDataset(0, mappedDrinks);
  };

  let chartConfig = {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Number of drinks',
          fill: false,
          borderColor: '#f9a125',
          pointRadius: 10,
          pointHoverRadius: 20,
          data: mappedDrinks,
        },
      ]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          time: {
            format: 'HH:MM:SS',
          },
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'value'
          }
        }]
      }
    }
  };

  return (
    <div>
      <canvas ref={chartContainer} />
      <button onClick={onButtonClick}>Visualize!</button>
    </div>
  );
};


const App: React.FC = () => {
  type InitialState = Drink[];
  const initialState: InitialState = [];
  const [drinks, setDrinks] = useState(initialState);

  return (
    <div>
      Drinks: {drinks.length}

      <div>
        <button onClick={() => setDrinks(drinks => [...drinks, newDrink()])}>ADD</button>
      </div>

      <Chart drinks={drinks} />

      <ul>
        { drinks.map((drink) => <li key={drink.time.toString()}>{moment(drink.time).format('LTS')}</li>) }
      </ul>
    </div>
  );
};

export default App;
