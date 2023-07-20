"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import PlayButton from "./PlayButton";

interface SongItemProps {
  onClick: (id: string) => void;
  data: Song;
}

const formatTitle = (title: string): string => {
  return title
    .split(" ") // Split the title into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string with spaces
};

const SongItem: React.FC<SongItemProps> = ({ onClick, data }) => {
  const formattedTitle = formatTitle(data.title);
  const formattedAuthor = formatTitle(data.author);
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="
        relative
         group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-[#1b1b1b]
        hover:bg-[#282828]
        transition
        p-3
        cursor-pointer
  
  "
    >
      <div
        className="
      relative
      aspect-square
      w-full
      h-full
      rounded-md
      overflow-hidden
      "
      >
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          alt="Images"
          fill
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{formattedTitle}</p>
        <p className="text-neutral-500 text-sm pb-4 w-full truncate">
          By {formattedAuthor}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
