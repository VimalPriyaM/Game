import React, { useState } from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';

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
            setResult("It's a Tie!");
        } else if (
            (userSelection === 'Stone' && compChoice === 'Scissor') ||
            (userSelection === 'Paper' && compChoice === 'Stone') ||
            (userSelection === 'Scissor' && compChoice === 'Paper')
        ) {
            setResult('Hurrah! You Won 🎉');
            setUserScore((prev) => prev + 1);
        } else {
            setResult('Oops! You Lose 😢');
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
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">Rock Paper Scissors</h1>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg text-center p-4 rounded-xl w-64">
                    <h2 className="text-2xl font-bold">Scoreboard</h2>
                    <p className="text-lg mt-2 text-green-300">User Score: {userScore}</p>
                </div>
            </div>

            {/* Game Options */}
            {!userChoice && (
                <div className="flex justify-center gap-10 mb-12">
                    {choices.map((choice) => (
                        <button
                            key={choice}
                            onClick={() => play(choice)}
                            className="bg-white/20 hover:bg-white/30 w-24 h-24 rounded-full p-6 flex flex-col items-center justify-center transition-transform hover:scale-110 shadow-xl"
                        >
                            {icons[choice]}
                            <span className="mt-2 text-sm font-semibold text-white">{choice}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Result Display */}
            {userChoice && computerChoice && (
                <div className="text-center mt-16">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-16 mb-8">
                        <div className="flex flex-col items-center">
                            <p className="text-xl mb-2">You chose:</p>
                            <div className="text-yellow-300 text-5xl">{icons[userChoice]}</div>
                            <p className="text-lg mt-1 font-bold">{userChoice}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl mb-2">Computer chose:</p>
                            <div className="text-red-300 text-5xl">{icons[computerChoice]}</div>
                            <p className="text-lg mt-1 font-bold">{computerChoice}</p>
                        </div>
                    </div>

                    <div className="bg-white/10 p-6 rounded-xl inline-block shadow-lg mt-4">
                        <h2 className="text-2xl font-bold mb-3 text-white">{result}</h2>
                        {result && (
                            <img
                                src="/Won.png"
                                alt="You won"
                                className="w-32 h-auto mx-auto mt-2 rounded-lg"
                            />
                        )}
                        <button
                            onClick={resetGame}
                            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300"
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
