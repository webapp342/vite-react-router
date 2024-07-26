import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { checkAndUpdatePoints, updateSpinPoints } from './firestoreService';
import Modal from 'react-modal';
import './WheelSpin.css'; // CSS dosyasını ekliyoruz

// Modal'ın gövdesini stilize etmek için
Modal.setAppElement('#root');

const data = [
  { option: '640', style: { backgroundColor: '#FF5733', textColor: 'white' } },
  { option: '10', style: { backgroundColor: '#33FF57', textColor: 'white' } },
  { option: '50', style: { backgroundColor: '#3357FF', textColor: 'white' } },
  { option: '510', style: { backgroundColor: '#F1C40F', textColor: 'black' } },
  { option: '520', style: { backgroundColor: '#9B59B6', textColor: 'white' } },
  { option: '70', style: { backgroundColor: '#E67E22', textColor: 'white' } },
  { option: '920', style: { backgroundColor: '#1ABC9C', textColor: 'white' } },
  { option: '720', style: { backgroundColor: '#2ECC71', textColor: 'white' } },
  { option: '420', style: { backgroundColor: '#3498DB', textColor: 'white' } },
  { option: '320', style: { backgroundColor: '#E74C3C', textColor: 'white' } },
  { option: '570', style: { backgroundColor: '#ECF0F1', textColor: 'black' } },
  { option: '20', style: { backgroundColor: '#F39C12', textColor: 'black' } },
  { option: '800', style: { backgroundColor: '#8E44AD', textColor: 'white' } },
  { option: '150', style: { backgroundColor: '#F39C12', textColor: 'white' } },
  { option: '300', style: { backgroundColor: '#D35400', textColor: 'white' } },
  { option: '450', style: { backgroundColor: '#C0392B', textColor: 'white' } },
  { option: '600', style: { backgroundColor: '#BDC3C7', textColor: 'black' } },
  { option: '750', style: { backgroundColor: '#7F8C8D', textColor: 'white' } },
  { option: '100', style: { backgroundColor: '#16A085', textColor: 'white' } },
  { option: '400', style: { backgroundColor: '#9B59B6', textColor: 'white' } },
  { option: '250', style: { backgroundColor: '#1F618D', textColor: 'white' } },
  { option: '550', style: { backgroundColor: '#F5B041', textColor: 'black' } },
  { option: '350', style: { backgroundColor: '#9C27B0', textColor: 'white' } },
  { option: '200', style: { backgroundColor: '#FF5722', textColor: 'white' } },
  { option: '900', style: { backgroundColor: '#FFEB3B', textColor: 'black' } },
  { option: '70', style: { backgroundColor: '#00BCD4', textColor: 'white' } },
  { option: '30', style: { backgroundColor: '#8BC34A', textColor: 'black' } },
];

const WheelSpin: React.FC = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [spinResult, setSpinResult] = useState<string>('');
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

    // Modal içeriğini ayarla ve modal'ı aç
    setSpinResult(data[prizeNumber].option);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="wheel-wrapper">
      <div className="wheel-container">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['white']}
          onStopSpinning={handleStopSpinning}
        />
        <button className="spin-button" onClick={handleSpinClick} disabled={isSpinning}>
          Spin
        </button>
        <div className="result">
          {isSpinning ? (
            <p>Çark dönüyor...</p>
          ) : (
            <p></p>
          )}
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Tebrikler!"
      >
        <h2>Tebrikler!</h2>
        <p>Çarkın üzerinde durduğu sayı: {spinResult}</p>
        <button onClick={closeModal}>Kapat</button>
      </Modal>
    </div>
  );
};

export default WheelSpin;
