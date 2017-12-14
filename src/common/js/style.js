export const isShow = expression => {
  const style = {};
  if (!expression) style.display = "none";
  return style;
};
