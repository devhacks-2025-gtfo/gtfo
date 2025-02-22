import { Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";

// returns seconds left until time is up
function getTimeRemaining(time: number ): number {
  const now: number = Date.now();
  const diff: number = time - now;
  const seconds = Math.floor(diff / 1000);
  return seconds;
}

export default function Clock({ time, endGameSignal, isGameEnded, setIsGameEnded }: { time: number, endGameSignal: () => void, isGameEnded: boolean, setIsGameEnded: (isGameEnded: boolean) => void }) {
  const [timeLeft, setTimeLeft] = useState<number>(getTimeRemaining(time));

  useEffect(() => {
    console.log(timeLeft);
    const interval = setInterval(() => {
      if(Math.max(0, getTimeRemaining(time)) <= 0) {
        if(!isGameEnded) {
          setIsGameEnded(true);
        }
        
      }
      setTimeLeft(Math.max(0, getTimeRemaining(time)));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [time]);

  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;

  const displayTime: string = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <>
      <Text className="clock">{displayTime}</Text>
    </>
  );
}
