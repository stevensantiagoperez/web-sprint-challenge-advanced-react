import React, { useState } from 'react'
/* comment to test first commit*/






export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  // Suggested initial states
  const [index, setIndex] = useState(4); // the index the "B" is at
  const [steps, setSteps] = useState(0); // initial steps are 0
  const [message, setMessage] = useState(''); // no initial message
  const [email, setEmail] = useState(''); // empty email input


  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = (index % 3) + 1; // x is the column (1, 2, or 3)
    const y = Math.floor(index / 3) + 1; // y is the row (1, 2, or 3)

    return {x, y};
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(4); // Reset "B" to the center
    setSteps(0); // Reset steps to 0
    setMessage(''); // Clear any messages 
    setEmail(''); // Clear the email input
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let newIndex = index;

    if (direction === 'left' && index % 3 !== 0) {
      newIndex = index - 1; // Move left
    } else if (direction === 'up' && index >= 3) {
      newIndex = index - 3; // Move up
    } else if (direction === 'right' && index % 3 !== 2) {
      newIndex = index + 1; // Move right
    } else if (direction === 'down' && index < 6) {
      newIndex = index + 3; // Move down
    }

    return newIndex;
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id; // Get direction from button id
    const newIndex = getNextIndex(direction);

    if (newIndex !== index) {
      setIndex(newIndex); // Update index
      setSteps(steps + 1); // Increment steps
      setMessage(''); // Clear any previous message
    } else {
      setMessage(`You can't go ${direction}`); // Shows error message
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value); // Update email state
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault(); // Prevent page reload 

    const { x, y } = getXY();
    const payload = { x, y, steps, email };

    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then( (response) => response.json() )
      .then( (data) => setMessage(data.message) ) // Set success/error message
      .catch( (error) => setMessage(error.message) ); // Handle network errors
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} time{steps !== 1 ? 's' : ''}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move} >LEFT</button>
        <button id="up" onClick={move} >UP</button>
        <button id="right" onClick={move} >RIGHT</button>
        <button id="down" onClick={move} >DOWN</button>
        <button id="reset" onClick={reset} >reset</button>
      </div>
      <form onSubmit={onSubmit} >
        <input 
        id="email" 
        type="email" 
        placeholder="type email"
        value={email}
        onChange={onChange}
        >
        </input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
