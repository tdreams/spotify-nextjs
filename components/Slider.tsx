"use client";
import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface RadixSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<RadixSliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="
        relative
        flex
        items-center
        select-none
        w-full
        h-full
        "
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className="
            bg-neutral-600
            relative
            grow
            rounded-full
            h-[3px]
            "
      >
        <RadixSlider.Range className="absolute rounded-full bg-white h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
