import React, { useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import SongSlider from "./SongSlider";
import { useSound } from "use-sound";

const VOLUME_STORAGE_KEY = "playerVolume";
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const player = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const storedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
  const initialVolume = storedVolume ? parseFloat(storedVolume) : 0.5; // Adjust the initial volume to 0.5 (middle volume)
  const [volume, setVolume] = useState(initialVolume);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null); // State to keep track of the current song URL

  // State to store the initial volume level when the component mounts

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  /*   const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]); */

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Set the volume of the audio element using the ref value

    audio.volume = volume; // Use initial volume here
    // Play the audio automatically when the songUrl changes or when the component mounts
    if (songUrl && currentSongUrl !== songUrl) {
      // Check if the song URL has changed
      setCurrentSongUrl(songUrl); // Update the current song URL state
      audio.src = songUrl; // Set the new song URL for the audio element

      audio.play().then(() => {
        setIsPlaying(true);
      });
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.addEventListener("ended", onPlayNext);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentTime, duration, volume]);

  useEffect(() => {
    // Save the current volume to localStorage whenever it changes
    localStorage.setItem(VOLUME_STORAGE_KEY, volume.toString());
  }, [volume]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full mt-2 ">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex flex-col justify-center  mx-auto w-[40rem]">
        <div
          className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
        >
          <div
            onClick={handlePlay}
            className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>

        <div
          className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
        >
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
          <div
            onClick={handlePlay}
            className="
              flex 
              items-center 
              justify-center
              align-middle
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
             hover:scale-105
             ease-in-out
             relative
            "
          >
            <Icon
              size={30}
              className="text-black  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
        </div>
        <SongSlider
          value={currentTime}
          duration={duration}
          onChange={handleSliderChange}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
      <audio ref={audioRef} src={songUrl} preload="metadata" />
    </div>
  );
};

export default PlayerContent;
