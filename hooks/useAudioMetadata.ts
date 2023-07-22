import { useEffect, useState } from "react";

const useAudioMetadata = (songUrl: string | null): number => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!songUrl) return;

    const audio = new Audio(songUrl);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [songUrl]);

  return duration;
};

export default useAudioMetadata;
