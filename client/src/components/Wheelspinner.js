// Wheelspinner.js

import React, { useState, useEffect } from 'react';
import './Wheelspinner.css';

const Wheelspinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState([]);

  const values = Math.floor(Math.random() * 10000);

  const spinValues = [values];

  const handleSpinClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setTimeout(() => {
        // Stop spinning after a short interval (e.g., 0.5 seconds)
        setIsSpinning(false);

        // Show a random amount after spinning stops
        const randomAmount = spinValues[Math.floor(Math.random() * spinValues.length)];
       
        localStorage.setItem('claimedAmount', JSON.stringify(randomAmount));
       const valuesget = JSON.parse(localStorage.getItem('claimedAmount'))
       setClaimedAmount(valuesget);
        // Hide the amount after 5 seconds
        setTimeout(() => {
          setClaimedAmount(0);
        }, 1000);
      }, 500); // Adjust the interval as needed
    }
  };

  const handleImageClick = () => {
    // Trigger the spinning functionality when clicking on the image
    handleSpinClick();
  };

  useEffect(() => {
    // You can add additional logic or API calls here
    // when the claimedAmount changes, if needed
  }, [claimedAmount]);

  return (
    <div className="wheel-spinner">
      <div className={`spin ${isSpinning ? 'spinning' : ''}`} onClick={handleImageClick}>
        <img src={require('../images/spinner.png')} alt="spinnerWheel" />
        {claimedAmount > 0 && <div className="amount-overlay">+{claimedAmount}</div>}
      </div>
      <div className="valuesget">
        {claimedAmount > 0 && (
          <ol key={claimedAmount}>
            <li>{claimedAmount}</li>
          </ol>
        )}
      </div>
      <button className="spin-button" onClick={handleSpinClick}>
        Claim your winnings
      </button>
    </div>
  );
};

export default Wheelspinner;
