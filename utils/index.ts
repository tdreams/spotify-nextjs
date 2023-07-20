export const formatTitle = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
