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
        setLastFarmedAmount((60 - countdown) * (100 / 60)); // Her saniye için farm edilen miktar
      }, 1000);
    } else if (isFarming && countdown === 0) {
      setIsFarming(false);
      const newFarmedAmount = farmedAmount + 100;
      setFarmedAmount(newFarmedAmount);
      setLastFarmedAmount(100); // Son farm işleminde eklenen miktar 100
    }

    return () => window.clearTimeout(timer);
  }, [isFarming, countdown, farmedAmount]);

  const handleFarm = () => {
    setIsFarming(true);
    setCountdown(60);
    setLastFarmedAmount(0); // Yeni farm işlemi başlarken sıfırla
  };

  return (
    <div className="main-content">
      <div>
        Total Farmed Amount: {farmedAmount}
      </div>
      <div>
        Last Farmed Amount: {Math.round(lastFarmedAmount)} / 100
      </div>
      <button onClick={handleFarm} disabled={isFarming}>
        {isFarming ? `Farming ${Math.round(lastFarmedAmount)} / 100 - Time remaining: ${countdown}s` : 'Farm'}
      </button>
    </div>
  );
};

export default FarmComponent;
