import React, { useState, useEffect } from 'react';

const DiscoProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;

      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', updateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', updateScrollPercentage);
    };
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const progressBarStyle = {
    width: `${scrollPercentage}%`,
    background: getRandomColor(),
    height: '5px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    transition: 'background 0.3s ease',
  };

  return <div style={progressBarStyle}></div>;
};

export default DiscoProgressBar;
