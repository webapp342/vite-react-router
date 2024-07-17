import React, { useState, useEffect } from 'react';

const FarmComponent: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(0);
  const [farmedAmount, setFarmedAmount] = useState<number>(0);
  const [isFarming, setIsFarming] = useState<boolean>(false);
  const [lastFarmedAmount, setLastFarmedAmount] = useState<number>(0);

  useEffect(() => {
    let timer: number;
    if (isFarming && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isFarming && countdown === 0) {
      setIsFarming(false);
      const newFarmedAmount = farmedAmount + 100;
      setFarmedAmount(newFarmedAmount);
      setLastFarmedAmount(100); // Her farm işleminde eklenen miktar 100
    }

    return () => window.clearTimeout(timer);
  }, [isFarming, countdown, farmedAmount]);

  const handleFarm = () => {
    setIsFarming(true);
    setCountdown(60);
  };

  return (
    <div>
      <div>
        Total Farmed Amount: {farmedAmount}
      </div>
      <div>
        Last Farmed Amount: {lastFarmedAmount}
      </div>
      <button onClick={handleFarm} disabled={isFarming}>
        {isFarming ? `Time remaining: ${countdown}s` : 'Farm'}
      </button>
    </div>
  );
};

export default FarmComponent;
