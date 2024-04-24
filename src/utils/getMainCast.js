export const getDirectorName = (crew) => {
  const director = crew ? crew.filter((i) => i.job === "Director") : null;

  let direc = crew ? director[0] : null;
  let direcName = direc ? direc.name : null;
  return direcName;
};
