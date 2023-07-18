"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const onClick = () => {
    //Add auth before push
    router.push(href);
  };
  return (
    <button className="relative group flex items-center bg-neutral-100/10 rounded-md overflow-hidden gap-x-4 hover:bg-neutral-100/20 transition pr-4 ">
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-contain" fill src={image} alt="image" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-[#1ed760] p-4 ring-black/20  ring-offset-2 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
