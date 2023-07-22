import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface SongSliderProps {
  value?: number;
  duration?: number;
  onChange?: (value: number) => void;
}

const SongSlider: React.FC<SongSliderProps> = ({
  value = 0,
  duration = 0,
  onChange,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  // Helper function to convert seconds to minutes and seconds format (e.g., 2:30)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center mt-0 mb-4">
      <div className="mr-2 text-neutral-400 text-xs">{formatTime(value)}</div>
      <RadixSlider.Root
        className="relative flex items-center select-none w-full h-full group"
        defaultValue={[50]}
        value={[value]} // Use 'value' as the current value of the slider
        onValueChange={handleChange}
        max={duration}
        aria-label="Song progress"
      >
        <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[4px] ">
          <RadixSlider.Range className="absolute rounded-full bg-white h-full group-hover:bg-[#63CF6C]" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="hidden w-4 h-4 bg-white  rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8 group-hover:block ease-linear"
          aria-label="Volume"
        />
      </RadixSlider.Root>
      <div className="ml-2 text-neutral-400 text-xs">
        {formatTime(duration)}
      </div>
    </div>
  );
};

export default SongSlider;
