export const getDirector = (crew) => {
  const director = crew ? crew.filter((i) => i.job === "Director") : null;

  let direc = crew ? director[0] : null;
  let directorName = direc ? direc.name : null;
  return { directorName, direc, director };
};
