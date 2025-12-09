import React, { useState, useEffect, useRef } from "react";
import './App.css'

function App() {
  const [time, setTime] = useState(""); // user input in seconds
  const [progress, setProgress] = useState(0); // percentage
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(0); // seconds left
  const timerRef = useRef(null);

  // Start countdown
  const startProgress = () => {
    const totalSeconds = parseInt(time, 10);

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      alert("Please enter a valid positive number of seconds.");
      return;
    }

    clearInterval(timerRef.current);
    setProgress(0);
    setRemaining(totalSeconds);
    setIsRunning(true);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const percent = Math.min((elapsed / totalSeconds) * 100, 100);
      setProgress(percent);
      setRemaining(Math.max(totalSeconds - Math.floor(elapsed), 0));

      if (percent >= 100) {
        clearInterval(timerRef.current);
        setIsRunning(false);
      }
    }, 100);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Time-based Progress Bar</h2>

{/* This is input field add timer */}
       <input
        type="number"
        placeholder="Enter time in seconds"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={isRunning}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

{/* this is start button  */}
      <button
        onClick={startProgress}
        disabled={isRunning}
        style={{
          padding: "8px 16px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Start
      </button>

      <div
        style={{
          height: "25px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#4caf50",
            transition: "width 0.1s linear",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: 0,
            left: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: progress > 50 ? "#fff" : "#000",
            userSelect: "none",
          }}
        >
          {Math.floor(progress)}%
        </div>
      </div>

      {isRunning && (
        <p style={{ marginTop: "10px" }}>
          Time left: {remaining} second{remaining !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

export default App;
