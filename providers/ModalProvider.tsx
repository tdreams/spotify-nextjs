"use client";
import React, { use, useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  } //we are insuring that the modal are not open in server side rendering
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
