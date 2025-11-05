import React, { useState } from "react";
import Header from "./components/Header";
import AnimatedDinos from "./components/AnimatedDinos";
import DinoConfetti from "./components/DinoConfetti";
import MemoryMatch from "./components/MemoryMatch";
import FossilDig from "./components/FossilDig";
import EggCatch from "./components/EggCatch";
import RaptorRun from "./components/RaptorRun";
import HallOfFame from "./components/HallOfFame";

export default function App() {
  const [activeGame, setActiveGame] = useState(null);

  const renderGame = () => {
    switch (activeGame) {
      case "Memory Match":
        return <MemoryMatch />;
      case "Fossil Dig":
        return <FossilDig />;
      case "Egg Catch":
        return <EggCatch />;
      case "Raptor Run":
        return <RaptorRun />;
      default:
        return <p className="text-center mt-6 text-yellow-200">Select a game to play!</p>;
    }
  };

  return (
    <div className="min-h-screen bg-green-950 text-yellow-200">
      <Header setActiveGame={setActiveGame} />
      <AnimatedDinos />
      <div className="max-w-4xl mx-auto mt-6">
        {renderGame()}
        <HallOfFame />
      </div>
      <DinoConfetti />
    </div>
  );
}
