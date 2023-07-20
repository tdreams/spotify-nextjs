import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import React from "react";
import SearchInput from "@/app/search/components/SearchInput";

import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
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
      <Header className="from-bg-[#121212]">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1
            className="
                text-white
                text-3xl
                font-semibold
                 "
          >
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
