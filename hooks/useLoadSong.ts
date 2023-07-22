// useLoadSongUrl.tsx

import { useEffect, useState } from "react";

const useLoadSong = (songUrl: string): string | null => {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio(songUrl);

    const handleCanPlayThrough = () => {
      setLoadedUrl(songUrl);
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [songUrl]);

  return loadedUrl;
};

export default useLoadSong;
