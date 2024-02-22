import { useEffect, useState } from "react";
import './App.css'

interface Column {
  color: string;
  num: number;
  class: string;
}

const App = () => {
  const [grid, setGrid] = useState<Column[][]>([]);
  const [start, setStart] = useState('');
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = Math.random() > 0.5 ? 'red' : 'blue';
    let numbers: number[] = [];
    while (numbers.length < 8 + 8 + 2) {
      let random = Math.floor(Math.random() * 25);
      if (!numbers.includes(random)) {
        numbers.push(random);
      }
    }
    
    let blue = numbers.slice(0, start === "blue" ? 9 : 8);
    let red = numbers.slice(start === "blue" ? 9 : 8, 17);
    let black = numbers.pop();

    let newGrid = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        let current = i*5+j;
        if (black === current) {
          row.push({ color: '#1e2030', num: current, class: 'black' });
          continue;
        }
        if (blue.includes(current)) {
          row.push({ color: '#8aadf4', num: current, class: 'blue' });
          continue;
        }
        if (red.includes(current)) {
          row.push({ color: '#ed8796', num: current, class: 'red' });
          continue;
        }
        row.push({ color: '#eed49f', num: current, class: 'neutral' });
      }
      newGrid.push(row);
    }

    setStart(start);
    setGrid(newGrid);
  }, [count]);

  return (
    <div className="grid">
      <h3 style={{ color: start === "blue" ? "#8aadf4" : "#ed8796" }}>{start} player starts.</h3>
      {grid.map((row, index) => (
        <div key={index} className="row">
          {row.map((col) => (
            <div
              key={col.num}
              onClick={(event) => (event.target as HTMLDivElement).classList.toggle('selected')}
              className={`col ${col.class}`}
              style={{ background: col.color }}
            >
              <input />
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => setCount(count + 1)}>New game</button>
    </div>
  )
}

export default App;
