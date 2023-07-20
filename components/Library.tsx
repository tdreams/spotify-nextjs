"use client";
import React from "react";
import Image from "next/image";
import LibraryIcon from "../public/LibraryIcon.svg";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const UploadModal = useUploadModal();

  const onclick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    //TODO: Check for subscriptions
    return UploadModal.onOpen();
  };
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <Image
            src={LibraryIcon}
            alt="library icon"
            width={26}
            height={26}
            className=""
          />
          <p className="text-neutral-400 font-medium text-base">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onclick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {" "}
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Library;
