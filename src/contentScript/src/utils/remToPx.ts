export const remToPx = (str: string) => {
  return str.replace(/(\d*\.?\d+)rem/g, (_, value) => `${value * 16}px`);
};
