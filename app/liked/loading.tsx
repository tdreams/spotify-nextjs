"use client";

import Box from "@/components/Box";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <ScaleLoader color="#63CF6C" />
    </Box>
  );
};

export default Loading;
