export const getChangeColor = (change24h: number) => {
  return change24h > 0 ? "green" : change24h < 0 ? "red" : "black";
};
