import { useEffect, useState } from "react";

const useSongProgress = (isPlaying: boolean) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Update the current time in the song
    const updateCurrentTime = () => {
      if (isPlaying) {
        setCurrentTime((prevTime) => prevTime + 0.1); // Increment time every 100ms
      }
    };
    const interval = setInterval(updateCurrentTime, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return currentTime;
};

export default useSongProgress;
