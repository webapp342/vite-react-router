import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, Modal, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Confetti from 'react-confetti';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Helper functions
const getRandomSymbols = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow'];
    return Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
    }));
};

const checkWin = (symbols: Array<{ id: number; color: string }>) => {
    const winAmount = 10;
    const grid = Array.from({ length: 6 }, (_, row) =>
        symbols.slice(row * 5, row * 5 + 5)
    );

    // Check horizontal wins
    for (const row of grid) {
        for (let i = 0; i <= 2; i++) {
            if (row[i].color === row[i + 1].color && row[i].color === row[i + 2].color) {
                return { winAmount, winningCells: row.slice(i, i + 3).map(cell => cell.id) };
            }
        }
    }

    // Check vertical wins
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row <= 2; row++) {
            if (grid[row][col].color === grid[row + 1][col].color && grid[row][col].color === grid[row + 2][col].color) {
                return { winAmount, winningCells: [grid[row][col].id, grid[row + 1][col].id, grid[row + 2][col].id] };
            }
        }
    }

    return { winAmount: 0, winningCells: [] };
};

// Define the keyframes for the spin animation
const keyframes = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

const GameContainer = styled(Box)({
    background: 'linear-gradient(to right, #f8cdda, #1f8ef1)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    position: 'relative',
    '@global': {
        '@keyframes spin': keyframes,
    },
});

const Symbol = styled(Box)(({ color, isWinning, isSpinning }: { color: string, isWinning?: boolean, isSpinning?: boolean }) => ({
    width: '50px',
    height: '50px',
    backgroundColor: color,
    borderRadius: '5px',
    margin: '5px',
    position: 'relative',
    transition: 'background-color 0.5s ease, transform 0.5s ease',
    border: isWinning ? '3px solid yellow' : 'none',
    boxShadow: isWinning ? '0px 0px 10px rgba(255, 255, 0, 0.5)' : 'none',
    animation: isSpinning ? 'spin 4s linear infinite' : 'none', // Make the spin animation infinite
    '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.1)',
        boxShadow: isWinning ? '0px 0px 15px rgba(255, 255, 0, 0.7)' : 'none',
    },
}));

const WinningIcon = styled(AttachMoneyIcon)(({ isWinning }: { isWinning?: boolean }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'yellow',
    fontSize: '24px',
    display: isWinning ? 'block' : 'none',
}));

const WinModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ModalContent = styled(Box)({
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    position: 'relative',
    width: '80%',
    maxWidth: '400px',
    color: 'black',
});

const SweetBonanza: React.FC = () => {
    const [symbols, setSymbols] = useState<Array<{ id: number; color: string }>>([]);
    const [bet, setBet] = useState<number>(2.50);
    const [balance, setBalance] = useState<number>(0);
    const [notification, setNotification] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [confetti, setConfetti] = useState<boolean>(false);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [winningCells, setWinningCells] = useState<Set<number>>(new Set());

    useEffect(() => {
        // Load balance and symbols from local storage
        const savedBalance = localStorage.getItem('balance');
        if (savedBalance) {
            setBalance(Number(savedBalance));
        } else {
            const initialBalance = 100000;
            setBalance(initialBalance);
            localStorage.setItem('balance', initialBalance.toString());
        }

        const savedSymbols = localStorage.getItem('symbols');
        if (savedSymbols) {
            setSymbols(JSON.parse(savedSymbols));
        } else {
            const initialSymbols = getRandomSymbols();
            setSymbols(initialSymbols);
            localStorage.setItem('symbols', JSON.stringify(initialSymbols));
        }
    }, []);

    const handleSpin = () => {
        console.log('--- Spin Started ---');
        setLoading(true);
        setIsSpinning(true);

        if (balance < bet) {
            alert('Insufficient balance');
            setLoading(false);
            setIsSpinning(false);
            console.log('Insufficient balance for the bet.');
            return;
        }

        // Immediately deduct the bet amount
        const balanceAfterBet = balance - bet;
        setBalance(balanceAfterBet);
        localStorage.setItem('balance', balanceAfterBet.toString());

        console.log('Current Balance after deducting bet:', balanceAfterBet);

        // Set the spinning state to true to start animation
        setIsSpinning(true);

        // Simulate a delay of 4 seconds for animation
        setTimeout(() => {
            const newSymbols = getRandomSymbols();
            const { winAmount, winningCells } = checkWin(newSymbols);

            // Calculate new balance
            const updatedBalance = balanceAfterBet + winAmount;

            // Debugging logs
            console.log('New Symbols:', newSymbols);
            console.log('Win Amount:', winAmount);
            console.log('Updated Balance:', updatedBalance);

            // Update balance and symbols
            setSymbols(newSymbols);
            setWinningCells(new Set(winningCells));

            // Save the new balance and symbols to local storage
            localStorage.setItem('balance', updatedBalance.toString());
            localStorage.setItem('symbols', JSON.stringify(newSymbols));

            // Set notification based on win
            if (winAmount > 0) {
                setNotification(`Congratulations! You won $${winAmount}`);
                setConfetti(true); // Start confetti effect
                
                // Show winning cells for 2 seconds before showing the modal
                setTimeout(() => {
                    setShowModal(true); // Show modal when there is a win
                }, 2000);
            } else {
                setNotification(null);
                setConfetti(false); // Stop confetti effect
                setShowModal(false);
            }

            // Hide loading spinner and animation
            setLoading(false);
            setIsSpinning(false);

            console.log('--- Spin Ended ---');
        }, 4000); // 4 seconds delay
    };

    const handleBetChange = (amount: number) => {
        console.log('Bet Changed to:', amount);
        setBet(amount);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setConfetti(false); // Stop confetti when modal is closed
    };

    return (
        <GameContainer>
            <Typography variant="h4" gutterBottom>Sweet Bonanza</Typography>
            <Typography variant="h6">Current Balance: ${balance.toFixed(2)}</Typography>
            <Typography variant="h6">Current Bet: ${bet.toFixed(2)}</Typography>

            <Grid container spacing={1} justifyContent="center">
                {symbols.map(({ id, color }) => (
                    <Grid item key={id} xs={2.4}>
                        <Box position="relative">
                            <Symbol color={color} isWinning={winningCells.has(id)} isSpinning={isSpinning} />
                            <WinningIcon isWinning={winningCells.has(id)} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSpin} disabled={loading}>
                    {loading ? 'Spinning...' : 'SPIN'}
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleBetChange(5.00)} style={{ marginLeft: '10px' }}>
                    BET $5.00
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleBetChange(10.00)} style={{ marginLeft: '10px' }}>
                    BET $10.00
                </Button>
            </Box>

            {/* Render Confetti only when there is a win */}
            {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            {/* Render Modal with notification */}
            <WinModal open={showModal} onClose={handleCloseModal}>
                <ModalContent>
                    <Typography variant="h6">{notification}</Typography>
                    <IconButton
                        style={{ position: 'absolute', top: 10, right: 10 }}
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </ModalContent>
            </WinModal>
        </GameContainer>
    );
};

export default SweetBonanza;
