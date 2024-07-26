import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { checkAndUpdatePoints, updateSpinPoints } from './firestoreService';
import './WheelSpin.css'; // CSS dosyasını ekliyoruz

const data = [
  { option: '640', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '10', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '50', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '510', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '520', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '70', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '920', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '720', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '420', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '320', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '570', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '20', style: { backgroundColor: 'green', textColor: 'black' } },
];

const WheelSpin: React.FC = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const telegramUserId = localStorage.getItem('telegramUserId') || '';

  const handleSpinClick = async () => {
    // Kullanıcının puanlarını kontrol et ve güncelle
    const hasEnoughPoints = await checkAndUpdatePoints(telegramUserId);

    if (hasEnoughPoints) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setIsSpinning(true);
      setMessage(''); // Mesajı sıfırla
    } else {
      setMessage('Çarkı çevirmek için yeterli ucreti yok.');
    }
  };

  const handleStopSpinning = async () => {
    setMustSpin(false);
    setIsSpinning(false);

    // Çark döndükten sonra spinPoints değerini güncelle
    await updateSpinPoints(telegramUserId, parseInt(data[prizeNumber].option, 10));
  };

  return (
    <div className="wheel-wrapper">
      <div className="wheel-container">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
          onStopSpinning={handleStopSpinning}
        />
        <button className="spin-button" onClick={handleSpinClick} disabled={isSpinning}>
          Spin
        </button>
        <div className="result">
          {isSpinning ? (
            <p>Çark dönüyor...</p>
          ) : (
            <p>Çarkın üzerinde durduğu sayı: {data[prizeNumber].option}</p>
          )}
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default WheelSpin;
