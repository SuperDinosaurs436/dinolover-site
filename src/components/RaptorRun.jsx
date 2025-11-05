import React, { useState, useEffect } from "react";
import { playSound } from "../soundUtils";

export default function RaptorRun() {
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  const gravity = 5;
  const jumpHeight = 80;

  // Handle jump
  const handleKeyDown = (e) => {
    if (e.key === " " && !isJumping) {
      setIsJumping(true);
      playSound("/sounds/jump.mp3");
      let up = 0;
      const upInterval = setInterval(() => {
        if (up >= jumpHeight) {
          clearInterval(upInterval);
          const downInterval = setInterval(() => {
            if (up <= 0) {
              clearInterval(downInterval);
              setIsJumping(false);
            }
            setPlayerY((y) => y - gravity);
            up -= gravity;
          }, 20);
        } else {
          setPlayerY((y) => y + gravity);
          up += gravity;
        }
      }, 20);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJumping]);

  // Spawn obstacles
  useEffect(() => {
    const interval = setInterval(() => {
      const newObstacle = { x: 400, id: Date.now() };
      setObstacles((prev) => [...prev, newObstacle]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Move obstacles
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - 5 }))
          .filter((obs) => {
            if (obs.x < 0) {
              setScore((s) => s + 1);
              // Update Hall of Fame
              const storedScores = JSON.parse(localStorage.getItem("dinoHighScores")) || {};
              localStorage.setItem(
                "dinoHighScores",
                JSON.stringify({
                  ...storedScores,
                  "Raptor Run": Math.max(score + 1, storedScores["Raptor Run"] || 0),
                })
              );
              return false;
            }
            return true;
          })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Raptor Run 🦖</h2>
      <p className="mb-2">Score: {score}</p>
      <div className="relative bg-green-800 w-96 h-48 mx-auto border-2 border-yellow-400 overflow-hidden">
        {/* Player */}
        <div
          className="absolute bottom-0 text-3xl"
          style={{ left: 20, bottom: playerY }}
        >
          🦖
        </div>
        {/* Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute text-2xl bottom-0"
            style={{ left: obs.x }}
          >
            ⛰️
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-yellow-300">Press SPACE to jump!</p>
    </div>
  );
}
