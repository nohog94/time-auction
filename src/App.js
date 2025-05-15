// App.js
import React, { useState, useEffect } from 'react';

const TOTAL_PLAYERS = 4;
const INITIAL_TIME = 300; // 5분
const TOTAL_ROUNDS = 10;

function App() {
  const [playerTimes, setPlayerTimes] = useState(Array(TOTAL_PLAYERS).fill(INITIAL_TIME));
  const [currentRound, setCurrentRound] = useState(1);
  const [isHolding, setIsHolding] = useState(Array(TOTAL_PLAYERS).fill(false));
  const [holdStartTimes, setHoldStartTimes] = useState(Array(TOTAL_PLAYERS).fill(null));
  const [roundWinners, setRoundWinners] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerTimes((prevTimes) =>
        prevTimes.map((time, index) =>
          isHolding[index] ? Math.max(time - 1, 0) : time
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isHolding]);

  const handleMouseDown = (index) => {
    setIsHolding((prev) => {
      const newHolding = [...prev];
      newHolding[index] = true;
      return newHolding;
    });
    setHoldStartTimes((prev) => {
      const newStartTimes = [...prev];
      newStartTimes[index] = Date.now();
      return newStartTimes;
    });
  };

  const handleMouseUp = (index) => {
    setIsHolding((prev) => {
      const newHolding = [...prev];
      newHolding[index] = false;
      return newHolding;
    });
    const holdDuration = Math.floor((Date.now() - holdStartTimes[index]) / 1000);
    setPlayerTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[index] = Math.max(newTimes[index] - holdDuration, 0);
      return newTimes;
    });
    // 라운드 승자 결정 로직 추가 필요
  };

  return (
    <div>
      <h1>시간 경매 - 라운드 {currentRound}</h1>
      {playerTimes.map((time, index) => (
        <div key={index}>
          <p>플레이어 {index + 1}: {time}초 남음</p>
          <button
            onMouseDown={() => handleMouseDown(index)}
            onMouseUp={() => handleMouseUp(index)}
          >
            버튼 누르기
          </button>
        </div>
      ))}
      {/* 라운드 및 게임 진행 로직 추가 필요 */}
    </div>
  );
}

export default App;
