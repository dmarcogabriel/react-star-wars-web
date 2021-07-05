export const getCharId = (url: string): string => {
  const splited = url.split('/');
  return splited[splited.length - 2];
};
