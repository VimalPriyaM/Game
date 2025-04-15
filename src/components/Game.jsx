import React, { useState } from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';
import './Game.css'; // Custom CSS for animation

function Game() {
    const [computerChoice, setComputerChoice] = useState('');
    const [userChoice, setUserChoice] = useState('');
    const [result, setResult] = useState('');
    const [userScore, setUserScore] = useState(0);

    const choices = ['Stone', 'Paper', 'Scissor'];
    const icons = {
        Stone: <FaHandRock size={40} />,
        Paper: <FaHandPaper size={40} />,
        Scissor: <FaHandScissors size={40} />,
    };

    const generateComputerChoice = () => {
        const random = Math.floor(Math.random() * 3);
        return choices[random];
    };

    const play = (userSelection) => {
        const compChoice = generateComputerChoice();
        setComputerChoice(compChoice);
        setUserChoice(userSelection);

        if (userSelection === compChoice) {
            setResult('tie');
        } else if (
            (userSelection === 'Stone' && compChoice === 'Scissor') ||
            (userSelection === 'Paper' && compChoice === 'Stone') ||
            (userSelection === 'Scissor' && compChoice === 'Paper')
        ) {
            setResult('won');
            setUserScore((prev) => prev + 1);
        } else {
            setResult('lose');
        }
    };

    const resetGame = () => {
        setUserChoice('');
        setComputerChoice('');
        setResult('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-indigo-950 text-white p-6 font-poppins">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <h1 className="text-3xl md:text-4xl font-bold text-center">Rock Paper Scissors</h1>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg text-center p-4 rounded-xl w-full md:w-64">
                    <h2 className="text-xl md:text-2xl font-bold">Scoreboard</h2>
                    <p className="text-base md:text-lg mt-2 text-green-300">User Score: {userScore}</p>
                </div>
            </div>

            {/* Game Options */}
            {!userChoice && (
                <div className="flex justify-center flex-wrap gap-6 md:gap-10 mb-12">
                    {choices.map((choice) => (
                        <button
                            key={choice}
                            onClick={() => play(choice)}
                            className="bg-sky-700 border-2 border-white hover:border-amber-400 w-20 h-20 md:w-24 md:h-24 rounded-full p-4 md:p-6 flex items-center justify-center transition-transform hover:scale-110 shadow-xl"
                        >
                            {icons[choice]}
                        </button>
                    ))}
                </div>
            )}

            {/* Result Display */}
            {userChoice && computerChoice && (
                <div className="text-center mt-16">
                    <div className="flex justify-center items-center gap-10 flex-wrap mb-8">
                        <div className="text-yellow-300 text-4xl md:text-5xl flex flex-col items-center">
                            <span className="text-sm md:text-base mb-2 text-white">You</span>
                            <div className="animate-wiggle">
                                {icons[userChoice]}
                            </div>
                        </div>
                        <div className="text-red-300 text-4xl md:text-5xl flex flex-col items-center">
                            <span className="text-sm md:text-base mb-2 text-white">Opponent</span>
                            <div className="animate-wiggle">
                                {icons[computerChoice]}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl inline-block shadow-lg mt-4">
                        {result === 'won' && (
                            <img src="/Won.png" alt="Won" className="w-32 h-auto mx-auto rounded-lg" />
                        )}
                        {result === 'lose' && (
                            <img src="/Lose.png" alt="Lose" className="w-32 h-auto mx-auto rounded-lg" />
                        )}
                        {result === 'tie' && (
                            <img src="/Tie.png" alt="Tie" className="w-32 h-auto mx-auto rounded-lg" />
                        )}
                        <button
                            onClick={resetGame}
                            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game;
