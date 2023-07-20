import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div
      className="
        bg-[#121212]
        rounded-lg
        h-full
        w-gull
        overflow-hidden
        overflow-y-auto
  "
    >
      <Header>
        <div
          className="
              mt-24  
        "
        >
          <div
            className="
           flex
           flex-col
           md:flex-row
           items-center
           gap-x-5
           "
          >
            <div
              className="
           relative
           h-32
           w-32
           lg:h-44
           lg:w-44
           "
            >
              <Image
                src="/images/liked.png"
                alt="PlayList"
                fill
                sizes=""
                className="object-cover"
              />
            </div>
            <div
              className="
            flex
            flex-col
            gap-y-2
            my-4
            md:mt-0

            "
            >
              <p
                className="
                    hidden
                    md:block
                    font-semibold
                    text-sm

                "
              >
                Playlist
              </p>
              <h1
                className="
                  text-white  
                  text-4xl
                  sm:text-5xl
                  lg:text-7xl
                  font-bold
              "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
