"use client"; // Enables client-side rendering for this component

import { useState, useRef, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 dark:bg-gradient-to-r from-gray-900 via-indigo-900 to-slate-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 dark:from-emerald-400 dark:via-lime-400 dark:to-teal-500 text-center">
          Countdown Timer
        </h1>
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 dark:from-emerald-500 dark:to-lime-500 dark:hover:from-teal-600 dark:hover:to-green-600"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 dark:from-emerald-400 dark:via-lime-400 dark:to-teal-500 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 dark:from-emerald-500 dark:to-lime-500 dark:hover:from-teal-600 dark:hover:to-green-600"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-white bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 dark:from-yellow-500 dark:to-amber-500 dark:hover:from-yellow-600 dark:hover:to-orange-600"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-white bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 dark:from-red-500 dark:to-pink-500 dark:hover:from-red-600 dark:hover:to-pink-600"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
