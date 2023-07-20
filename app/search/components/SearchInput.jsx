"use client";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Input from "@/components/Input";
const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debounceValue, router]);

  return (
    <Input
      placeholder="What do you want to listen?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
